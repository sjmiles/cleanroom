
XStyles = {};

register({
  name: 'x-style',
  createdCallback: function() {
    this.style.display = 'none';
    XStyles[this.getAttribute('name')] = this;
    var style = document.createElement('style');
    style.textContent = this.textContent;
    this.styleElement = style;
  },
  stamp: function(elt) {
    elt.appendChild(this.styleElement.cloneNode(true));
  } 
});

XStyle = function(elt, name) {
  var xs = XStyles[name];
  if (xs) {
    xs.stamp(elt);
  }
}
