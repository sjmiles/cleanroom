(function() {

var sugar = {
  publish: [],
  sheets: [],
  attrs: '',
  props: [],
  createdCallback: function() {
    this.root = this;
    this.created();
    this.desugar();
    this.configure();
  },
  created: function() {
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
  desugarSheets: function() {
    XStyle(this.root, this.name);
    this.sheets.forEach(function(s) {
      XStyle(this.root, s);
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
  createShadow: function() {
    this.root = this.createShadowRoot();
  },
  getTemplate: function(name) {
    return document.currentScript.ownerDocument.querySelector('template[name=' + name + ']');
  },
  configure: function() {
    this._bindings = [];
    this.props.forEach(function(p) {
      var value = this.getAttribute(p);
      if (value !== null) {
        if (value[0] == '@' /*&& value[1] == '<'*/) {
          var bding = value.slice(1);
          this._bindings[p] = bding;
          this._expectBindings = true;
        } else {
          this[p] = value;
        }
      }
    }, this);
    if (!this._expectBindings) {
      this.stamp();
    }
  },
  stamp: function() {
  },
  bound: function() {
    if (this._expectBindings) {
      var model = this.templateInstance.model;
      for (var n in this._bindings) {
        var bding = this._bindings[n]; 
        this[n] = bding ? model[bding] : model;
      }
      this.stamp();
    }
  }
};

window.Sugar = sugar;

})();

