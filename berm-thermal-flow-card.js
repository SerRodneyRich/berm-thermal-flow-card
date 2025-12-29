function t(t,e,o,i){var s,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(e,t))}return t}toString(){return this.cssText}};const r=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",$=u.reactiveElementPolyfillSupport,_=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},y=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);s?.call(this,e),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:g).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=i;const n=s.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,o,i=!1,s){if(void 0!==t){const n=this.constructor;if(!1===i&&(s=this[t]),o??=n.getPropertyOptions(t),!((o.hasChanged??y)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[_("elementProperties")]=new Map,v[_("finalized")]=new Map,$?.({ReactiveElement:v}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,b=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,O=document,M=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,z=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,D=/^(?:script|style|textarea|title)$/i,I=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),B=I(1),V=I(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),W=new WeakMap,X=O.createTreeWalker(O,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const o=t.length-1,i=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<o;e++){const o=t[e];let a,c,l=-1,d=0;for(;d<o.length&&(r.lastIndex=d,c=r.exec(o),null!==c);)d=r.lastIndex,r===T?"!--"===c[1]?r=F:void 0!==c[1]?r=z:void 0!==c[2]?(D.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=H):void 0!==c[3]&&(r=H):r===H?">"===c[0]?(r=s??T,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?H:'"'===c[3]?L:j):r===L||r===j?r=H:r===F||r===z?r=T:(r=H,s=void 0);const h=r===H&&t[e+1].startsWith("/>")?" ":"";n+=r===T?o+k:l>=0?(i.push(a),o.slice(0,l)+S+o.slice(l)+C+h):o+C+(-2===l?e:h)}return[J(t,n+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,o),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=l[n++],o=i.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:o,ctor:"."===r[1]?ot:"?"===r[1]?it:"@"===r[1]?st:et}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],M()),X.nextNode(),a.push({type:2,index:++s});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const o=O.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,i){if(e===q)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const n=R(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);X.currentNode=i;let s=X.nextNode(),n=0,r=0,a=o[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=o[++r]}n!==a?.index&&(s=X.nextNode(),n++)}return X.currentNode=O,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Z.createElement(J(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new tt(this.O(M()),this.O(M()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=G}_$AI(t,e=this,o,i){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const i=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Q(this,i[o+r],e,r),a===q&&(a=this._$AH[r]),n||=!R(a)||a!==this._$AH[r],a===G?t=G:t!==G&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class st extends et{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const o=this._$AH,i=t===G&&o!==G||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==G&&(o===G||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(Z,tt),(w.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;class ct extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new tt(e.insertBefore(M(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:y},ht=(t=dt,e,o)=>{const{kind:i,metadata:s}=o;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,o)=>"object"==typeof o?ht(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft="berm-thermal-flow-card",mt={0:0,1:15,2:22,3:29,4:36,5:43,6:50,7:54,8:58,9:62,10:65},$t={cold:"#2196F3",comfort_low:"#4CAF50",comfort_high:"#8BC34A",warm:"#FF9800",hot:"#F44336"},_t={cold:60,comfort_low:68,comfort_high:74,warm:78,hot:85},gt={enabled:!0,min_flow_rate:.75,max_flow_rate:6,dot_size:6,dots_per_line:3},yt={show_power:!0,show_rate_of_change:!0,temperature_unit:"F",compact_mode:!1,show_labels:!0},xt="mdi:fan",vt="mdi:home-thermometer",wt=1e3,bt=850,At=90,Et=75,St=85,Ct=80,Pt=120,kt=320,Ot=620,Mt=760,Rt=60,Ut=4,Nt=2,Tt=["unavailable","unknown","none"],Ft="outside-node",zt="fan-node",Ht="room-node",jt="greenhouse-node",Lt="label",Dt="primary-text",It="secondary-text",Bt="Missing required entities configuration",Vt="Outside temperature entity is required";function qt(t,e=_t,o=$t){const{cold:i=_t.cold,comfort_low:s=_t.comfort_low,comfort_high:n=_t.comfort_high,warm:r=_t.warm,hot:a=_t.hot}=e,{cold:c=$t.cold,comfort_low:l=$t.comfort_low,comfort_high:d=$t.comfort_high,warm:h=$t.warm,hot:p=$t.hot}=o;return t<i?c:t>=i&&t<s?Gt(c,l,(t-i)/(s-i)):t>=s&&t<n?Gt(l,d,(t-s)/(n-s)):t>=n&&t<r?Gt(d,h,(t-n)/(r-n)):t>=r&&t<a?Gt(h,p,(t-r)/(a-r)):p}function Gt(t,e,o){const i=Wt(t),s=Wt(e);if(!i||!s)return t;return function(t,e,o){return"#"+[t,e,o].map(t=>{const e=t.toString(16);return 1===e.length?"0"+e:e}).join("")}(Math.round(i.r+o*(s.r-i.r)),Math.round(i.g+o*(s.g-i.g)),Math.round(i.b+o*(s.b-i.b)))}function Wt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function Xt(t,e,o=0){const i=t.states[e];if(!i||Tt.includes(i.state))return o;const s=parseFloat(i.state);return isNaN(s)?o:s}function Jt(t,e){const o=t.states[e];return void 0!==o&&!Tt.includes(o.state)}function Kt(t,e){if(t<=0)return 0;const{min_flow_rate:o=.75,max_flow_rate:i=6}=e,s=i-(t-1)/9*(i-o);return Math.max(o,Math.min(i,s))}function Zt(t,e="F",o=1){return`${t.toFixed(o)}°${e}`}function Qt(t,e=1){if(null==t)return"N/A";return`${t>=0?"+":""}${t.toFixed(e)}°F/h`}function Yt(t,e,o,i,s=!0){if(!s)return`M ${t} ${e} L ${o} ${i}`;const n=(e+i)/2;return`M ${t} ${e} Q ${t} ${n}, ${(t+o)/2} ${n} T ${o} ${i}`}function te(t,e){const o={...t};return ee(t)&&ee(e)&&Object.keys(e).forEach(i=>{ee(e[i])?i in t?o[i]=te(t[i],e[i]):Object.assign(o,{[i]:e[i]}):Object.assign(o,{[i]:e[i]})}),o}function ee(t){return t&&"object"==typeof t&&!Array.isArray(t)}const oe=((t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new n(o,t,i)})`
  :host {
    display: block;
    --primary-text-color: var(--primary-text-color, #212121);
    --secondary-text-color: var(--secondary-text-color, #727272);
    --disabled-text-color: var(--disabled-text-color, #bdbdbd);
    --divider-color: var(--divider-color, rgba(0, 0, 0, 0.12));
  }

  ha-card {
    padding: 24px;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(
      --ha-card-box-shadow,
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2)
    );
  }

  .card-content {
    width: 100%;
    height: auto;
    position: relative;
  }

  svg {
    width: 100%;
    height: auto;
    min-height: 500px;
    aspect-ratio: 1000 / 850;
    display: block;
  }

  /* Node styles */
  .node {
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .node:hover {
    filter: brightness(1.1);
  }

  .node circle {
    stroke-width: 4;
    stroke: var(--primary-text-color);
    transition: all 0.3s ease;
  }

  .node.offline circle {
    stroke: var(--disabled-text-color);
    fill: rgba(189, 189, 189, 0.3);
    stroke-dasharray: 5, 5;
  }

  .node.offline text {
    fill: var(--disabled-text-color);
  }

  /* Text styles */
  .primary-text {
    font-size: 28px;
    font-weight: bold;
    fill: var(--primary-text-color);
    text-anchor: middle;
  }

  .secondary-text {
    font-size: 16px;
    fill: var(--secondary-text-color);
    text-anchor: middle;
  }

  .label-text {
    font-size: 18px;
    font-weight: 500;
    fill: var(--primary-text-color);
    text-anchor: middle;
  }

  /* Icon styles */
  .node-icon {
    font-size: 48px;
    fill: var(--primary-text-color);
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .offline-text {
    font-size: 10px;
    fill: var(--disabled-text-color);
    text-anchor: middle;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Flow line styles */
  .flow-line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: all 0.3s ease;
  }

  .flow-line.inactive {
    stroke-width: 1;
    stroke: var(--divider-color);
    stroke-dasharray: 5, 5;
  }

  .flow-line.active {
    stroke-width: 3;
  }

  /* Animated dots on flow lines */
  .flow-dot {
    /* Animation now handled by SVG animateMotion/animate elements */
  }

  /* Fan rotation animation */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .fan-icon.rotating {
    animation: rotate linear infinite;
  }

  .fan-icon.speed-0 { animation-duration: 0s; }
  .fan-icon.speed-1 { animation-duration: 5s; }
  .fan-icon.speed-2 { animation-duration: 4.5s; }
  .fan-icon.speed-3 { animation-duration: 4s; }
  .fan-icon.speed-4 { animation-duration: 3.5s; }
  .fan-icon.speed-5 { animation-duration: 3s; }
  .fan-icon.speed-6 { animation-duration: 2.5s; }
  .fan-icon.speed-7 { animation-duration: 2s; }
  .fan-icon.speed-8 { animation-duration: 1.5s; }
  .fan-icon.speed-9 { animation-duration: 1s; }
  .fan-icon.speed-10 { animation-duration: 0.7s; }

  /* Flow animation - now handled by SVG animateMotion/animate elements */
  /* Removed CSS keyframe animation that used offset-path (not supported on SVG) */

  /* Pulse animation for temperature warnings */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  .warning {
    animation: pulse 2s ease-in-out infinite;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .primary-text {
      font-size: 24px;
    }

    .secondary-text {
      font-size: 14px;
    }

    .label-text {
      font-size: 16px;
    }

    .node-icon {
      font-size: 40px;
    }
  }

  /* Compact mode */
  :host([compact]) .secondary-text {
    display: none;
  }

  :host([compact]) .label-text {
    font-size: 12px;
  }

  /* Static room (no fan connection) */
  .node.static circle {
    stroke-dasharray: 3, 3;
    stroke-width: 1.5;
  }

  /* Greenhouse special styling */
  .greenhouse-node circle {
    stroke-width: 3;
    stroke-dasharray: none;
  }

  /* Error state */
  .error {
    padding: 20px;
    color: var(--error-color, #db4437);
    background: var(--error-color-background, rgba(219, 68, 55, 0.1));
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  /* Loading state */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: var(--secondary-text-color);
  }

  .loading::after {
    content: '...';
    animation: loading 1.5s steps(4, end) infinite;
  }

  @keyframes loading {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }

  /* Tooltip (for future enhancement) */
  .tooltip {
    position: absolute;
    background: var(--primary-background-color, white);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
  }

  .tooltip.visible {
    opacity: 1;
  }

  /* Icon styling */
  ha-icon {
    --mdc-icon-size: 24px;
  }

  .outside-node ha-icon {
    --mdc-icon-size: 32px;
  }

  .fan-node ha-icon {
    --mdc-icon-size: 28px;
  }

  .room-node ha-icon {
    --mdc-icon-size: 24px;
  }
`;console.info("%c BERM-THERMAL-FLOW-CARD %c 0.1.0 ","color: white; font-weight: bold; background: #039be5","color: #039be5; font-weight: bold; background: white");let ie=class extends ct{static getConfigElement(){}static getStubConfig(){return{type:`custom:${ft}`,entities:{outside:{temperature:"sensor.outdoor_temperature"},fans:[],rooms:[]}}}static get styles(){return oe}setConfig(t){try{this._config=function(t){if(!t)throw new Error(Bt);if(!t.entities)throw new Error(Bt);if(!t.entities.outside||!t.entities.outside.temperature)throw new Error(Vt);const e=Array.isArray(t.entities.fans)?t.entities.fans:[],o=Array.isArray(t.entities.rooms)?t.entities.rooms:[],i=e.map((t,e)=>{if(!t.name)throw new Error(`Fan at index ${e} is missing 'name'`);if(!t.speed)throw new Error(`Fan '${t.name}' is missing 'speed' entity`);return{...t,power_map:t.power_map||mt}});return o.forEach((t,e)=>{if(!t.name)throw new Error(`Room at index ${e} is missing 'name'`);if(!t.temperature)throw new Error(`Room '${t.name}' is missing 'temperature' entity`);if(void 0!==t.fan_index&&null!==t.fan_index&&(t.fan_index<0||t.fan_index>=i.length))throw new Error(`Room '${t.name}' has invalid fan_index ${t.fan_index}. Must be between 0 and ${i.length-1}`)}),{type:"custom:berm-thermal-flow-card",entities:{outside:t.entities.outside,fans:i,rooms:o,greenhouse:t.entities.greenhouse},colors:te($t,t.colors||{}),temperature_thresholds:te(_t,t.temperature_thresholds||{}),animation:te(gt,t.animation||{}),display:te(yt,t.display||{})}}(t),this._error=void 0}catch(t){this._error=t instanceof Error?t.message:"Unknown error",console.error("Berm Thermal Flow Card configuration error:",t)}}getCardSize(){return 12}shouldUpdate(t){return!(!this._config||!this.hass)}_computeCardState(){const{entities:t,colors:e,temperature_thresholds:o}=this._config,i=Xt(this.hass,t.outside.temperature,70),s={temperature:i,rate:t.outside.rate?Xt(this.hass,t.outside.rate,0):void 0,color:qt(i,o,e)},n=t.fans.map(t=>{const e=Math.round(Xt(this.hass,t.speed,0)),o=function(t,e=mt){const o=Math.round(t).toString();return e[o]??mt[o]??0}(e,t.power_map||mt);return{name:t.name,speed:Math.max(0,Math.min(10,e)),power:o,offline:t.offline||!Jt(this.hass,t.speed),icon:t.icon||xt}}),r=t.rooms.map(t=>{const i=Xt(this.hass,t.temperature,70),s=t.delta?Xt(this.hass,t.delta,0):void 0,n=t.desired_temp?Xt(this.hass,t.desired_temp,70):void 0;return{name:t.name,temperature:i,delta:s,desired_temp:n,fan_index:t.fan_index,color:qt(i,o,e),icon:t.icon||vt}});let a;if(t.greenhouse?.enabled&&t.greenhouse.temperature){const i=Xt(this.hass,t.greenhouse.temperature,70);a={temperature:i,delta:t.greenhouse.delta?Xt(this.hass,t.greenhouse.delta,0):void 0,color:qt(i,o,e)}}return{outside:s,fans:n,rooms:r,greenhouse:a}}_generateFlowLines(t){if(!this._config)return[];const e=[],{fans:o,rooms:i}=t,{animation:s}=this._config,n=kt,r=Ot,a=Pt,c=wt/2;return o.forEach((i,r)=>{const l=this._getFanX(r,o.length),d=i.speed>0&&!i.offline;e.push({id:`outside-fan-${r}`,path:Yt(c,a+At,l,n-Et),from:{x:c,y:a},to:{x:l,y:n},speed:i.speed,animationDuration:d?Kt(i.speed,s):0,color:t.outside.color,active:d})}),i.forEach((t,a)=>{if(void 0!==t.fan_index&&null!==t.fan_index&&t.fan_index>=0&&t.fan_index<o.length){const c=o[t.fan_index],l=this._getFanX(t.fan_index,o.length),d=this._getRoomX(a,i.length),h=c.speed>0&&!c.offline;e.push({id:`fan${t.fan_index}-room${a}`,path:Yt(l,n+Et,d,r-St),from:{x:l,y:n},to:{x:d,y:r},speed:c.speed,animationDuration:h?Kt(c.speed,s):0,color:t.color,active:h})}}),e}_getFanX(t,e){return Rt+(wt-2*Rt)/(e+1)*(t+1)}_getRoomX(t,e){return Rt+(wt-2*Rt)/(e+1)*(t+1)}render(){if(!this._config||!this.hass)return B``;if(this._error)return B`
        <ha-card>
          <div class="error">
            <div class="error-icon">⚠️</div>
            <div>${this._error}</div>
          </div>
        </ha-card>
      `;const t=this._computeCardState();return B`
      <ha-card>
        <div class="card-content">
          ${this._renderSVG(t)}
        </div>
      </ha-card>
    `}_renderSVG(t){const e=this._generateFlowLines(t);return V`
      <svg viewBox="0 0 ${wt} ${bt}" xmlns="http://www.w3.org/2000/svg">
        <!-- Flow lines (drawn first, behind nodes) -->
        <g class="flow-lines">
          ${e.map(t=>this._renderFlowLine(t))}
        </g>

        <!-- Outside temperature node -->
        ${this._renderOutsideNode(t)}

        <!-- Fan nodes -->
        <g class="fan-nodes">
          ${t.fans.map((e,o)=>this._renderFanNode(e,o,t.fans.length))}
        </g>

        <!-- Room nodes -->
        <g class="room-nodes">
          ${t.rooms.map((e,o)=>this._renderRoomNode(e,o,t.rooms.length))}
        </g>

        <!-- Greenhouse node (if enabled) -->
        ${t.greenhouse?this._renderGreenhouseNode(t.greenhouse):""}
      </svg>
    `}_renderFlowLine(t){const{animation:e}=this._config;return V`
      <g class="flow-line-group">
        <!-- Base line -->
        <path
          class="flow-line ${t.active?"active":"inactive"}"
          d="${t.path}"
          stroke="${t.active?t.color:"var(--divider-color)"}"
          stroke-width="${t.active?Ut:Nt}"
        />

        <!-- Animated dots (only if active) -->
        ${t.active&&e?.enabled?this._renderFlowDots(t):""}
      </g>
    `}_renderFlowDots(t){const{animation:e}=this._config,o=e?.dots_per_line||3,i=e?.dot_size||6;return V`
      ${Array.from({length:o},(e,s)=>{const n=t.animationDuration/o*s;return V`
          <circle
            class="flow-dot"
            r="${i/2}"
            fill="${t.color}"
          >
            <animateMotion
              dur="${t.animationDuration}s"
              begin="${n}s"
              repeatCount="indefinite"
              path="${t.path}"
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              keyTimes="0;0.1;0.9;1"
              dur="${t.animationDuration}s"
              begin="${n}s"
              repeatCount="indefinite"
            />
          </circle>
        `})}
    `}_renderOutsideNode(t){const{outside:e}=t,{display:o}=this._config,i=wt/2,s=Pt,n=At;return V`
      <g class="node ${Ft}" data-entity="${this._config.entities.outside.temperature}">
        <circle cx="${i}" cy="${s}" r="${n}" fill="${e.color}" fill-opacity="0.15" />

        <!-- Temperature (top) -->
        <text x="${i}" y="${s-n+35}" class="${Dt}">
          ${Zt(e.temperature,o?.temperature_unit)}
        </text>

        <!-- Icon (center) -->
        <text x="${i}" y="${s+5}" class="node-icon">☁️</text>

        <!-- Rate of change (bottom) -->
        ${o?.show_rate_of_change&&void 0!==e.rate?V`
          <text x="${i}" y="${s+n-25}" class="${It}">
            ${Qt(e.rate)}
          </text>
        `:""}

        <!-- Label (below circle) -->
        <text x="${i}" y="${s+n+28}" class="${Lt}">Outside</text>
      </g>
    `}_renderFanNode(t,e,o){const i=this._getFanX(e,o),s=kt,n=Et;return V`
      <g class="node ${zt} ${t.offline?"offline":""}" data-fan-index="${e}">
        <circle cx="${i}" cy="${s}" r="${n}" fill="#808080" fill-opacity="${t.offline?.1:.25}" />

        <!-- Fan speed (top) -->
        <text x="${i}" y="${s-n+32}" class="${Dt}">
          ${t.offline?"OFF":`Speed ${t.speed}`}
        </text>

        <!-- Icon (center) -->
        <text x="${i}" y="${s+5}" class="node-icon">${t.offline?"⭕":"⚙️"}</text>

        <!-- Power hidden - not important per user -->

        <!-- Label (below circle) -->
        <text x="${i}" y="${s+n+28}" class="${Lt}">${t.name}</text>

        ${t.offline?V`
          <text x="${i}" y="${s+n+48}" class="offline-text">OFFLINE</text>
        `:""}
      </g>
    `}_renderRoomNode(t,e,o){const{display:i}=this._config,s=this._getRoomX(e,o),n=Ot,r=St,a=void 0===t.fan_index||null===t.fan_index;return V`
      <g class="node ${Ht} ${a?"static":""}" data-room-index="${e}">
        <circle cx="${s}" cy="${n}" r="${r}" fill="${t.color}" fill-opacity="0.2" />

        <!-- Temperature (top) -->
        <text x="${s}" y="${n-r+35}" class="${Dt}">
          ${Zt(t.temperature,i?.temperature_unit)}
        </text>

        <!-- Icon (center) -->
        <text x="${s}" y="${n+5}" class="node-icon">🏠</text>

        <!-- Rate of change (bottom) -->
        ${i?.show_rate_of_change&&void 0!==t.delta?V`
          <text x="${s}" y="${n+r-25}" class="${It}">
            ${Qt(t.delta)}
          </text>
        `:""}

        <!-- Label (below circle) -->
        <text x="${s}" y="${n+r+28}" class="${Lt}">${t.name}</text>
      </g>
    `}_renderGreenhouseNode(t){const{display:e}=this._config,o=wt/2,i=Mt,s=Ct;return V`
      <g class="node ${jt}">
        <circle cx="${o}" cy="${i}" r="${s}" fill="${t.color}" fill-opacity="0.2" />

        <!-- Temperature (top) -->
        <text x="${o}" y="${i-s+32}" class="${Dt}">
          ${Zt(t.temperature,e?.temperature_unit)}
        </text>

        <!-- Icon (center) -->
        <text x="${o}" y="${i+5}" class="node-icon">🌿</text>

        <!-- Rate of change (bottom) -->
        ${e?.show_rate_of_change&&void 0!==t.delta?V`
          <text x="${o}" y="${i+s-25}" class="${It}">
            ${Qt(t.delta)}
          </text>
        `:""}

        <!-- Label (above circle for greenhouse since it's at bottom) -->
        <text x="${o}" y="${i-s-15}" class="${Lt}">Greenhouse</text>
      </g>
    `}};t([pt({attribute:!1})],ie.prototype,"hass",void 0),t([ut()],ie.prototype,"_config",void 0),t([ut()],ie.prototype,"_error",void 0),ie=t([(t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(ft)],ie),window.customCards=window.customCards||[],window.customCards.push({type:ft,name:"Berm Thermal Flow Card",description:"Visualize airflow from outside temperature through fans to rooms with thermal analysis"});export{ie as BermThermalFlowCard};
