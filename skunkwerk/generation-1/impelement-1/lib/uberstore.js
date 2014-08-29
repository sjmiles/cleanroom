UberStore = function() {
  this.store = [];
  this.watchers = [];
};

UberStore.prototype = {
  add: function(value) {
    return this.store.push(value);
  },
  remove: function(key) {
    this.store[key] = undefined;
  },
  set: function(key, value) {
    var old = this.store[key];
    if (old !== value) {
      this.store[key] = value;
      var watchers = this.watchers[key];
      if (watchers) {
        watchers.forEach(function(w) {
          w(value, old);
        });
      }
    }
  },
  get: function(key) {
    return this.store[key];
  },
  watch: function(key, watcher) {
    var watchers = this.watchers[key];
    if (!watchers) {
      watchers = this.watchers[key] = [];
    }
    watchers.push(watcher);
  }
};

UberStore = new UberStore();
  
UberClient = {
  initUberClient: function() {
    this._map = {};
  },
  publishProperty: function(name) {
    this._map[name] = uberStore.add(null);
    Object.defineProperty(this, name, {
      get: function() {
        return UberStore.get(this._map[name]);
      },
      set: function(value) {
        return UberStore.set(this._map[name], value);
      }
    });      
  },
  bindProperty: function(name, targetName, target) {
    UberStore.remove(this._map[name]);
    this._map[name] = target._map[targetName];
  },
  watch: function(name, notify) {
    UberStore.watch(this._map[name], notify);
  }
};
