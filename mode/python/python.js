'use strict';(function(g){"object"==typeof exports&&"object"==typeof module?g(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],g):g(CodeMirror)})(function(g){function n(f){return new RegExp("^(("+f.join(")|(")+"))\\b")}function f(f){return f.scopes[f.scopes.length-1]}var A=n(["and","or","not","is"]),r="as assert break class continue def del elif else except finally for from global if import lambda pass raise return try while with yield in".split(" "),
t="abs all any bin bool bytearray callable chr classmethod compile complex delattr dict dir divmod enumerate eval filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip __import__ NotImplemented Ellipsis __debug__".split(" ");g.registerHelper("hintWords","python",r.concat(t));
g.defineMode("python",function(q,c){function l(a,b){a.sol()&&(b.indent=a.indentation());if(a.sol()&&"py"==f(b).type){var d=f(b).offset;if(a.eatSpace()){var e=a.indentation();e>d?u(b):e<d&&v(a,b)&&(b.errorToken=!0);return null}e=w(a,b);0<d&&v(a,b)&&(e+=" error");return e}return w(a,b)}function w(a,b){if(a.eatSpace())return null;if("#"==a.peek())return a.skipToEnd(),"comment";if(a.match(/^[0-9\.]/,!1)){var d=!1;a.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)&&(d=!0);a.match(/^\d+\.\d*/)&&(d=!0);a.match(/^\.\d+/)&&
(d=!0);if(d)return a.eat(/J/i),"number";d=!1;a.match(/^0x[0-9a-f]+/i)&&(d=!0);a.match(/^0b[01]+/i)&&(d=!0);a.match(/^0o[0-7]+/i)&&(d=!0);a.match(/^[1-9]\d*(e[\+\-]?\d+)?/)&&(a.eat(/J/i),d=!0);a.match(/^0(?![\dx])/i)&&(d=!0);if(d)return a.eat(/L/i),"number"}if(a.match(x))return b.tokenize=B(a.current()),b.tokenize(a,b);if(a.match(C)||a.match(D))return"punctuation";if(a.match(E)||a.match(y))return"operator";if(a.match(F))return"punctuation";if("."==b.lastToken&&a.match(m))return"property";if(a.match(G)||
a.match(A))return"keyword";if(a.match(H))return"builtin";if(a.match(/^(self|cls)\b/))return"variable-2";if(a.match(m))return"def"==b.lastToken||"class"==b.lastToken?"def":"variable";a.next();return"error"}function B(a){function b(b,f){for(;!b.eol();)if(b.eatWhile(/[^'"\\]/),b.eat("\\")){if(b.next(),d&&b.eol())return"string"}else{if(b.match(a))return f.tokenize=l,"string";b.eat(/['"]/)}if(d){if(c.singleLineStringErrors)return"error";f.tokenize=l}return"string"}for(;0<="rub".indexOf(a.charAt(0).toLowerCase());)a=
a.substr(1);var d=1==a.length;b.isString=!0;return b}function u(a){for(;"py"!=f(a).type;)a.scopes.pop();a.scopes.push({offset:f(a).offset+q.indentUnit,type:"py",align:null})}function v(a,b){for(a=a.indentation();1<b.scopes.length&&f(b).offset>a;){if("py"!=f(b).type)return!0;b.scopes.pop()}return f(b).offset!=a}var F=c.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.]/,E=c.doubleOperators||/^([!<>]==|<>|<<|>>|\/\/|\*\*)/,D=c.doubleDelimiters||/^(\+=|\-=|\*=|%=|\/=|&=|\|=|\^=)/,C=c.tripleDelimiters||/^(\/\/=|>>=|<<=|\*\*=)/,
p=c.hangingIndent||q.indentUnit,h=r,k=t;void 0!=c.extra_keywords&&(h=h.concat(c.extra_keywords));void 0!=c.extra_builtins&&(k=k.concat(c.extra_builtins));var z=c.version&&3==parseInt(c.version,10);if(z)var y=c.singleOperators||/^[\+\-\*\/%&|\^~<>!@]/,m=c.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/,h=h.concat("nonlocal False True None async await".split(" ")),k=k.concat(["ascii","bytes","exec","print"]),x=/^(([rbuf]|(br))?('{3}|"{3}|['"]))/i;else y=c.singleOperators||/^[\+\-\*\/%&|\^~<>!]/,
m=c.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/,h=h.concat(["exec","print"]),k=k.concat("apply basestring buffer cmp coerce execfile file intern long raw_input reduce reload unichr unicode xrange False True None".split(" ")),x=/^(([rub]|(ur)|(br))?('{3}|"{3}|['"]))/i;var G=n(h),H=n(k);return{startState:function(a){return{tokenize:l,scopes:[{offset:a||0,type:"py",align:null}],indent:a||0,lastToken:null,lambda:!1,dedent:0}},token:function(a,b){var d=b.errorToken;d&&(b.errorToken=!1);var e;a:{a.sol()&&(b.beginningOfLine=
!0);e=b.tokenize(a,b);var c=a.current();if(b.beginningOfLine&&"@"==c)e=a.match(m,!1)?"meta":z?"operator":"error";else{/\S/.test(c)&&(b.beginningOfLine=!1);"variable"!=e&&"builtin"!=e||"meta"!=b.lastToken||(e="meta");if("pass"==c||"return"==c)b.dedent+=1;"lambda"==c&&(b.lambda=!0);":"!=c||b.lambda||"py"!=f(b).type||u(b);var g=1==c.length?"[({".indexOf(c):-1;if(-1!=g){var g="])}".slice(g,g+1),h=a.match(/^([\s\[\{\(]|#.*)*$/,!1)?null:a.column()+1;b.scopes.push({offset:b.indent+p,type:g,align:h})}g="])}".indexOf(c);
if(-1!=g)if(f(b).type==c)b.indent=b.scopes.pop().offset-p;else{e="error";break a}0<b.dedent&&a.eol()&&"py"==f(b).type&&(1<b.scopes.length&&b.scopes.pop(),--b.dedent)}}e&&"comment"!=e&&(b.lastToken="keyword"==e||"punctuation"==e?a.current():e);"punctuation"==e&&(e=null);a.eol()&&b.lambda&&(b.lambda=!1);return d?e+" error":e},indent:function(a,b){if(a.tokenize!=l)return a.tokenize.isString?g.Pass:0;a=f(a);b=a.type==b.charAt(0);return null!=a.align?a.align-(b?1:0):a.offset-(b?p:0)},electricInput:/^\s*[\}\]\)]$/,
closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"}});g.defineMIME("text/x-python","python");g.defineMIME("text/x-cython",{name:"python",extra_keywords:"by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE".split(" ")})});
