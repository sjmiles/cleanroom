/*
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(scope) {

  var modules = {};

  // call signatures:
  // module() - deregister any module for the current import
  // module(name) - deregister module 'name'
  // module(factoryFunction) - register `factoryFunction` to a module named for the current import
  // module(name, factoryFunction) - register `factoryFunction` to module `name`
  // module([array of dependencies], factoryFunction) - register `factoryFunction` with dependencies to a module named for the current import
  // module(name, [array of dependencies], factoryFunction) - register `factoryFunction` with dependencies to module `name`
  function module(A, B, C) {
    var name = '', dependencies = null, factory = null;
    for (var i=0, l=arguments.length, a; i<l; i++) {
      a = arguments[i];
      switch (typeof a) {
        case 'string':
          name = a;
          break;
        case 'object':
          dependencies = a;
          break;
        case 'function':
          factory = a;
          break;
      }
    }
    if (!name) {  
      // name from the `src` attribute of the `script` tag
      // or the `url` attribute of the `script.ownerDocument`
      // requires support for `_currentScript` which doesn't 
      // exist for scripts in the main document
      name = fetchCurrentScriptName();
      if (!name) {
        // TODO(sjmiles): throw or warn
        return;
      }
    }
    function define(name, module) {
      //console.log('define: ', name);
      modules[name] = module;
      moduleLoaded(name);
    }
    var module = null;
    if (factory) {
      var self = this;
      if (dependencies) {
        //console.log(name, 'waits for:', dependencies);
        satisfy(dependencies, function() {
          //console.log(name, 'satisfied');
          define(name, factory.apply(self, arguments));
        });
        return;
      }
      module = factory.apply(self);
    }
    define(name, module);
  };

  function marshal(name) {
    return modules[name];
  }

  function using(depends, task) {
    //var doc = document._currentScript && document._currentScript.ownerDocument || document;
    //console.log('using: ', depends);
    satisfy(depends, task);
    /*
    HTMLImports.whenReady(function() {
      withDependencies(task, depends);
    }, doc);
    */
  }

/*
  function withDependencies(task, depends) {
    depends = depends || [];
    if (!depends.map) {
      depends = [depends];
    }
    return task.apply(this, depends.map(marshal));
  }
*/

  var waiting = [];
  function moduleLoaded(name) {
    waiting = waiting.filter(function(w) {
      return w(name);
    });
  }
  
  function satisfy(depends, task) {
    var refs = [];
    var self = this;
    var satisfied = function() {
      //console.log('satisfied');
      task.apply(self, refs); 
      return true;
    }
    var dep = depends.shift();
    if (!dep) {
      return satisfied();
    }
    var waitForDeps = function() {
      if (!dep) {
        // re-entrancy abort
        return true;
      }
      var module = modules[dep];
      while (dep && module) {
        refs.push(module);
        dep = depends.shift();
        module = modules[dep];
      }
      if (!dep) {
        return satisfied();
      }
    };
    if (!waitForDeps()) {
      waiting.push(waitForDeps);
    }
  }
  
  function fetchCurrentScriptName() {
    var script = fetchCurrentScript();
    var url = script.getAttribute('src');
    if (!url) {
      var imp = script.ownerDocument || Object;
      url = imp.URL || imp._URL;
    }
    return nameFromUrl(url);
  }

  function fetchCurrentScript() {
    return document._currentScript;
  }
  
  function nameFromUrl(url) {
    var leaf = url.split('/').pop();
    leaf = leaf.split('.');
    leaf.pop();
    return leaf.pop();
  }
  
  // exports

  scope.marshal = marshal;
  // `module` confuses commonjs detectors
  scope.modularize = module;
  scope.using = using;

})(window);
