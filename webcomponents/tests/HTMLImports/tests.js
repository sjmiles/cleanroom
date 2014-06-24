/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

htmlSuite('HTMLImports', function() {
  htmlTest('HTMLImports.html');
  htmlTest('parser.html');
  htmlTest('style-links.html');
  htmlTest('style-paths.html');
  htmlTest('load.html');
  htmlTest('load-404.html');
  htmlTest('currentScript.html');
  htmlTest('dedupe.html');
  htmlTest('dynamic.html');
  // TODO(sjmiles): feature not implemented currently
  // htmlTest('dynamic-elements.html');
  htmlTest('csp.html');
});
