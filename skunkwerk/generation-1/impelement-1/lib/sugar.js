(function() {

var sugar = {
  props: [],
  sheets: [],
  createdCallback: function() {
    this.created();
    this.desugar();
  },
  desugar: function() {
    this.desugarProps();
    this.desugarSheets();
  },
  desugarProps: function() {
    this.props.forEach(function(p) {
      this.publishProperty(p);
    }, this);    
  },
  desugarSheets: function() {
    XStyle(this.root, this.name);
    this.sheets.forEach(function(s) {
      XStyle(this.root, s);
    }, this);
  },
  created: function() {
  }
};

window.Sugar = sugar;
  
})();

