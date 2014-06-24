/* 
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function() {
  var thisFile = 'ShadowDOM.js';
  var base = '';
  Array.prototype.forEach.call(document.querySelectorAll('script[src]'), function(s) {
    var src = s.getAttribute('src');
    var re = new RegExp(thisFile + '[^\\\\]*');
    var match = src.match(re);
    if (match) {
      base = src.slice(0, -match[0].length);
    }
  });

  [
    //'../observe-js/src/observe.js',
    '../WeakMap/weakmap.js',
    'src/ArraySplice.js',
    'src/wrappers.js',
    'src/microtask.js',
    'src/MutationObserver.js',
    "src/TreeScope.js",
    'src/wrappers/events.js',
    'src/wrappers/TouchEvent.js',
    'src/wrappers/NodeList.js',
    'src/wrappers/HTMLCollection.js',
    'src/wrappers/Node.js',
    'src/querySelector.js',
    'src/wrappers/node-interfaces.js',
    'src/wrappers/CharacterData.js',
    'src/wrappers/Text.js',
    'src/wrappers/DOMTokenList.js',
    'src/wrappers/Element.js',
    'src/wrappers/HTMLElement.js',
    'src/wrappers/HTMLCanvasElement.js',
    'src/wrappers/HTMLContentElement.js',
    'src/wrappers/HTMLImageElement.js',
    'src/wrappers/HTMLShadowElement.js',
    'src/wrappers/HTMLTemplateElement.js',
    'src/wrappers/HTMLMediaElement.js',
    'src/wrappers/HTMLAudioElement.js',
    'src/wrappers/HTMLOptionElement.js',
    'src/wrappers/HTMLSelectElement.js',
    'src/wrappers/HTMLTableElement.js',
    'src/wrappers/HTMLTableSectionElement.js',
    'src/wrappers/HTMLTableRowElement.js',
    'src/wrappers/HTMLUnknownElement.js',
    'src/wrappers/SVGElement.js',
    'src/wrappers/SVGUseElement.js',
    'src/wrappers/SVGElementInstance.js',
    'src/wrappers/CanvasRenderingContext2D.js',
    'src/wrappers/WebGLRenderingContext.js',
    'src/wrappers/Range.js',
    'src/wrappers/generic.js',
    'src/wrappers/ShadowRoot.js',
    'src/ShadowRenderer.js',
    'src/wrappers/elements-with-form-property.js',
    'src/wrappers/Selection.js',
    'src/wrappers/Document.js',
    'src/wrappers/Window.js',
    'src/wrappers/DataTransfer.js',
    'src/wrappers/override-constructors.js'
  ].forEach(function(src) {
    document.write('<script src="' + base + src + '"></script>');
  });

})();
