## Super Secret Polymer Experimental Spy Mode

### Central idea: format Polymer as a tiny core with pluggable features.

#### In the Kit:

- `polymer/polymer.html` (and `dist/*` for minified), the tiny core plus a small 
  set of default features.
- `polymer/more-features/*` with some sample advanced features.
- `test/polymer-smoke.html`: smoke test (the only thing in the 
  kit directly viewable in a browser)
  
#### Requires:

  Chrome with native Web Components. Can be made to work with polyfills 
  in the future.

#### Payload:

- `dist/polymer.html` (6kb, concatenated but uncompressed)
- `dist/polymer.min.html` (3kb, compressed via Uglify)
- `dist/polymer.min.html.gz` (1.1Kb, not usable, just for size metric)

#### Limitations:

- no subclassing, only generates sub-types of `HTMLElement`
 
#### Default features:

- automatic creation of shadow-root
- automatic stamping of template
- automatic generation of `$` map (ids -> nodes)
- automatic event delegates via `listeners` object

Note: any or all these value-add features can be disabled, see `<x-trivial>`.

#### Advanced features:

- simplifed binding: `bind` object defines set traps for named 
  properties that can call a side-effect method or directly poke DOM
- simplified template annotation parsing: scan template and construct
  data mapping for special markers (e.g. `{{ }}`)
- `layout.html`
- misc other stuff
     
