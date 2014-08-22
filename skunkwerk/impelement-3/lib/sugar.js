(function() {

var sugar = {
  publish: [],
  sheets: [],
  attrs: '',
  createdCallback: function() {
    this.created();
    this.desugar();
  },
  desugar: function() {
    this.desugarProps();
    this.desugarSheets();
    this.desugarAttrs();
  },
  desugarProps: function() {
    this.publish.forEach(function(p) {
      this.publishProperty(p);
    }, this);    
  },
  desugarAttrs: function() {
    if (this.attrs) {
      var a$ = this.attrs.split(' ');
      a$.forEach(function(a) {
        this.setAttribute(a, '');
      }, this);
    }
  },
  desugarSheets: function() {
    XStyle(this.root, this.name);
    this.sheets.forEach(function(s) {
      XStyle(this.root, s);
    }, this);
  },
  created: function() {
  },
  createShadow: function() {
    this.root = this.createShadowRoot();
  },
  getTemplate: function(name) {
    return document.currentScript.ownerDocument.querySelector('template[name=' + name + ']');
  }
};

window.Sugar = sugar;
  
})();

