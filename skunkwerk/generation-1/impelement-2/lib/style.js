
XStyles = {};

register({
  name: 'x-style',
  createdCallback: function() {
    this.style.display = 'none';
    XStyles[this.getAttribute('name')] = this;
  },
  stamp: function(elt) {
    var style = document.createElement('style');
    style.textContent = this.textContent;
    elt.appendChild(style);
  } 
  /* 
   if (this.hasAttribute('publish')) {
      this.publish();
    }
  },
  publish: function() {
    document.body.appendChild(this.styleElement);
  }
  */
});

XStyle = function(elt, name) {
  var xs = XStyles[name];
  if (xs) {
    xs.stamp(elt);
  }
}
