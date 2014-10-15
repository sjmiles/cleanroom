if (!window.HTMLImports) {

HTMLImports = {};

(function(scope) {
  
var currentScriptDescriptor = {
  get: function() {
    return document.currentScript;
  },
  configurable: true
};

var mainDoc = document;

Object.defineProperty(document, '_currentScript', currentScriptDescriptor);
Object.defineProperty(mainDoc, '_currentScript', currentScriptDescriptor);

// call a callback when all HTMLImports in the document at call (or at least
//  document ready) time have loaded.
// 1. ensure the document is in a ready state (has dom), then 
// 2. watch for loading of imports and call callback when done
function whenImportsReady(callback, doc) {
  doc = doc || mainDoc;
  // if document is loading, wait and try again
  whenDocumentReady(function() {
    watchImportsLoad(callback, doc);
  }, doc);
}

// call the callback when the document is in a ready state (has dom)
var requiredReadyState = HTMLImports.isIE ? 'complete' : 'interactive';
var READY_EVENT = 'readystatechange';
function isDocumentReady(doc) {
  return (doc.readyState === 'complete' ||
      doc.readyState === requiredReadyState);
}

// call <callback> when we ensure the document is in a ready state
function whenDocumentReady(callback, doc) {
  if (!isDocumentReady(doc)) {
    var checkReady = function() {
      if (doc.readyState === 'complete' || 
          doc.readyState === requiredReadyState) {
        doc.removeEventListener(READY_EVENT, checkReady);
        whenDocumentReady(callback, doc);
      }
    }
    doc.addEventListener(READY_EVENT, checkReady);
  } else if (callback) {
    callback();
  }
}

// call <callback> when we ensure all imports have loaded
function watchImportsLoad(callback, doc) {
  var imports = doc.querySelectorAll('link[rel=import]');
  var loaded = 0, l = imports.length;
  function checkDone(d) { 
    if (loaded == l) {
      callback && callback();
    }
  }
  function loadedImport(e) {
    loaded++;
    checkDone();
  }
  if (l) {
    for (var i=0, imp; (i<l) && (imp=imports[i]); i++) {
      if (isImportLoaded(imp)) {
        loadedImport.call(imp);
      } else {
        imp.addEventListener('load', loadedImport);
        imp.addEventListener('error', loadedImport);
      }
    }
  } else {
    checkDone();
  }
}

useNative = true;

function isImportLoaded(link) {
  return link.import && (link.import.readyState !== 'loading')) || link.__loaded;
}

// TODO(sorvell): install a mutation observer to see if HTMLImports have loaded
// this is a workaround for https://www.w3.org/Bugs/Public/show_bug.cgi?id=25007
// and should be removed when this bug is addressed.

new MutationObserver(function(mxns) {
  for (var i=0, l=mxns.length, m; (i < l) && (m=mxns[i]); i++) {
    if (m.addedNodes) {
      handleImports(m.addedNodes);
    }
  }
}).observe(document.head, {childList: true});

function handleImports(nodes) {
  for (var i=0, l=nodes.length, n; (i<l) && (n=nodes[i]); i++) {
    if (isImport(n)) {
      handleImport(n);  
    }
  }
}

function isImport(element) {
  return element.localName === 'link' && element.rel === 'import';
}

function handleImport(element) {
  var loaded = element.import;
  if (loaded) {
    markTargetLoaded({target: element});
  } else {
    element.addEventListener('load', markTargetLoaded);
    element.addEventListener('error', markTargetLoaded);
  }
}

function markTargetLoaded(event) {
  event.target.__loaded = true;
}
  
whenImportsReady(function() {
  HTMLImports.ready = true;
  HTMLImports.readyTime = new Date().getTime();
  document.dispatchEvent(
    new CustomEvent('HTMLImportsLoaded', {bubbles: true})
  );
});

// exports
scope.hasNative = true;
scope.useNative = true;
scope.whenReady = whenImportsReady;
// deprecated
scope.whenImportsReady = whenImportsReady;

})(HTMLImports);
  
}