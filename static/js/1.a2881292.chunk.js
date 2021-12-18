(this.webpackJsonpmetamarketsv2=this.webpackJsonpmetamarketsv2||[]).push([[1],{1245:function(e,r,t){(function(r){var n=t(1246),i=t(9),o=function(){};function f(e){return e.startsWith("int[")?"int256"+e.slice(3):"int"===e?"int256":e.startsWith("uint[")?"uint256"+e.slice(4):"uint"===e?"uint256":e.startsWith("fixed[")?"fixed128x128"+e.slice(5):"fixed"===e?"fixed128x128":e.startsWith("ufixed[")?"ufixed128x128"+e.slice(6):"ufixed"===e?"ufixed128x128":e}function a(e){return parseInt(/^\D+(\d+)$/.exec(e)[1],10)}function u(e){var r=/^\D+(\d+)x(\d+)$/.exec(e);return[parseInt(r[1],10),parseInt(r[2],10)]}function s(e){var r=e.match(/(.*)\[(.*?)\]$/);return r?""===r[2]?"dynamic":parseInt(r[2],10):null}function c(e){var r=typeof e;if("string"===r)return n.isHexPrefixed(e)?new i(n.stripHexPrefix(e),16):new i(e,10);if("number"===r)return new i(e);if(e.toArray)return e;throw new Error("Argument is not a number")}function l(e){var r=/^(\w+)\((.*)\)$/.exec(e);if(3!==r.length)throw new Error("Invalid method signature");var t=/^(.+)\):\((.+)$/.exec(r[2]);if(null!==t&&3===t.length)return{method:r[1],args:t[1].split(","),retargs:t[2].split(",")};var n=r[2].split(",");return 1===n.length&&""===n[0]&&(n=[]),{method:r[1],args:n}}function d(e,t){var o,f,l,h;if("address"===e)return d("uint160",c(t));if("bool"===e)return d("uint8",t?1:0);if("string"===e)return d("bytes",r.from(t,"utf8"));if(g(e)){if("undefined"===typeof t.length)throw new Error("Not an array?");if("dynamic"!==(o=s(e))&&0!==o&&t.length>o)throw new Error("Elements exceed array size: "+o);for(h in l=[],e=e.slice(0,e.lastIndexOf("[")),"string"===typeof t&&(t=JSON.parse(t)),t)l.push(d(e,t[h]));if("dynamic"===o){var p=d("uint256",t.length);l.unshift(p)}return r.concat(l)}if("bytes"===e)return t=r.from(t),l=r.concat([d("uint256",t.length),t]),t.length%32!==0&&(l=r.concat([l,n.zeros(32-t.length%32)])),l;if(e.startsWith("bytes")){if((o=a(e))<1||o>32)throw new Error("Invalid bytes<N> width: "+o);return n.setLengthRight(t,32)}if(e.startsWith("uint")){if((o=a(e))%8||o<8||o>256)throw new Error("Invalid uint<N> width: "+o);if((f=c(t)).bitLength()>o)throw new Error("Supplied uint exceeds width: "+o+" vs "+f.bitLength());if(f<0)throw new Error("Supplied uint is negative");return f.toArrayLike(r,"be",32)}if(e.startsWith("int")){if((o=a(e))%8||o<8||o>256)throw new Error("Invalid int<N> width: "+o);if((f=c(t)).bitLength()>o)throw new Error("Supplied int exceeds width: "+o+" vs "+f.bitLength());return f.toTwos(256).toArrayLike(r,"be",32)}if(e.startsWith("ufixed")){if(o=u(e),(f=c(t))<0)throw new Error("Supplied ufixed is negative");return d("uint256",f.mul(new i(2).pow(new i(o[1]))))}if(e.startsWith("fixed"))return o=u(e),d("int256",c(t).mul(new i(2).pow(new i(o[1]))));throw new Error("Unsupported or invalid type: "+e)}function h(e,t,n){var o,f,a,u;if("string"===typeof e&&(e=p(e)),"address"===e.name)return h(e.rawType,t,n).toArrayLike(r,"be",20).toString("hex");if("bool"===e.name)return h(e.rawType,t,n).toString()===new i(1).toString();if("string"===e.name){var s=h(e.rawType,t,n);return r.from(s,"utf8").toString()}if(e.isArray){for(a=[],o=e.size,"dynamic"===e.size&&(n=h("uint256",t,n).toNumber(),o=h("uint256",t,n).toNumber(),n+=32),u=0;u<o;u++){var c=h(e.subArray,t,n);a.push(c),n+=e.subArray.memoryUsage}return a}if("bytes"===e.name)return n=h("uint256",t,n).toNumber(),o=h("uint256",t,n).toNumber(),t.slice(n+32,n+32+o);if(e.name.startsWith("bytes"))return t.slice(n,n+e.size);if(e.name.startsWith("uint")){if((f=new i(t.slice(n,n+32),16,"be")).bitLength()>e.size)throw new Error("Decoded int exceeds width: "+e.size+" vs "+f.bitLength());return f}if(e.name.startsWith("int")){if((f=new i(t.slice(n,n+32),16,"be").fromTwos(256)).bitLength()>e.size)throw new Error("Decoded uint exceeds width: "+e.size+" vs "+f.bitLength());return f}if(e.name.startsWith("ufixed")){if(o=new i(2).pow(new i(e.size[1])),!(f=h("uint256",t,n)).mod(o).isZero())throw new Error("Decimals not supported yet");return f.div(o)}if(e.name.startsWith("fixed")){if(o=new i(2).pow(new i(e.size[1])),!(f=h("int256",t,n)).mod(o).isZero())throw new Error("Decimals not supported yet");return f.div(o)}throw new Error("Unsupported or invalid type: "+e.name)}function p(e){var r,t,n;if(g(e)){r=s(e);var i=e.slice(0,e.lastIndexOf("["));return i=p(i),t={isArray:!0,name:e,size:r,memoryUsage:"dynamic"===r?32:i.memoryUsage*r,subArray:i}}switch(e){case"address":n="uint160";break;case"bool":n="uint8";break;case"string":n="bytes"}if(t={rawType:n,name:e,memoryUsage:32},e.startsWith("bytes")&&"bytes"!==e||e.startsWith("uint")||e.startsWith("int")?t.size=a(e):(e.startsWith("ufixed")||e.startsWith("fixed"))&&(t.size=u(e)),e.startsWith("bytes")&&"bytes"!==e&&(t.size<1||t.size>32))throw new Error("Invalid bytes<N> width: "+t.size);if((e.startsWith("uint")||e.startsWith("int"))&&(t.size%8||t.size<8||t.size>256))throw new Error("Invalid int/uint<N> width: "+t.size);return t}function y(e){return"string"===e||"bytes"===e||"dynamic"===s(e)}function g(e){return e.lastIndexOf("]")===e.length-1}function v(e,r){return e.startsWith("address")||e.startsWith("bytes")?"0x"+r.toString("hex"):r.toString()}o.eventID=function(e,t){var i=e+"("+t.map(f).join(",")+")";return n.keccak256(r.from(i))},o.methodID=function(e,r){return o.eventID(e,r).slice(0,4)},o.rawEncode=function(e,t){var n=[],i=[],o=0;e.forEach((function(e){if(g(e)){var r=s(e);o+="dynamic"!==r?32*r:32}else o+=32}));for(var a=0;a<e.length;a++){var u=f(e[a]),c=d(u,t[a]);y(u)?(n.push(d("uint256",o)),i.push(c),o+=c.length):n.push(c)}return r.concat(n.concat(i))},o.rawDecode=function(e,t){var n=[];t=r.from(t);for(var i=0,o=0;o<e.length;o++){var a=p(f(e[o])),u=h(a,t,i);i+=a.memoryUsage,n.push(u)}return n},o.simpleEncode=function(e){var t=Array.prototype.slice.call(arguments).slice(1),n=l(e);if(t.length!==n.args.length)throw new Error("Argument count mismatch");return r.concat([o.methodID(n.method,n.args),o.rawEncode(n.args,t)])},o.simpleDecode=function(e,r){var t=l(e);if(!t.retargs)throw new Error("No return values in method");return o.rawDecode(t.retargs,r)},o.stringify=function(e,r){var t=[];for(var n in e){var i=e[n],o=r[n];o=/^[^\[]+\[.*\]$/.test(i)?o.map((function(e){return v(i,e)})).join(", "):v(i,o),t.push(o)}return t},o.solidityHexValue=function(e,t,i){var f,u;if(g(e)){var l=e.replace(/\[.*?\]/,"");if(!g(l)){var d=s(e);if("dynamic"!==d&&0!==d&&t.length>d)throw new Error("Elements exceed array size: "+d)}var h=t.map((function(e){return o.solidityHexValue(l,e,256)}));return r.concat(h)}if("bytes"===e)return t;if("string"===e)return r.from(t,"utf8");if("bool"===e){i=i||8;var p=Array(i/4).join("0");return r.from(t?p+"1":p+"0","hex")}if("address"===e){var y=20;return i&&(y=i/8),n.setLengthLeft(t,y)}if(e.startsWith("bytes")){if((f=a(e))<1||f>32)throw new Error("Invalid bytes<N> width: "+f);return n.setLengthRight(t,f)}if(e.startsWith("uint")){if((f=a(e))%8||f<8||f>256)throw new Error("Invalid uint<N> width: "+f);if((u=c(t)).bitLength()>f)throw new Error("Supplied uint exceeds width: "+f+" vs "+u.bitLength());return i=i||f,u.toArrayLike(r,"be",i/8)}if(e.startsWith("int")){if((f=a(e))%8||f<8||f>256)throw new Error("Invalid int<N> width: "+f);if((u=c(t)).bitLength()>f)throw new Error("Supplied int exceeds width: "+f+" vs "+u.bitLength());return i=i||f,u.toTwos(f).toArrayLike(r,"be",i/8)}throw new Error("Unsupported or invalid type: "+e)},o.solidityPack=function(e,t){if(e.length!==t.length)throw new Error("Number of types are not matching the values");for(var n=[],i=0;i<e.length;i++){var a=f(e[i]),u=t[i];n.push(o.solidityHexValue(a,u,null))}return r.concat(n)},o.soliditySHA3=function(e,r){return n.keccak256(o.solidityPack(e,r))},o.soliditySHA256=function(e,r){return n.sha256(o.solidityPack(e,r))},o.solidityRIPEMD160=function(e,r){return n.ripemd160(o.solidityPack(e,r),!0)},o.fromSerpent=function(e){for(var r,t=[],n=0;n<e.length;n++){var i=e[n];if("s"===i)t.push("bytes");else if("b"===i){for(var o="bytes",f=n+1;f<e.length&&((r=e[f])>="0"&&r<="9");)o+=e[f]-"0",f++;n=f-1,t.push(o)}else if("i"===i)t.push("int256");else{if("a"!==i)throw new Error("Unsupported or invalid type: "+i);t.push("int256[]")}}return t},o.toSerpent=function(e){for(var r=[],t=0;t<e.length;t++){var n=e[t];if("bytes"===n)r.push("s");else if(n.startsWith("bytes"))r.push("b"+a(n));else if("int256"===n)r.push("i");else{if("int256[]"!==n)throw new Error("Unsupported or invalid type: "+n);r.push("a")}}return r.join("")},e.exports=o}).call(this,t(10).Buffer)},1246:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),i=this&&this.__exportStar||function(e,r){for(var t in e)"default"===t||r.hasOwnProperty(t)||n(r,e,t)};Object.defineProperty(r,"__esModule",{value:!0}),r.secp256k1=r.rlp=r.BN=void 0;var o=t(789);r.secp256k1=o;var f=t(601),a=t(9);r.BN=a;var u=t(85);r.rlp=u,Object.assign(r,f),i(t(1249),r),i(t(1250),r),i(t(790),r),i(t(1251),r),i(t(692),r),i(t(1252),r)},1247:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0});var n=t(9),i=new(0,t(72).ec)("secp256k1"),o=i.curve;r.privateKeyExport=function(e,r){void 0===r&&(r=!0);var t=new n(e);if(t.ucmp(o.n)>=0)throw new Error("couldn't export to DER format");var a=i.g.mul(t);return f(a.getX(),a.getY(),r)},r.privateKeyModInverse=function(r){var t=new n(r);if(t.ucmp(o.n)>=0||t.isZero())throw new Error("private key range is invalid");return t.invm(o.n).toArrayLike(e,"be",32)},r.signatureImport=function(r){var t=new n(r.r);t.ucmp(o.n)>=0&&(t=new n(0));var i=new n(r.s);return i.ucmp(o.n)>=0&&(i=new n(0)),e.concat([t.toArrayLike(e,"be",32),i.toArrayLike(e,"be",32)])},r.ecdhUnsafe=function(e,r,t){void 0===t&&(t=!0);var a=i.keyFromPublic(e),u=new n(r);if(u.ucmp(o.n)>=0||u.isZero())throw new Error("scalar was invalid (zero or overflow)");var s=a.pub.mul(u);return f(s.getX(),s.getY(),t)};var f=function(r,t,n){var i;return n?((i=e.alloc(33))[0]=t.isOdd()?3:2,r.toArrayLike(e,"be",32).copy(i,1)):((i=e.alloc(65))[0]=4,r.toArrayLike(e,"be",32).copy(i,1),t.toArrayLike(e,"be",32).copy(i,33)),i}}).call(this,t(10).Buffer)},1248:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0});var t=e.from([48,129,211,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,133,48,129,130,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,33,2,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,36,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),n=e.from([48,130,1,19,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,165,48,129,162,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,65,4,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,72,58,218,119,38,163,196,101,93,164,251,252,14,17,8,168,253,23,180,72,166,133,84,25,156,71,208,143,251,16,212,184,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,68,3,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);r.privateKeyExport=function(r,i,o){void 0===o&&(o=!0);var f=e.from(o?t:n);return r.copy(f,o?8:9),i.copy(f,o?181:214),f},r.privateKeyImport=function(e){var r=e.length,t=0;if(r<t+1||48!==e[t])return null;if(r<(t+=1)+1||!(128&e[t]))return null;var n=127&e[t];if(n<1||n>2)return null;if(r<(t+=1)+n)return null;var i=e[t+n-1]|(n>1?e[t+n-2]<<8:0);return r<(t+=n)+i||r<t+3||2!==e[t]||1!==e[t+1]||1!==e[t+2]||r<(t+=3)+2||4!==e[t]||e[t+1]>32||r<t+2+e[t+1]?null:e.slice(t+2,t+2+e[t+1])},r.signatureImportLax=function(r){var t=e.alloc(32,0),n=e.alloc(32,0),i=r.length,o=0;if(48!==r[o++])return null;var f=r[o++];if(128&f&&(o+=f-128)>i)return null;if(2!==r[o++])return null;var a=r[o++];if(128&a){if(o+(f=a-128)>i)return null;for(;f>0&&0===r[o];o+=1,f-=1);for(a=0;f>0;o+=1,f-=1)a=(a<<8)+r[o]}if(a>i-o)return null;var u=o;if(o+=a,2!==r[o++])return null;var s=r[o++];if(128&s){if(o+(f=s-128)>i)return null;for(;f>0&&0===r[o];o+=1,f-=1);for(s=0;f>0;o+=1,f-=1)s=(s<<8)+r[o]}if(s>i-o)return null;var c=o;for(o+=s;a>0&&0===r[u];a-=1,u+=1);if(a>32)return null;var l=r.slice(u,u+a);for(l.copy(t,32-l.length);s>0&&0===r[c];s-=1,c+=1);if(s>32)return null;var d=r.slice(c,c+s);return d.copy(n,32-d.length),{r:t,s:n}}}).call(this,t(10).Buffer)},1249:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.KECCAK256_RLP=r.KECCAK256_RLP_S=r.KECCAK256_RLP_ARRAY=r.KECCAK256_RLP_ARRAY_S=r.KECCAK256_NULL=r.KECCAK256_NULL_S=r.TWO_POW256=r.MAX_INTEGER=void 0;var n=t(9);r.MAX_INTEGER=new n("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",16),r.TWO_POW256=new n("10000000000000000000000000000000000000000000000000000000000000000",16),r.KECCAK256_NULL_S="c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",r.KECCAK256_NULL=e.from(r.KECCAK256_NULL_S,"hex"),r.KECCAK256_RLP_ARRAY_S="1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",r.KECCAK256_RLP_ARRAY=e.from(r.KECCAK256_RLP_ARRAY_S,"hex"),r.KECCAK256_RLP_S="56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",r.KECCAK256_RLP=e.from(r.KECCAK256_RLP_S,"hex")}).call(this,t(10).Buffer)},1250:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.importPublic=r.privateToPublic=r.privateToAddress=r.publicToAddress=r.pubToAddress=r.isValidPublic=r.isValidPrivate=r.isPrecompiled=r.generateAddress2=r.generateAddress=r.isValidChecksumAddress=r.toChecksumAddress=r.isZeroAddress=r.isValidAddress=r.zeroAddress=void 0;var n=t(109),i=t(601),o=t(789),f=t(9),a=t(692),u=t(790);r.zeroAddress=function(){var e=a.zeros(20);return a.bufferToHex(e)},r.isValidAddress=function(e){return/^0x[0-9a-fA-F]{40}$/.test(e)},r.isZeroAddress=function(e){return r.zeroAddress()===a.addHexPrefix(e)},r.toChecksumAddress=function(e,r){e=i.stripHexPrefix(e).toLowerCase();for(var t=void 0!==r?r.toString()+"0x":"",n=u.keccak(t+e).toString("hex"),o="0x",f=0;f<e.length;f++)parseInt(n[f],16)>=8?o+=e[f].toUpperCase():o+=e[f];return o},r.isValidChecksumAddress=function(e,t){return r.isValidAddress(e)&&r.toChecksumAddress(e,t)===e},r.generateAddress=function(r,t){r=a.toBuffer(r);var n=new f(t);return n.isZero()?u.rlphash([r,null]).slice(-20):u.rlphash([r,e.from(n.toArray())]).slice(-20)},r.generateAddress2=function(r,t,i){var o=a.toBuffer(r),f=a.toBuffer(t),s=a.toBuffer(i);return n(20===o.length),n(32===f.length),u.keccak256(e.concat([e.from("ff","hex"),o,f,u.keccak256(s)])).slice(-20)},r.isPrecompiled=function(e){var r=a.unpad(e);return 1===r.length&&r[0]>=1&&r[0]<=8},r.isValidPrivate=function(e){return o.privateKeyVerify(e)},r.isValidPublic=function(r,t){return void 0===t&&(t=!1),64===r.length?o.publicKeyVerify(e.concat([e.from([4]),r])):!!t&&o.publicKeyVerify(r)},r.pubToAddress=function(e,r){return void 0===r&&(r=!1),e=a.toBuffer(e),r&&64!==e.length&&(e=o.publicKeyConvert(e,!1).slice(1)),n(64===e.length),u.keccak(e).slice(-20)},r.publicToAddress=r.pubToAddress,r.privateToAddress=function(e){return r.publicToAddress(r.privateToPublic(e))},r.privateToPublic=function(e){return e=a.toBuffer(e),o.publicKeyCreate(e,!1).slice(1)},r.importPublic=function(e){return 64!==(e=a.toBuffer(e)).length&&(e=o.publicKeyConvert(e,!1).slice(1)),e}}).call(this,t(10).Buffer)},1251:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.hashPersonalMessage=r.isValidSignature=r.fromRpcSig=r.toRpcSig=r.ecrecover=r.ecsign=void 0;var n=t(789),i=t(9),o=t(692),f=t(790);function a(e,r){return r?e-(2*r+35):e-27}function u(e){return 0===e||1===e}r.ecsign=function(e,r,t){var i=n.sign(e,r),o=i.recovery;return{r:i.signature.slice(0,32),s:i.signature.slice(32,64),v:t?o+(2*t+35):o+27}},r.ecrecover=function(r,t,i,f,s){var c=e.concat([o.setLength(i,32),o.setLength(f,32)],64),l=a(t,s);if(!u(l))throw new Error("Invalid signature v value");var d=n.recover(r,c,l);return n.publicKeyConvert(d,!1).slice(1)},r.toRpcSig=function(r,t,n,i){if(!u(a(r,i)))throw new Error("Invalid signature v value");return o.bufferToHex(e.concat([o.setLengthLeft(t,32),o.setLengthLeft(n,32),o.toBuffer(r)]))},r.fromRpcSig=function(e){var r=o.toBuffer(e);if(65!==r.length)throw new Error("Invalid signature length");var t=r[64];return t<27&&(t+=27),{v:t,r:r.slice(0,32),s:r.slice(32,64)}},r.isValidSignature=function(e,r,t,n,o){void 0===n&&(n=!0);var f=new i("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0",16),s=new i("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",16);if(32!==r.length||32!==t.length)return!1;if(!u(a(e,o)))return!1;var c=new i(r),l=new i(t);return!(c.isZero()||c.gt(s)||l.isZero()||l.gt(s))&&(!n||1!==l.cmp(f))},r.hashPersonalMessage=function(r){var t=e.from("\x19Ethereum Signed Message:\n"+r.length.toString(),"utf-8");return f.keccak(e.concat([t,r]))}}).call(this,t(10).Buffer)},1252:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.defineProperties=void 0;var n=t(109),i=t(601),o=t(85),f=t(692);r.defineProperties=function(r,t,a){if(r.raw=[],r._fields=[],r.toJSON=function(e){if(void 0===e&&(e=!1),e){var t={};return r._fields.forEach((function(e){t[e]="0x"+r[e].toString("hex")})),t}return f.baToJSON(r.raw)},r.serialize=function(){return o.encode(r.raw)},t.forEach((function(t,i){function o(){return r.raw[i]}function a(o){"00"!==(o=f.toBuffer(o)).toString("hex")||t.allowZero||(o=e.allocUnsafe(0)),t.allowLess&&t.length?(o=f.stripZeros(o),n(t.length>=o.length,"The field "+t.name+" must not have more "+t.length+" bytes")):t.allowZero&&0===o.length||!t.length||n(t.length===o.length,"The field "+t.name+" must have byte length of "+t.length),r.raw[i]=o}r._fields.push(t.name),Object.defineProperty(r,t.name,{enumerable:!0,configurable:!0,get:o,set:a}),t.default&&(r[t.name]=t.default),t.alias&&Object.defineProperty(r,t.alias,{enumerable:!1,configurable:!0,set:a,get:o})})),a)if("string"===typeof a&&(a=e.from(i.stripHexPrefix(a),"hex")),e.isBuffer(a)&&(a=o.decode(a)),Array.isArray(a)){if(a.length>r._fields.length)throw new Error("wrong number of fields in data");a.forEach((function(e,t){r[r._fields[t]]=f.toBuffer(e)}))}else{if("object"!==typeof a)throw new Error("invalid data");var u=Object.keys(a);t.forEach((function(e){-1!==u.indexOf(e.name)&&(r[e.name]=a[e.name]),-1!==u.indexOf(e.alias)&&(r[e.alias]=a[e.alias])}))}}}).call(this,t(10).Buffer)},601:function(e,r,t){"use strict";(function(r){var n=t(255),i=t(254);function o(e){var r=e;if("string"!==typeof r)throw new Error("[ethjs-util] while padding to even, value must be string, is currently "+typeof r+", while padToEven.");return r.length%2&&(r="0"+r),r}function f(e){return"0x"+e.toString(16)}e.exports={arrayContainsArray:function(e,r,t){if(!0!==Array.isArray(e))throw new Error("[ethjs-util] method arrayContainsArray requires input 'superset' to be an array got type '"+typeof e+"'");if(!0!==Array.isArray(r))throw new Error("[ethjs-util] method arrayContainsArray requires input 'subset' to be an array got type '"+typeof r+"'");return r[Boolean(t)?"some":"every"]((function(r){return e.indexOf(r)>=0}))},intToBuffer:function(e){var t=f(e);return new r(o(t.slice(2)),"hex")},getBinarySize:function(e){if("string"!==typeof e)throw new Error("[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '"+typeof e+"'.");return r.byteLength(e,"utf8")},isHexPrefixed:n,stripHexPrefix:i,padToEven:o,intToHex:f,fromAscii:function(e){for(var r="",t=0;t<e.length;t++){var n=e.charCodeAt(t).toString(16);r+=n.length<2?"0"+n:n}return"0x"+r},fromUtf8:function(e){return"0x"+o(new r(e,"utf8").toString("hex")).replace(/^0+|0+$/g,"")},toAscii:function(e){var r="",t=0,n=e.length;for("0x"===e.substring(0,2)&&(t=2);t<n;t+=2){var i=parseInt(e.substr(t,2),16);r+=String.fromCharCode(i)}return r},toUtf8:function(e){return new r(o(i(e).replace(/^0+|0+$/g,"")),"hex").toString("utf8")},getKeys:function(e,r,t){if(!Array.isArray(e))throw new Error("[ethjs-util] method getKeys expecting type Array as 'params' input, got '"+typeof e+"'");if("string"!==typeof r)throw new Error("[ethjs-util] method getKeys expecting type String for input 'key' got '"+typeof r+"'.");for(var n=[],i=0;i<e.length;i++){var o=e[i][r];if(t&&!o)o="";else if("string"!==typeof o)throw new Error("invalid abi");n.push(o)}return n},isHexString:function(e,r){return!("string"!==typeof e||!e.match(/^0x[0-9A-Fa-f]*$/))&&(!r||e.length===2+2*r)}}}).call(this,t(10).Buffer)},692:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.baToJSON=r.addHexPrefix=r.toUnsigned=r.fromSigned=r.bufferToHex=r.bufferToInt=r.toBuffer=r.stripZeros=r.unpad=r.setLengthRight=r.setLength=r.setLengthLeft=r.zeros=void 0;var n=t(601),i=t(9);r.zeros=function(r){return e.allocUnsafe(r).fill(0)},r.setLengthLeft=function(e,t,n){void 0===n&&(n=!1);var i=r.zeros(t);return e=r.toBuffer(e),n?e.length<t?(e.copy(i),i):e.slice(0,t):e.length<t?(e.copy(i,t-e.length),i):e.slice(-t)},r.setLength=r.setLengthLeft,r.setLengthRight=function(e,t){return r.setLength(e,t,!0)},r.unpad=function(e){for(var r=(e=n.stripHexPrefix(e))[0];e.length>0&&"0"===r.toString();)r=(e=e.slice(1))[0];return e},r.stripZeros=r.unpad,r.toBuffer=function(r){if(!e.isBuffer(r))if(Array.isArray(r))r=e.from(r);else if("string"===typeof r){if(!n.isHexString(r))throw new Error("Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: "+r);r=e.from(n.padToEven(n.stripHexPrefix(r)),"hex")}else if("number"===typeof r)r=n.intToBuffer(r);else if(null===r||void 0===r)r=e.allocUnsafe(0);else if(i.isBN(r))r=r.toArrayLike(e);else{if(!r.toArray)throw new Error("invalid type");r=e.from(r.toArray())}return r},r.bufferToInt=function(e){return new i(r.toBuffer(e)).toNumber()},r.bufferToHex=function(e){return"0x"+(e=r.toBuffer(e)).toString("hex")},r.fromSigned=function(e){return new i(e).fromTwos(256)},r.toUnsigned=function(r){return e.from(r.toTwos(256).toArray())},r.addHexPrefix=function(e){return"string"!==typeof e||n.isHexPrefixed(e)?e:"0x"+e},r.baToJSON=function(t){if(e.isBuffer(t))return"0x"+t.toString("hex");if(t instanceof Array){for(var n=[],i=0;i<t.length;i++)n.push(r.baToJSON(t[i]));return n}}}).call(this,t(10).Buffer)},730:function(e,r,t){e.exports=t(1245)},789:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.ecdhUnsafe=r.ecdh=r.recover=r.verify=r.sign=r.signatureImportLax=r.signatureImport=r.signatureExport=r.signatureNormalize=r.publicKeyCombine=r.publicKeyTweakMul=r.publicKeyTweakAdd=r.publicKeyVerify=r.publicKeyConvert=r.publicKeyCreate=r.privateKeyTweakMul=r.privateKeyTweakAdd=r.privateKeyModInverse=r.privateKeyNegate=r.privateKeyImport=r.privateKeyExport=r.privateKeyVerify=void 0;var n=t(149),i=t(1247),o=t(1248);r.privateKeyVerify=function(e){return 32===e.length&&n.privateKeyVerify(Uint8Array.from(e))},r.privateKeyExport=function(e,r){if(32!==e.length)throw new RangeError("private key length is invalid");var t=i.privateKeyExport(e,r);return o.privateKeyExport(e,t,r)},r.privateKeyImport=function(e){if(null!==(e=o.privateKeyImport(e))&&32===e.length&&r.privateKeyVerify(e))return e;throw new Error("couldn't import from DER format")},r.privateKeyNegate=function(r){return e.from(n.privateKeyNegate(Uint8Array.from(r)))},r.privateKeyModInverse=function(r){if(32!==r.length)throw new Error("private key length is invalid");return e.from(i.privateKeyModInverse(Uint8Array.from(r)))},r.privateKeyTweakAdd=function(r,t){return e.from(n.privateKeyTweakAdd(Uint8Array.from(r),t))},r.privateKeyTweakMul=function(r,t){return e.from(n.privateKeyTweakMul(Uint8Array.from(r),Uint8Array.from(t)))},r.publicKeyCreate=function(r,t){return e.from(n.publicKeyCreate(Uint8Array.from(r),t))},r.publicKeyConvert=function(r,t){return e.from(n.publicKeyConvert(Uint8Array.from(r),t))},r.publicKeyVerify=function(e){return(33===e.length||65===e.length)&&n.publicKeyVerify(Uint8Array.from(e))},r.publicKeyTweakAdd=function(r,t,i){return e.from(n.publicKeyTweakAdd(Uint8Array.from(r),Uint8Array.from(t),i))},r.publicKeyTweakMul=function(r,t,i){return e.from(n.publicKeyTweakMul(Uint8Array.from(r),Uint8Array.from(t),i))},r.publicKeyCombine=function(r,t){var i=[];return r.forEach((function(e){i.push(Uint8Array.from(e))})),e.from(n.publicKeyCombine(i,t))},r.signatureNormalize=function(r){return e.from(n.signatureNormalize(Uint8Array.from(r)))},r.signatureExport=function(r){return e.from(n.signatureExport(Uint8Array.from(r)))},r.signatureImport=function(r){return e.from(n.signatureImport(Uint8Array.from(r)))},r.signatureImportLax=function(e){if(0===e.length)throw new RangeError("signature length is invalid");var r=o.signatureImportLax(e);if(null===r)throw new Error("couldn't parse DER signature");return i.signatureImport(r)},r.sign=function(r,t,i){if(null===i)throw new TypeError("options should be an Object");var o=void 0;if(i){if(o={},null===i.data)throw new TypeError("options.data should be a Buffer");if(i.data){if(32!=i.data.length)throw new RangeError("options.data length is invalid");o.data=new Uint8Array(i.data)}if(null===i.noncefn)throw new TypeError("options.noncefn should be a Function");i.noncefn&&(o.noncefn=function(r,t,n,o,f){var a=null!=n?e.from(n):null,u=null!=o?e.from(o):null,s=e.from("");return i.noncefn&&(s=i.noncefn(e.from(r),e.from(t),a,u,f)),new Uint8Array(s)})}var f=n.ecdsaSign(Uint8Array.from(r),Uint8Array.from(t),o);return{signature:e.from(f.signature),recovery:f.recid}},r.verify=function(e,r,t){return n.ecdsaVerify(Uint8Array.from(r),Uint8Array.from(e),t)},r.recover=function(r,t,i,o){return e.from(n.ecdsaRecover(Uint8Array.from(t),i,Uint8Array.from(r),o))},r.ecdh=function(r,t){return e.from(n.ecdh(Uint8Array.from(r),Uint8Array.from(t),{}))},r.ecdhUnsafe=function(r,t,n){if(33!==r.length&&65!==r.length)throw new RangeError("public key length is invalid");if(32!==t.length)throw new RangeError("private key length is invalid");return e.from(i.ecdhUnsafe(Uint8Array.from(r),Uint8Array.from(t),n))}}).call(this,t(10).Buffer)},790:function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.rlphash=r.ripemd160=r.sha256=r.keccak256=r.keccak=void 0;var n=t(251),i=n.keccak224,o=n.keccak384,f=n.keccak256,a=n.keccak512,u=t(59),s=t(601),c=t(85),l=t(692);r.keccak=function(r,t){switch(void 0===t&&(t=256),r="string"!==typeof r||s.isHexString(r)?l.toBuffer(r):e.from(r,"utf8"),t||(t=256),t){case 224:return i(r);case 256:return f(r);case 384:return o(r);case 512:return a(r);default:throw new Error("Invald algorithm: keccak"+t)}},r.keccak256=function(e){return r.keccak(e)},r.sha256=function(e){return e=l.toBuffer(e),u("sha256").update(e).digest()},r.ripemd160=function(e,r){e=l.toBuffer(e);var t=u("rmd160").update(e).digest();return!0===r?l.setLength(t,32):t},r.rlphash=function(e){return r.keccak(c.encode(e))}}).call(this,t(10).Buffer)}}]);
//# sourceMappingURL=1.a2881292.chunk.js.map