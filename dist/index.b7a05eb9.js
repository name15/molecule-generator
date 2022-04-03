// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7fTMX":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jeorp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vertex", ()=>Vertex
);
parcelHelpers.export(exports, "Edge", ()=>Edge
);
parcelHelpers.export(exports, "Group", ()=>Group
);
parcelHelpers.export(exports, "Graph", ()=>Graph
);
var _modules = require("./modules");
class Vertex {
    constructor(valence, rest = valence, connectedVertices = [], coords = {
        x: 0,
        y: 0
    }){
        this.valence = valence;
        this.rest = rest;
        this.connectedVertices = connectedVertices;
        this.coords = coords;
    }
    static compare(vertexA, vertexB) {
        return vertexA.valence === vertexB.valence && vertexA.connectedVertices.length === vertexB.connectedVertices.length && vertexA.rest === vertexB.rest;
    }
}
class Edge {
    constructor(vertexA, vertexB, order){
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.order = order;
    }
}
class Group extends Array {
    static compare(groupA, groupB) {
        return groupA.length === groupB.length;
    }
}
class Graph {
    constructor(vertices, edges, groups){
        this.vertices = vertices;
        this.edges = edges;
        this.groups = groups;
    }
    // Returns a copy of the original graph
    static copy(graph) {
        let vertices = graph.vertices.map((vertex)=>new Vertex(vertex.valence, vertex.rest, [
                ...vertex.connectedVertices
            ], vertex.coords)
        );
        let edges = graph.edges.map((edge)=>new Edge(edge.vertexA, edge.vertexB, edge.order)
        );
        let groups = graph.groups.map((group)=>[
                ...group
            ]
        );
        return new Graph(vertices, edges, groups);
    }
    static compare(graphA, graphB) {
        return graphA.vertices.length === graphB.vertices.length && graphA.edges.length === graphB.edges.length && graphA.groups.length === graphB.groups.length;
    }
    // Connects two verticies of a graph together
    /*
  connect(vertexA: Vertex, vertexB: Vertex, order: number) {
      let a = this.vertices.findIndex((vertex) => vertex == vertexA);
      let b = this.vertices.findIndex((vertex) => vertex == vertexB);

      if (a == -1) a = this.vertices.push(vertexA) - 1;
      if (b == -1) b = this.vertices.push(vertexB) - 1;

      let edge = new Edge(a, b, order);
      this.edges.push(edge);

      vertexA.rest -= order;
      vertexB.rest -= order;
  }
  */ // Converts the graph to an SVG Element
    toSVG() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "150px");
        svg.setAttribute("height", "150px");
        let physics = new _modules.Physics(this);
        physics.update();
        let renderer = new _modules.Rendering(this);
        renderer.draw(svg);
        return svg;
    }
}
// TEMP
const ifconsole = {
    active: false,
    log: function(...data) {
        if (this.active) console.log(...data);
    },
    warn: function(...data) {
        if (this.active) console.warn(...data);
    }
};
class Analytics {
    // Determines whether two graphs are isomorphic
    static isIsomorphic(graphA, graphB) {
        if (!Graph.compare(graphA, graphB)) return false;
        let matchedGroups = Analytics.matchGroup(graphA, graphB);
        return matchedGroups !== undefined;
    }
    // This is a recursive function, exclusively used in the "isIsomorphic" method
    // Attempts to match the groups of two graphs with each other and returns the indices of matched groups
    static matchGroup(graphA, graphB, matches = []) {
        ifconsole.log(matches);
        let groupId = matches.length;
        let groupA = graphA.groups[groupId];
        for(let i = 0; i < graphB.groups.length; i++){
            if (matches.includes(i)) {
                ifconsole.log("Skip");
                continue;
            }
            let groupB = graphB.groups[i];
            if (!Group.compare(groupA, groupB)) {
                ifconsole.log("No match yet.");
                continue;
            }
            ifconsole.log("Match found!");
            let vertexAId = groupA[0];
            let vertexA = graphA.vertices[vertexAId];
            let matchedVertices;
            for(let j = 0; j < groupB.length; j++){
                let vertexBId = groupB[j];
                let vertexB = graphB.vertices[vertexBId];
                if (!Vertex.compare(vertexA, vertexB)) continue;
                ifconsole.log(`>>> Input #${j}: ${vertexAId} ${vertexBId}`);
                matchedVertices = Analytics.matchVertex(graphA, graphB, vertexA, vertexB, [
                    {
                        a: vertexAId,
                        b: vertexBId
                    }
                ]);
                ifconsole.log(`<<< Output #${j}: `, matchedVertices);
                if (matchedVertices) break;
            }
            ifconsole.log("Definite output: ", matchedVertices);
            if (matchedVertices === undefined) continue;
            let fork = [
                ...matches
            ];
            fork.push(i);
            if (groupId === graphA.groups.length - 1) {
                ifconsole.warn("All groups matched. Yahoo!", fork);
                return fork;
            }
            return Analytics.matchGroup(graphA, graphB, fork);
        }
    }
    // TODO: Work in progress...
    // This is a recursive function, exclusively used in the "isIsomorphic" method
    // Attempts to match the vertices of two groups with each other and returns the indices of matched vertices
    static matchVertex(graphA, graphB, vertexA, vertexB, matches) {
        for(let i = 0; i < vertexA.connectedVertices.length; i++){
            let connectA = vertexA.connectedVertices[i];
            if (matches.find((match)=>match.a === connectA.id
            )) continue;
            let vertA = graphA.vertices[connectA.id];
            for(let j = 0; j < vertexB.connectedVertices.length; j++){
                let connectB = vertexB.connectedVertices[j];
                if (connectA.order !== connectB.order) continue;
                if (matches.find((match)=>match.b === connectB.id
                )) continue;
                let vertB = graphB.vertices[connectB.id];
                if (!Vertex.compare(vertA, vertB)) {
                    ifconsole.log("\tNo match yet.");
                    continue;
                }
                let fork = matches.map((match)=>{
                    return {
                        ...match
                    };
                });
                fork.push({
                    a: connectA.id,
                    b: connectB.id
                });
                ifconsole.log("\tMatch found!", fork);
                return Analytics.matchVertex(graphA, graphB, vertA, vertB, fork);
            }
        }
        return matches;
    }
}
class Generator {
    // Results of the generator
    graphs = [];
    // Current iteration
    iteration = 0;
    // Input: An array of atom valences and settings for the generator
    constructor(atoms1, settings){
        let sum1 = atoms1.reduce((a, sum)=>sum += a
        , 0);
        if (sum1 % 2 !== 0) throw new Error(`Invalid atom sequence '${atoms1}'`);
        this.settings = settings ?? {
            allowMultipleGroups: false,
            maximumBondOrder: 3
        };
        // Initialization
        console.log(`Initialization`);
        let heading = document.createElement("h1");
        heading.textContent = `Initialize`;
        document.body.appendChild(heading);
        this.iteration = 1;
        let graph = new Graph([
            ...atoms1
        ].map((atom)=>new Vertex(atom)
        ), [], [
            ...atoms1
        ].map((atom, i)=>[
                i
            ]
        ));
        document.body.appendChild(graph.toSVG());
        this.graphs.push(graph);
        // Construct the molecule
        for(let i1 = 0; i1 < sum1 / 2; i1++)this.nextIteration();
    }
    // Every iteration the generator adds one new edge to the graph
    nextIteration() {
        // Print the current iteration to the DOM
        let heading = document.createElement("h1");
        heading.textContent = `Iteration #${this.iteration}`;
        document.body.appendChild(heading);
        let updatedGraphs = [];
        this.graphs.forEach((g)=>{
            // Connect two vertices with each other
            for(let a = 0; a < g.vertices.length; a++){
                let usedValencesB = []; // Optimization
                for(let b = 0; b < g.vertices.length; b++){
                    // Pick two different vertices
                    if (a >= b) continue;
                    // Check the bond order
                    if (g.vertices[a].rest === 0 || g.vertices[b].rest === 0) continue;
                    // Fork the graph
                    let graph = Graph.copy(g);
                    // Merge two groups
                    let groupA = graph.groups.find((group)=>group.includes(a)
                    ) ?? [];
                    let groupB = graph.groups.find((group)=>group.includes(b)
                    ) ?? [];
                    // Optimization: Keep track of the used valences
                    if (groupB.length === 1) {
                        let valenceB = graph.vertices[b].valence;
                        if (usedValencesB.includes(valenceB)) continue;
                        else usedValencesB.push(valenceB);
                    }
                    let groupAID = graph.groups.indexOf(groupA);
                    let groupBID = graph.groups.indexOf(groupB);
                    if (groupA !== groupB) {
                        graph.groups = graph.groups.filter((group, i)=>i !== groupAID && i !== groupBID
                        );
                        graph.groups.unshift(groupA.concat(groupB));
                    }
                    if (!this.settings.allowMultipleGroups) {
                        // Allow graphs with one main group only
                        let allowed = true;
                        for(let i = 1; i < graph.groups.length; i++)if (graph.groups[i].length > 1) {
                            allowed = false;
                            break;
                        }
                        if (!allowed) continue;
                    }
                    // Add an edge
                    let edge1 = graph.edges.find((edge)=>edge.vertexA === a && edge.vertexB === b || edge.vertexA === b && edge.vertexB === a
                    );
                    if (edge1) {
                        if (edge1.order === this.settings.maximumBondOrder) continue;
                        edge1.order++;
                    } else {
                        edge1 = new Edge(a, b, 1);
                        graph.edges.push(edge1);
                    }
                    // Update the two vertices
                    let vertexA = graph.vertices[a];
                    let vertexB = graph.vertices[b];
                    vertexA.rest--;
                    vertexB.rest--;
                    let connectA = vertexA.connectedVertices.find((connect)=>connect.id === b
                    );
                    if (connectA) connectA.order = edge1.order;
                    else vertexA.connectedVertices.push({
                        id: b,
                        order: edge1.order
                    });
                    let connectB = vertexB.connectedVertices.find((connect)=>connect.id === a
                    );
                    if (connectB) connectB.order = edge1.order;
                    else vertexB.connectedVertices.push({
                        id: a,
                        order: edge1.order
                    });
                    // Compare with previous graphs
                    let isomorphic = -1;
                    for(let i2 = 0; i2 < updatedGraphs.length; i2++)if (Analytics.isIsomorphic(graph, updatedGraphs[i2])) {
                        isomorphic = i2;
                        break;
                    }
                    // Render on DOM
                    let div = document.createElement("div");
                    let text = document.createElement("p");
                    text.setAttribute("style", "position: absolute");
                    let svg = graph.toSVG();
                    div.append(text, svg);
                    if (isomorphic !== -1) {
                        text.textContent = `Isomer: ${isomorphic}`;
                        svg.setAttribute("style", "background-color: hsla(0, 50%, 50%, 33%)");
                        document.body.appendChild(div);
                        continue;
                    }
                    text.textContent = `Id: ${updatedGraphs.length}`;
                    svg.setAttribute("style", "background-color: hsla(120, 50%, 50%, 33%)");
                    document.body.appendChild(div);
                    // Save the unique graphs for the next iteration
                    updatedGraphs.push(graph);
                }
            }
        });
        console.log(`Iteration #${this.iteration}`, updatedGraphs);
        this.graphs = updatedGraphs;
        this.iteration++;
    }
}
// INPUT
let atoms = [
    3,
    3,
    3,
    1,
    1,
    1
];
new Generator(atoms);

},{"./modules":"deqGz","@parcel/transformer-js/src/esmodule-helpers.js":"jwyXF"}]},["7fTMX","jeorp"], "jeorp", "parcelRequirefae0")

//# sourceMappingURL=index.b7a05eb9.js.map
