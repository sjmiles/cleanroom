// Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
// This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
// The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
// The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
// Code distributed by Google as part of the polymer project is also
// subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

(function(global) {
  'use strict';

  var createObject = ('__proto__' in {}) ?
    function(obj) { return obj; } :
    function(obj) {
      var proto = obj.__proto__;
      if (!proto)
        return obj;
      var newObject = Object.create(proto);
      Object.getOwnPropertyNames(obj).forEach(function(name) {
        Object.defineProperty(newObject, name,
                             Object.getOwnPropertyDescriptor(obj, name));
      });
      return newObject;
    };

  var attrNames = [
    'foo',
    'bar',
    'baz',
    'bat',
    'boo',
    'cat',
    'dog',
    'fog',
    'hat',
    'pig'
  ];
  attrNames.next = 0;
  function getNextAttrName() {
    if (attrNames.next == attrNames.length)
      attrNames.next = 0;
    return attrNames[attrNames.next++];
  }

  var propNames = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j'
  ];
  propNames.next = 0;
  function getNextPropName() {
    if (propNames.next == propNames.length)
      propNames.next = 0;
    return propNames[propNames.next++];
  }

  var elementTypes = [
    'div',
    'p',
    'span',
    'h1',
    'h2'
  ];
  elementTypes.next = 0;
  function getNextElementType() {
    if (elementTypes.next == elementTypes.length)
      elementTypes.next = 0;
    return elementTypes[elementTypes.next++];
  }

  function sd(oneTime) {
    return oneTime ? '[[' : '{{';
  }

  function ed(oneTime) {
    return oneTime ? ']]' : '}}';
  }

  function nextBindingText(isStatic, oneTime, expression) {
    if (isStatic)
      return 'I am Text!';

    if (expression) {
      return sd(oneTime) + getNextPropName() + ' + ' +
                           getNextPropName() + ed(oneTime);
    }

    return sd(oneTime) + getNextPropName() + ed(oneTime);
  }

  function nextBinding(isStatic, oneTime, compound, expression) {
    if (isStatic)
      return nextBindingText(isStatic);
    if (compound) {
      return nextBindingText(false, oneTime, expression) + ' ' +
             nextBindingText(false, oneTime, expression);
    }

    return nextBindingText(false, oneTime, expression);
  }

  function MDVBenchmark(testDiv, width, depth, decoration, instanceCount,
                        oneTimeBindings, compoundBindings, expressions) {
    Benchmark.call(this);
    this.testDiv = testDiv;
    this.width = width;
    this.depth = depth;
    this.decoration = decoration;
    this.oneTimeBindings = oneTimeBindings;
    this.compoundBindings = compoundBindings;
    this.expressions = expressions;

    this.valueCounter = 1;
    this.ping = this.objectArray(instanceCount);
    this.pong = this.objectArray(instanceCount);
    this.flip = true;
  }

  MDVBenchmark.prototype = createObject({
    __proto__: Benchmark.prototype,

    dataObject: function() {
      var obj = {};
      propNames.forEach(function(prop) {
        obj[prop] = 'value' + (this.valueCounter++);
      }, this);
      return obj;
    },

    objectArray: function(count) {
      var array = [];

      for (var i = 0; i < count; i++)
        array.push(this.dataObject());

      return array;
    },

    getBindingText: function() {
      return nextBinding(this.bindingCounter++ > this.bindingCount,
                         this.oneTimeBindings,
                         this.compoundBindings,
                         this.expressions);
    },

    decorate: function(element) {
      if (!this.decoration)
        return;

      if (element.nodeType === Node.TEXT_NODE) {
        element.textContent = this.getBindingText();
        return;
      }

      for (var i = 0; i < this.decoration; i++) {
        element.setAttribute(getNextAttrName(), this.getBindingText());
      }
    },

    buildFragment: function(parent, width, depth) {
      if (!depth)
        return;

      var text = parent.appendChild(document.createTextNode('I am text!'));
      this.decorate(text);

      for (var i = 0; i < width; i++) {
        var el = document.createElement(getNextElementType());
        var div = parent.appendChild(el);
        this.buildFragment(div, width, depth - 1);
        this.decorate(div);
      }
    },

    setupTest: function(density) {
      // |decoration| attributes on each element in each depth
      var bindingCount = this.decoration *
          (Math.pow(this.width, this.depth) - 1) * this.width;
      // if |decoration| >= 1, one binding for each text node at each depth.
      if (this.decoration > 0)
        bindingCount += Math.pow(this.width, this.depth) - 1;

      this.bindingCount = Math.round(bindingCount * density);
      this.bindingCounter = 0;
      this.propNameCounter = 0;
      this.fragment = document.createDocumentFragment();
      this.buildFragment(this.fragment, this.width, this.depth, this.decoration,
                         density);
    },

    teardownTest: function(density) {
      this.fragment = undefined;
    },

    setupMDVVariant: function() {
      if (testDiv.childNodes.length > 1)
        alert('Failed to cleanup last test');

      testDiv.innerHTML = '';
      this.template = testDiv.appendChild(document.createElement('template'));
      HTMLTemplateElement.decorate(this.template);
      if (this.expressions)
        this.template.bindingDelegate = new PolymerExpressions;
      var clone = this.fragment.cloneNode(true);
      this.template.content.appendChild(clone);
      this.template.setAttribute('repeat', '');
    },

    runMDV: function() {
      this.template.model = this.flip ? this.ping : this.pong;
      this.flip = !this.flip;
    },

    teardownMDVVariant: function() {
      if (this.template)
        this.template.clear();
      this.template = undefined;
      testDiv.innerHTML = '';
    },

    setupHandlebarsVariant: function() {
      testDiv.innerHTML = '';
      var div = document.createElement('div');
      div.appendChild(this.fragment.cloneNode(true));
      var stringTemplate = '{{#each this}}' + div.innerHTML + '{{/each}}';
      stringTemplate = stringTemplate.replace(/\[\[/g, '{{');
      stringTemplate = stringTemplate.replace(/\]\]/g, '}}');
      this.compiledTemplate = Handlebars.compile(stringTemplate);
    },

    runHandlebars: function() {
      testDiv.innerHTML = '';
      testDiv.innerHTML = this.compiledTemplate(this.flip ?
          this.ping : this.pong);
      if (!testDiv.querySelectorAll('div').length)
        console.error('Foo');
      this.flip = !this.flip;
    },

    teardownHandlebarsVariant: function() {
      testDiv.innerHTML = '';
    },

    setupVariant: function(testType) {
      switch (testType) {
        case 'MDV':
          this.setupMDVVariant();
          break;
        case 'Handlebars':
          this.setupHandlebarsVariant();
          break;
      }
    },

    run: function(testType) {
      switch (testType) {
        case 'MDV':
          this.runMDV();
          break;
        case 'Handlebars':
          this.runHandlebars();
          break;
      }
    },

    teardownVariant: function(testType) {
      switch (testType) {
        case 'MDV':
          this.teardownMDVVariant();
          break;
        case 'Handlebars':
          this.teardownHandlebarsVariant();
          break;
      }
    },

    destroy: function() {}
  });

  global.MDVBenchmark = MDVBenchmark;

})(this);
