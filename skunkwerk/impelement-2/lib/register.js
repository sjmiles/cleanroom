(function() {

Base.__proto__ = HTMLElement.prototype;
Sugar.__proto__ = Base;
var suffix = Sugar;

function register(prototype) {
  prototype.__proto__ = suffix;
  document.registerElement(prototype.name, {prototype: prototype});
}

window.register = register;
  
})();

