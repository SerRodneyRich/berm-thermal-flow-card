function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",$=u.reactiveElementPolyfillSupport,_=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const r=this.constructor;if(!1===o&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[_("elementProperties")]=new Map,v[_("finalized")]=new Map,$?.({ReactiveElement:v}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,b=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,k=document,M=()=>k.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,H=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,D=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,V=k.createTreeWalker(k,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=T;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===T?"!--"===c[1]?n=F:void 0!==c[1]?n=H:void 0!==c[2]?(D.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=z):void 0!==c[3]&&(n=z):n===z?">"===c[0]?(n=s??T,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?z:'"'===c[3]?L:j):n===L||n===j?n=z:n===F||n===H?n=T:(n=z,s=void 0);const h=n===z&&t[e+1].startsWith("/>")?" ":"";r+=n===T?i+O:l>=0?(o.push(a),i.slice(0,l)+S+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[c,l]=X(t,e);if(this.el=J.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=V.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=o.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Y}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(D.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),V.nextNode(),a.push({type:2,index:++s});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,o){if(e===I)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=R(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=K(t,s._$AS(t,e.values),s,o)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??k).importNode(e,!0);V.currentNode=o;let s=V.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=V.nextNode(),r++)}return V.currentNode=k,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),R(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Z(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=K(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=K(this,o[i+n],e,n),a===I&&(a=this._$AH[n]),r||=!R(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===I)return;const i=this._$AH,o=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class nt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new Q(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:y},lt=(t=ct,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ht(t){return dt({...t,state:!0,attribute:!1})}const pt="berm-thermal-flow-card",ut={0:0,1:15,2:22,3:29,4:36,5:43,6:50,7:54,8:58,9:62,10:65},ft={cold:"#2196F3",comfort_low:"#4CAF50",comfort_high:"#8BC34A",warm:"#FF9800",hot:"#F44336"},mt={cold:60,comfort_low:68,comfort_high:74,warm:78,hot:85},$t={enabled:!0,min_flow_rate:.75,max_flow_rate:6,dot_size:6,dots_per_line:3},_t={show_power:!0,show_rate_of_change:!0,temperature_unit:"F",compact_mode:!1,show_labels:!0},gt="mdi:fan",yt="mdi:home-thermometer",xt=1e3,vt=600,wt=60,bt=45,At=50,Et=55,St=80,Ct=220,Pt=450,Ot=560,kt=50,Mt=3,Rt=1,Ut=["unavailable","unknown","none"],Nt="outside-node",Tt="fan-node",Ft="room-node",Ht="greenhouse-node",zt="label",jt="primary-text",Lt="secondary-text",Dt="Missing required entities configuration",Bt="Outside temperature entity is required";function It(t,e=mt,i=ft){const{cold:o=mt.cold,comfort_low:s=mt.comfort_low,comfort_high:r=mt.comfort_high,warm:n=mt.warm,hot:a=mt.hot}=e,{cold:c=ft.cold,comfort_low:l=ft.comfort_low,comfort_high:d=ft.comfort_high,warm:h=ft.warm,hot:p=ft.hot}=i;return t<o?c:t>=o&&t<s?Wt(c,l,(t-o)/(s-o)):t>=s&&t<r?Wt(l,d,(t-s)/(r-s)):t>=r&&t<n?Wt(d,h,(t-r)/(n-r)):t>=n&&t<a?Wt(h,p,(t-n)/(a-n)):p}function Wt(t,e,i){const o=qt(t),s=qt(e);if(!o||!s)return t;return function(t,e,i){return"#"+[t,e,i].map(t=>{const e=t.toString(16);return 1===e.length?"0"+e:e}).join("")}(Math.round(o.r+i*(s.r-o.r)),Math.round(o.g+i*(s.g-o.g)),Math.round(o.b+i*(s.b-o.b)))}function qt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function Vt(t,e,i=0){const o=t.states[e];if(!o||Ut.includes(o.state))return i;const s=parseFloat(o.state);return isNaN(s)?i:s}function Gt(t,e){const i=t.states[e];return void 0!==i&&!Ut.includes(i.state)}function Xt(t,e){if(t<=0)return 0;const{min_flow_rate:i=.75,max_flow_rate:o=6}=e,s=o-(t-1)/9*(o-i);return Math.max(i,Math.min(o,s))}function Jt(t,e="F",i=1){return`${t.toFixed(i)}°${e}`}function Kt(t,e=1){if(null==t)return"N/A";return`${t>=0?"+":""}${t.toFixed(e)}°F/h`}function Zt(t,e,i,o,s=!0){if(!s)return`M ${t} ${e} L ${i} ${o}`;const r=(e+o)/2;return`M ${t} ${e} Q ${t} ${r}, ${(t+i)/2} ${r} T ${i} ${o}`}function Qt(t,e){const i={...t};return Yt(t)&&Yt(e)&&Object.keys(e).forEach(o=>{Yt(e[o])?o in t?i[o]=Qt(t[o],e[o]):Object.assign(i,{[o]:e[o]}):Object.assign(i,{[o]:e[o]})}),i}function Yt(t){return t&&"object"==typeof t&&!Array.isArray(t)}const te=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)})`
  :host {
    display: block;
    --primary-text-color: var(--primary-text-color, #212121);
    --secondary-text-color: var(--secondary-text-color, #727272);
    --disabled-text-color: var(--disabled-text-color, #bdbdbd);
    --divider-color: var(--divider-color, rgba(0, 0, 0, 0.12));
  }

  ha-card {
    padding: 16px;
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
    aspect-ratio: 1000 / 600;
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
    stroke-width: 2;
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
    font-size: 18px;
    font-weight: bold;
    fill: var(--primary-text-color);
    text-anchor: middle;
  }

  .secondary-text {
    font-size: 12px;
    fill: var(--secondary-text-color);
    text-anchor: middle;
  }

  .label-text {
    font-size: 14px;
    font-weight: 500;
    fill: var(--primary-text-color);
    text-anchor: middle;
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
    fill: currentColor;
    opacity: 0.8;
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

  /* Flow animation */
  @keyframes flow {
    0% {
      offset-distance: 0%;
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      offset-distance: 100%;
      opacity: 0;
    }
  }

  .flow-dot {
    animation: flow linear infinite;
  }

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
      font-size: 16px;
    }

    .secondary-text {
      font-size: 10px;
    }

    .label-text {
      font-size: 12px;
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
`;console.info("%c BERM-THERMAL-FLOW-CARD %c 0.1.0 ","color: white; font-weight: bold; background: #039be5","color: #039be5; font-weight: bold; background: white");let ee=class extends nt{static async getConfigElement(){return document.createElement("berm-thermal-flow-card-editor")}static getStubConfig(){return{type:`custom:${pt}`,entities:{outside:{temperature:"sensor.outdoor_temperature"},fans:[],rooms:[]}}}static get styles(){return te}setConfig(t){try{this._config=function(t){if(!t)throw new Error(Dt);if(!t.entities)throw new Error(Dt);if(!t.entities.outside||!t.entities.outside.temperature)throw new Error(Bt);const e=Array.isArray(t.entities.fans)?t.entities.fans:[],i=Array.isArray(t.entities.rooms)?t.entities.rooms:[],o=e.map((t,e)=>{if(!t.name)throw new Error(`Fan at index ${e} is missing 'name'`);if(!t.speed)throw new Error(`Fan '${t.name}' is missing 'speed' entity`);return{...t,power_map:t.power_map||ut}});return i.forEach((t,e)=>{if(!t.name)throw new Error(`Room at index ${e} is missing 'name'`);if(!t.temperature)throw new Error(`Room '${t.name}' is missing 'temperature' entity`);if(void 0!==t.fan_index&&null!==t.fan_index&&(t.fan_index<0||t.fan_index>=o.length))throw new Error(`Room '${t.name}' has invalid fan_index ${t.fan_index}. Must be between 0 and ${o.length-1}`)}),{type:"custom:berm-thermal-flow-card",entities:{outside:t.entities.outside,fans:o,rooms:i,greenhouse:t.entities.greenhouse},colors:Qt(ft,t.colors||{}),temperature_thresholds:Qt(mt,t.temperature_thresholds||{}),animation:Qt($t,t.animation||{}),display:Qt(_t,t.display||{})}}(t),this._error=void 0}catch(t){this._error=t instanceof Error?t.message:"Unknown error",console.error("Berm Thermal Flow Card configuration error:",t)}}getCardSize(){return 12}shouldUpdate(t){return!(!this._config||!this.hass)}_computeCardState(){const{entities:t,colors:e,temperature_thresholds:i}=this._config,o=Vt(this.hass,t.outside.temperature,70),s={temperature:o,rate:t.outside.rate?Vt(this.hass,t.outside.rate,0):void 0,color:It(o,i,e)},r=t.fans.map(t=>{const e=Math.round(Vt(this.hass,t.speed,0)),i=function(t,e=ut){const i=Math.round(t).toString();return e[i]??ut[i]??0}(e,t.power_map||ut);return{name:t.name,speed:Math.max(0,Math.min(10,e)),power:i,offline:t.offline||!Gt(this.hass,t.speed),icon:t.icon||gt}}),n=t.rooms.map(t=>{const o=Vt(this.hass,t.temperature,70),s=t.delta?Vt(this.hass,t.delta,0):void 0,r=t.desired_temp?Vt(this.hass,t.desired_temp,70):void 0;return{name:t.name,temperature:o,delta:s,desired_temp:r,fan_index:t.fan_index,color:It(o,i,e),icon:t.icon||yt}});let a;if(t.greenhouse?.enabled&&t.greenhouse.temperature){const o=Vt(this.hass,t.greenhouse.temperature,70);a={temperature:o,delta:t.greenhouse.delta?Vt(this.hass,t.greenhouse.delta,0):void 0,color:It(o,i,e)}}return{outside:s,fans:r,rooms:n,greenhouse:a}}_generateFlowLines(t){if(!this._config)return[];const e=[],{fans:i,rooms:o}=t,{animation:s}=this._config,r=Ct,n=Pt,a=St,c=xt/2;return i.forEach((o,n)=>{const l=this._getFanX(n,i.length),d=o.speed>0&&!o.offline;e.push({id:`outside-fan-${n}`,path:Zt(c,a+wt,l,r-bt),from:{x:c,y:a},to:{x:l,y:r},speed:o.speed,animationDuration:d?Xt(o.speed,s):0,color:t.outside.color,active:d})}),o.forEach((t,a)=>{if(void 0!==t.fan_index&&null!==t.fan_index&&t.fan_index>=0&&t.fan_index<i.length){const c=i[t.fan_index],l=this._getFanX(t.fan_index,i.length),d=this._getRoomX(a,o.length),h=c.speed>0&&!c.offline;e.push({id:`fan${t.fan_index}-room${a}`,path:Zt(l,r+bt,d,n-At),from:{x:l,y:r},to:{x:d,y:n},speed:c.speed,animationDuration:h?Xt(c.speed,s):0,color:t.color,active:h})}}),e}_getFanX(t,e){return kt+(xt-2*kt)/(e+1)*(t+1)}_getRoomX(t,e){return kt+(xt-2*kt)/(e+1)*(t+1)}render(){if(!this._config||!this.hass)return B``;if(this._error)return B`
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
    `}_renderSVG(t){const e=this._generateFlowLines(t);return B`
      <svg viewBox="0 0 ${xt} ${vt}" xmlns="http://www.w3.org/2000/svg">
        <!-- Flow lines (drawn first, behind nodes) -->
        <g class="flow-lines">
          ${e.map(t=>this._renderFlowLine(t))}
        </g>

        <!-- Outside temperature node -->
        ${this._renderOutsideNode(t)}

        <!-- Fan nodes -->
        <g class="fan-nodes">
          ${t.fans.map((e,i)=>this._renderFanNode(e,i,t.fans.length))}
        </g>

        <!-- Room nodes -->
        <g class="room-nodes">
          ${t.rooms.map((e,i)=>this._renderRoomNode(e,i,t.rooms.length))}
        </g>

        <!-- Greenhouse node (if enabled) -->
        ${t.greenhouse?this._renderGreenhouseNode(t.greenhouse):""}
      </svg>
    `}_renderFlowLine(t){const{animation:e}=this._config;return B`
      <g class="flow-line-group">
        <!-- Base line -->
        <path
          class="flow-line ${t.active?"active":"inactive"}"
          d="${t.path}"
          stroke="${t.active?t.color:"var(--divider-color)"}"
          stroke-width="${t.active?Mt:Rt}"
        />

        <!-- Animated dots (only if active) -->
        ${t.active&&e?.enabled?this._renderFlowDots(t):""}
      </g>
    `}_renderFlowDots(t){const{animation:e}=this._config,i=e?.dots_per_line||3,o=e?.dot_size||6;return B`
      ${Array.from({length:i},(e,s)=>{const r=t.animationDuration/i*s;return B`
          <circle
            class="flow-dot"
            r="${o/2}"
            fill="${t.color}"
            style="
              offset-path: path('${t.path}');
              animation-duration: ${t.animationDuration}s;
              animation-delay: ${r}s;
            "
          />
        `})}
    `}_renderOutsideNode(t){const{outside:e}=t,{display:i}=this._config,o=xt/2,s=St,r=wt;return B`
      <g class="node ${Nt}" data-entity="${this._config.entities.outside.temperature}">
        <circle cx="${o}" cy="${s}" r="${r}" fill="${e.color}" fill-opacity="0.2" />

        <!-- Temperature -->
        <text x="${o}" y="${s-5}" class="${jt}">
          ${Jt(e.temperature,i?.temperature_unit)}
        </text>

        <!-- Rate of change (if available and enabled) -->
        ${i?.show_rate_of_change&&void 0!==e.rate?B`
          <text x="${o}" y="${s+15}" class="${Lt}">
            ${Kt(e.rate)}
          </text>
        `:""}

        <!-- Label -->
        <text x="${o}" y="${s+r+20}" class="${zt}">Outside</text>
      </g>
    `}_renderFanNode(t,e,i){const{display:o}=this._config,s=this._getFanX(e,i),r=Ct,n=bt;return B`
      <g class="node ${Tt} ${t.offline?"offline":""}" data-fan-index="${e}">
        <circle cx="${s}" cy="${r}" r="${n}" fill="#808080" fill-opacity="${t.offline?.1:.3}" />

        <!-- Fan speed -->
        <text x="${s}" y="${r-10}" class="${jt}">
          ${t.offline?"OFF":t.speed}
        </text>

        <!-- Power consumption (if enabled) -->
        ${o?.show_power&&!t.offline?B`
          <text x="${s}" y="${r+10}" class="${Lt}">
            ${a=t.power,0===a?"OFF":a<1e3?`${a}W`:`${(a/1e3).toFixed(2)}kW`}
          </text>
        `:""}

        <!-- Label -->
        <text x="${s}" y="${r+n+20}" class="${zt}">${t.name}</text>

        ${t.offline?B`
          <text x="${s}" y="${r+n+35}" class="offline-text">OFFLINE</text>
        `:""}
      </g>
    `;var a}_renderRoomNode(t,e,i){const{display:o}=this._config,s=this._getRoomX(e,i),r=Pt,n=At,a=void 0===t.fan_index||null===t.fan_index;return B`
      <g class="node ${Ft} ${a?"static":""}" data-room-index="${e}">
        <circle cx="${s}" cy="${r}" r="${n}" fill="${t.color}" fill-opacity="0.3" />

        <!-- Temperature -->
        <text x="${s}" y="${r-5}" class="${jt}">
          ${Jt(t.temperature,o?.temperature_unit)}
        </text>

        <!-- Rate of change (if available and enabled) -->
        ${o?.show_rate_of_change&&void 0!==t.delta?B`
          <text x="${s}" y="${r+15}" class="${Lt}">
            ${Kt(t.delta)}
          </text>
        `:""}

        <!-- Label -->
        <text x="${s}" y="${r+n+20}" class="${zt}">${t.name}</text>
      </g>
    `}_renderGreenhouseNode(t){const{display:e}=this._config,i=xt/2,o=Ot,s=Et;return B`
      <g class="node ${Ht}">
        <circle cx="${i}" cy="${o}" r="${s}" fill="${t.color}" fill-opacity="0.3" />

        <!-- Temperature -->
        <text x="${i}" y="${o-5}" class="${jt}">
          ${Jt(t.temperature,e?.temperature_unit)}
        </text>

        <!-- Rate of change (if available and enabled) -->
        ${e?.show_rate_of_change&&void 0!==t.delta?B`
          <text x="${i}" y="${o+15}" class="${Lt}">
            ${Kt(t.delta)}
          </text>
        `:""}

        <!-- Label -->
        <text x="${i}" y="${o-s-10}" class="${zt}">Greenhouse</text>
      </g>
    `}};t([dt({attribute:!1})],ee.prototype,"hass",void 0),t([ht()],ee.prototype,"_config",void 0),t([ht()],ee.prototype,"_error",void 0),ee=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(pt)],ee),window.customCards=window.customCards||[],window.customCards.push({type:pt,name:"Berm Thermal Flow Card",description:"Visualize airflow from outside temperature through fans to rooms with thermal analysis"});export{ee as BermThermalFlowCard};
