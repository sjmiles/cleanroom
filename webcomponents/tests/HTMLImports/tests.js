/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

htmlSuite('HTMLImports', function() {
  htmlTest('HTMLImports/HTMLImports.html');
  htmlTest('HTMLImports/parser.html');
  htmlTest('HTMLImports/style-links.html');
  htmlTest('HTMLImports/style-paths.html');
  htmlTest('HTMLImports/load.html');
  htmlTest('HTMLImports/load-404.html');
  htmlTest('HTMLImports/currentScript.html');
  htmlTest('HTMLImports/dedupe.html');
  htmlTest('HTMLImports/dynamic.html');
  // TODO(sjmiles): feature not implemented currently
  //htmlTest('HTMLImports/dynamic-elements.html');
  htmlTest('HTMLImports/csp.html');
});
