// Copyright 2013 The Polymer Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

(function(scope) {
  'use strict';

  var mixin = scope.mixin;
  var registerWrapper = scope.registerWrapper;
  var unwrapIfNeeded = scope.unwrapIfNeeded;
  var wrap = scope.wrap;

  var OriginalWebGLRenderingContext = window.WebGLRenderingContext;

  // IE10 does not have WebGL.
  if (!OriginalWebGLRenderingContext)
    return;

  function WebGLRenderingContext(impl) {
    this.impl = impl;
  }

  mixin(WebGLRenderingContext.prototype, {
    get canvas() {
      return wrap(this.impl.canvas);
    },

    texImage2D: function() {
      arguments[5] = unwrapIfNeeded(arguments[5]);
      this.impl.texImage2D.apply(this.impl, arguments);
    },

    texSubImage2D: function() {
      arguments[6] = unwrapIfNeeded(arguments[6]);
      this.impl.texSubImage2D.apply(this.impl, arguments);
    }
  });

  // Blink/WebKit has broken DOM bindings. Usually we would create an instance
  // of the object and pass it into registerWrapper as a "blueprint" but
  // creating WebGL contexts is expensive and might fail so we use a dummy
  // object with dummy instance properties for these broken browsers.
  var instanceProperties = /WebKit/.test(navigator.userAgent) ?
      {drawingBufferHeight: null, drawingBufferWidth: null} : {};

  registerWrapper(OriginalWebGLRenderingContext, WebGLRenderingContext,
      instanceProperties);

  scope.wrappers.WebGLRenderingContext = WebGLRenderingContext;
})(window.ShadowDOMPolyfill);
