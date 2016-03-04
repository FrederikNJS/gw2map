System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "javascript/bundle.js": [
      "javascript/gw2map.js",
      "npm:immutable@3.7.6",
      "github:walkermatt/ol3-layerswitcher@1.1.0",
      "npm:babel-runtime@5.8.34/helpers/sliced-to-array",
      "javascript/model/floor.js",
      "javascript/model/zone.js",
      "javascript/api.js",
      "github:walkermatt/ol3-layerswitcher@1.1.0/src/ol3-layerswitcher",
      "npm:immutable@3.7.6/dist/immutable",
      "npm:babel-runtime@5.8.34/helpers/class-call-check",
      "npm:rainbowvis.js@1.0.1",
      "npm:babel-runtime@5.8.34/core-js/get-iterator",
      "npm:babel-runtime@5.8.34/core-js/is-iterable",
      "npm:babel-runtime@5.8.34/helpers/create-class",
      "javascript/model/region.js",
      "javascript/model/coordinate.js",
      "javascript/model/rect.js",
      "javascript/model/sector.js",
      "javascript/model/heroPoint.js",
      "javascript/model/heart.js",
      "javascript/model/pointOfInterest.js",
      "npm:babel-runtime@5.8.34/core-js/promise",
      "npm:qwest@4.0.0",
      "javascript/model/continent.js",
      "npm:rainbowvis.js@1.0.1/rainbowvis",
      "npm:core-js@1.2.6/library/fn/get-iterator",
      "npm:core-js@1.2.6/library/fn/is-iterable",
      "npm:babel-runtime@5.8.34/core-js/object/define-property",
      "npm:core-js@1.2.6/library/fn/promise",
      "npm:qwest@4.0.0/src/qwest",
      "npm:core-js@1.2.6/library/modules/web.dom.iterable",
      "npm:core-js@1.2.6/library/modules/es6.string.iterator",
      "npm:core-js@1.2.6/library/modules/core.get-iterator",
      "npm:core-js@1.2.6/library/modules/es6.object.to-string",
      "npm:core-js@1.2.6/library/modules/$.core",
      "npm:core-js@1.2.6/library/modules/core.is-iterable",
      "npm:core-js@1.2.6/library/fn/object/define-property",
      "npm:pinkyswear@2.2.2",
      "npm:core-js@1.2.6/library/modules/es6.promise",
      "npm:jquery-param@0.1.2",
      "npm:core-js@1.2.6/library/modules/$.iterators",
      "npm:core-js@1.2.6/library/modules/es6.array.iterator",
      "npm:core-js@1.2.6/library/modules/$.iter-define",
      "npm:core-js@1.2.6/library/modules/$.string-at",
      "npm:core-js@1.2.6/library/modules/$.an-object",
      "npm:core-js@1.2.6/library/modules/core.get-iterator-method",
      "npm:core-js@1.2.6/library/modules/$",
      "npm:core-js@1.2.6/library/modules/$.library",
      "npm:core-js@1.2.6/library/modules/$.is-object",
      "npm:core-js@1.2.6/library/modules/$.global",
      "npm:core-js@1.2.6/library/modules/$.a-function",
      "npm:core-js@1.2.6/library/modules/$.strict-new",
      "npm:core-js@1.2.6/library/modules/$.same-value",
      "npm:core-js@1.2.6/library/modules/$.classof",
      "npm:core-js@1.2.6/library/modules/$.wks",
      "npm:core-js@1.2.6/library/modules/$.ctx",
      "npm:core-js@1.2.6/library/modules/$.export",
      "npm:core-js@1.2.6/library/modules/$.for-of",
      "npm:core-js@1.2.6/library/modules/$.set-proto",
      "npm:core-js@1.2.6/library/modules/$.species-constructor",
      "npm:core-js@1.2.6/library/modules/$.descriptors",
      "npm:core-js@1.2.6/library/modules/$.redefine-all",
      "npm:core-js@1.2.6/library/modules/$.set-to-string-tag",
      "npm:core-js@1.2.6/library/modules/$.iter-detect",
      "github:jspm/nodelibs-process@0.1.2",
      "npm:pinkyswear@2.2.2/pinkyswear",
      "npm:core-js@1.2.6/library/modules/$.microtask",
      "npm:core-js@1.2.6/library/modules/$.set-species",
      "npm:jquery-param@0.1.2/jquery-param",
      "npm:core-js@1.2.6/library/modules/$.add-to-unscopables",
      "npm:core-js@1.2.6/library/modules/$.iter-step",
      "npm:core-js@1.2.6/library/modules/$.has",
      "npm:core-js@1.2.6/library/modules/$.to-integer",
      "npm:core-js@1.2.6/library/modules/$.to-iobject",
      "npm:core-js@1.2.6/library/modules/$.hide",
      "npm:core-js@1.2.6/library/modules/$.redefine",
      "npm:core-js@1.2.6/library/modules/$.iter-create",
      "npm:core-js@1.2.6/library/modules/$.defined",
      "npm:core-js@1.2.6/library/modules/$.cof",
      "npm:core-js@1.2.6/library/modules/$.uid",
      "npm:core-js@1.2.6/library/modules/$.shared",
      "npm:core-js@1.2.6/library/modules/$.iter-call",
      "npm:core-js@1.2.6/library/modules/$.is-array-iter",
      "npm:core-js@1.2.6/library/modules/$.to-length",
      "github:jspm/nodelibs-process@0.1.2/index",
      "npm:core-js@1.2.6/library/modules/$.task",
      "npm:core-js@1.2.6/library/modules/$.fails",
      "npm:core-js@1.2.6/library/modules/$.property-desc",
      "npm:core-js@1.2.6/library/modules/$.iobject",
      "npm:core-js@1.2.6/library/modules/$.invoke",
      "npm:process@0.11.2",
      "npm:core-js@1.2.6/library/modules/$.html",
      "npm:core-js@1.2.6/library/modules/$.dom-create",
      "npm:process@0.11.2/browser"
    ]
  },
  globalEvaluationScope: false,

  map: {
    "babel": "npm:babel-core@5.8.34",
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "chai": "npm:chai@3.5.0",
    "chai-as-promised": "npm:chai-as-promised@5.2.0",
    "chai-immutable": "npm:chai-immutable@1.5.3",
    "core-js": "npm:core-js@1.2.6",
    "immutable": "npm:immutable@3.7.6",
    "mocha": "npm:mocha@2.4.5",
    "ol3-layerswitcher": "github:walkermatt/ol3-layerswitcher@1.1.0",
    "ol3-layerswither": "github:walkermatt/ol3-layerswitcher@1.1.0",
    "openlayers": "https://cdnjs.cloudflare.com/ajax/libs/ol3/3.12.1/ol-debug.min.js",
    "qwest": "npm:qwest@4.0.0",
    "rainbowvis.js": "npm:rainbowvis.js@1.0.1",
    "sinon": "npm:sinon@1.17.3",
    "sinon-chai": "npm:sinon-chai@2.8.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.11.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:asn1.js@4.4.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@4.10.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bn.js@4.10.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:browserify-aes@1.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.2",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@4.0.0": {
      "bn.js": "npm:bn.js@4.10.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.2"
    },
    "npm:browserify-sign@4.0.0": {
      "bn.js": "npm:bn.js@4.10.3",
      "browserify-rsa": "npm:browserify-rsa@4.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.3",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:chai-as-promised@5.2.0": {
      "chai": "npm:chai@3.5.0"
    },
    "npm:chai-immutable@1.5.3": {
      "chai": "npm:chai@3.5.0"
    },
    "npm:chai@3.5.0": {
      "assertion-error": "npm:assertion-error@1.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "deep-eql": "npm:deep-eql@0.1.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "type-detect": "npm:type-detect@1.0.0"
    },
    "npm:cipher-base@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.10.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.3"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.4"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.11.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.0",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.2"
    },
    "npm:deep-eql@0.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "type-detect": "npm:type-detect@0.1.1"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.10.3",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.0",
      "randombytes": "npm:randombytes@2.0.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:elliptic@6.2.3": {
      "bn.js": "npm:bn.js@4.10.3",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:formatio@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "samsam": "npm:samsam@1.1.2"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:miller-rabin@4.0.0": {
      "bn.js": "npm:bn.js@4.10.3",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:mocha@1.21.5": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:mocha@2.4.5": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:parse-asn1@5.0.0": {
      "asn1.js": "npm:asn1.js@4.4.0",
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:pinkyswear@2.2.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promises-aplus-tests": "npm:promises-aplus-tests@2.0.5"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:promises-aplus-tests@2.0.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "mocha": "npm:mocha@1.21.5",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "sinon": "npm:sinon@1.17.3",
      "underscore": "npm:underscore@1.6.0"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.10.3",
      "browserify-rsa": "npm:browserify-rsa@4.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "randombytes": "npm:randombytes@2.0.2"
    },
    "npm:qwest@4.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "jquery-param": "npm:jquery-param@0.1.2",
      "pinkyswear": "npm:pinkyswear@2.2.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:randombytes@2.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sinon-chai@2.8.0": {
      "chai": "npm:chai@3.5.0",
      "sinon": "npm:sinon@1.17.3"
    },
    "npm:sinon@1.17.3": {
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "formatio": "npm:formatio@1.1.1",
      "lolex": "npm:lolex@1.3.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "samsam": "npm:samsam@1.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
