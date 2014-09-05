Skunkwerks notes as of generation-3/polymer-4

## Goals

* performance
* performance
* performance

## FAQ

* if a feature isn't implemented right now, it does not mean it never will be
* the modules in polymer, when vulcanized with -strip option, are ~11kb 
  (~3kb zipped)
* the intent is to keep projects/mail/app.html perf rating < 1s on Nexus 10 

## Notable differences vs. Polymer 1.0

* you can only extend HTMLElement, there is no subclassing and no 
  'super()' implementation
* there are no expressions, and bindings to textContent are all-or-nothing (iow, 
  `<span>{{foo}}</span>` is supported but `<span>Hey {{foo}}!</span>)` is not
* binding names (inside mustaches) must refer to immediate properties on the 
  model 
* only works with native web-components on Chrome
* there is no `<polymer-element>` wrapper, put only one element per import (to 
  avoid template confusion)

## Code notes

* polymer.html
  * Polymer() is a simple function which chains it's input to Base, calls 
    registerCallback() and then document.register()
  
* base.html 
  * Base handles all de-sugaring duties in registerCallback()
  * Most of Base is implemented via mixins called 'features' that are defined
    in other modules (divide and conquer)
  
* data.html
  * define a shared-data concept to implement single-source-of-truth property 
    binding and basic observation via set-trap
  * Base is a DataClient
  * DataClients can publish a property, which creates a getter/setter 
    (on the prototype) for the property which are gateways to shared Datum 
    objects
  * DataClients can bind properties to other DataClients, causing the properties 
    to reference a single Datum object (no intelligent bind-time value 
    resolution at the moment, one Datum arbitrarily wins)
  * You can attach a `watch` callback to any published property. As of now, 
    notifications are synchronous.
  
* annotations.html
  * scans template DOM to construct a data-structure that captures markup 
    metadata that can be efficiently mapped to instance nodes
  * captures `{{}}` and `[[]]` expressions in textNodes
  * captures `<name>="{{}}|[[]]"` expressions in attributes
  * captures `<name>*="{{}}|[[]]"` expressions in attributes
  * captures `on-<event>` event declarations 

* bindings.html
  * at element instance time, combines template annotations with stamped DOM, 
    implementing event and data bindings
  * `updateBindings` can be called at any time to propagate model data to DOM
  * simple bindings can be made with `[[]]` syntax
  * bindings made with `{{}}` syntax cause the source property to be published and
    watched such that changes are immediately pushed to DOM  
  * bindings of the form `<name>*="{{property}}"` are considered property 
    bindings. If the target is a DataClient, a DataClient binding is installed.
    Otherwise, a generic property binding is established.
  * as of now, none of this work is delegated to target nodes: there is no 
    Node.bind
     
