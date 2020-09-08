const{Document,Node,Text,Comment,Element,SVGElement,HTMLElement,HTMLInputElement,HTMLSelectElement,HTMLButtonElement,HTMLOptionElement,HTMLTextAreaElement,DocumentFragment,ShadowRoot,Event,CustomEvent:CustomEvent$1,MouseEvent,KeyboardEvent,PointerEvent,document:document$1,getElementType}=window,VALID_CSS_UNITS={cm:1,mm:1,Q:1,pc:1,pt:1,px:1,em:1,ex:1,ch:1,rem:1,vw:1,vh:1,vmin:1,vmax:1,s:1,ms:1,fr:1,"%":1,in:1,turn:1,grad:1,rad:1,deg:1,Hz:1,kHz:1},CSS_STR_PROPS={prefix:1,suffix:1,content:1},CSS_PX_PROPS=/^([xyz])$/,CSS_DIM_PROPS=/^([tlbr]|size|[whtlbr]|[mps][tlbrxy]?|[rcxy]?[gs])$/;let resets=`*,::before,::after {
box-sizing: border-box;
border-width: 0;
border-style: solid;
border-color: currentColor;
}`;const map={};function register(e,t){if(!map.root&&t!="root"&&register(resets,"root"),t&&!map[t]){let i=map[t]={raw:e};i.node=document.createElement("style"),i.node.textContent=i.raw,document.head.appendChild(i.node)}return}function toValue(e,t,i){CSS_STR_PROPS[i]&&(e=String(e));let n=typeof e;if(n=="number"){if(t||(CSS_PX_PROPS.test(i)?t="px":CSS_DIM_PROPS.test(i)?t="u":i=="rotate"&&(t="turn")),t)return VALID_CSS_UNITS[t]?e+t:t=="u"?e*4+"px":"calc(var(--u_"+t+",1px) * "+e+")"}else n=="string"&&i&&(CSS_STR_PROPS[i]&&e[0]!='"'&&e[0]!="'"&&(e.indexOf('"')>=0?e.indexOf("'")==-1&&(e="'"+e+"'"):e='"'+e+'"'));return e}function toStyleSheet(){return Object.values(map).map(function(e){return e.raw}).join(`

`)}class Flags{constructor(e){this.dom=e,this.string=""}contains(e){return this.dom.classList.contains(e)}add(e){return this.contains(e)?this:(this.string+=(this.string?" ":"")+e,this.dom.classList.add(e),this)}remove(e){if(!this.contains(e))return this;var t=new RegExp("(^|\\s)*"+e+"(\\s|$)*","g");return this.string=this.string.replace(t,""),this.dom.classList.remove(e),this}toggle(e,t){return t===void 0&&(t=!this.contains(e)),t?this.add(e):this.remove(e)}incr(e){let t=this.stacks||(this.stacks={}),i=t[e]||0;return i<1&&this.add(e),t[e]=Math.max(i,0)+1,this}decr(e){let t=this.stacks||(this.stacks={}),i=t[e]||0;return i==1&&this.remove(e),t[e]=Math.max(i,1)-1,this}valueOf(){return this.string}toString(){return this.string}sync(){return this.dom.flagSync$()}}function iter$(e){return e?e.toIterable?e.toIterable():e:[]}var raf=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:function(e){return setTimeout(e,1e3/60)};class Scheduler{constructor(){var e=this;this.queue=[],this.stage=-1,this.batch=0,this.scheduled=!1,this.listeners={},this.$promise=null,this.$resolve=null,this.$ticker=function(t){return e.scheduled=!1,e.tick(t)}}add(e,t){if((t||this.queue.indexOf(e)==-1)&&this.queue.push(e),!this.scheduled)return this.schedule()}listen(e,t){var i;return(i=this.listeners)[e]||(i[e]=new Set()),this.listeners[e].add(t)}unlisten(e,t){return this.listeners[e]&&this.listeners[e].delete(t)}get promise(){var e=this;return this.$promise||(this.$promise=new Promise(function(t){return e.$resolve=t}))}tick(e){var t=this,i=this.queue;if(this.ts||(this.ts=e),this.dt=e-this.ts,this.ts=e,this.queue=[],this.stage=1,this.batch++,i.length)for(let n=0,s=iter$(i),r=s.length;n<r;n++){let l=s[n];typeof l=="string"&&this.listeners[l]?this.listeners[l].forEach(function(h){if(h.tick instanceof Function)return h.tick(t);if(h instanceof Function)return h(t)}):l instanceof Function?l(this.dt,this):l.tick&&l.tick(this.dt,this)}return this.stage=2,this.stage=this.scheduled?0:-1,this.$promise&&(this.$resolve(this),this.$promise=this.$resolve=null),this}schedule(){return this.scheduled||(this.scheduled=!0,this.stage==-1&&(this.stage=0),raf(this.$ticker)),this}}function iter$$1(e){return e?e.toIterable?e.toIterable():e:[]}const keyCodes={esc:[27],tab:[9],enter:[13],space:[32],up:[38],down:[40],left:[37],right:[39],del:[8,46]};Event.log$mod=function(...e){return console.log(...e),!0},Event.sel$mod=function(e){return!!this.event.target.matches(String(e))},Event.if$mod=function(e){return!!e},Event.wait$mod=function(e=250){return new Promise(function(t){return setTimeout(t,e)})},Event.self$mod=function(){return this.event.target==this.element},Event.throttle$mod=function(e=250){var t=this;return this.handler.throttled?!1:(this.handler.throttled=!0,this.element.flags.incr("throttled"),imba.once(this.current,"end",function(){return setTimeout(function(){return t.element.flags.decr("throttled"),t.handler.throttled=!1},e)}),!0)},Event.flag$mod=function(e,t){let i=t instanceof globalThis.Element?t:t?this.element.closest(t):this.element;if(!i)return!0;let n=this.step;this.state[n]=this.id,i.flags.incr(e);let s=Date.now();return imba.once(this.current,"end",function(){let r=Date.now()-s,l=Math.max(250-r,0);return setTimeout(function(){return i.flags.decr(e)},l)}),!0},Event.busy$mod=function(e){return Event.flag$mod.call(this,"busy",250,e)};class EventHandler{constructor(e,t){this.params=e,this.closure=t}getHandlerForMethod(e,t){return e?e[t]?e:this.getHandlerForMethod(e.parentNode,t):null}emit(e,...t){return imba.emit(this,e,t)}on(e,...t){return imba.listen(this,e,...t)}once(e,...t){return imba.once(this,e,...t)}un(e,...t){return imba.unlisten(this,e,...t)}async handleEvent(e){var t=e.target,i=e.currentTarget,n=this.params;let s=!0;this.count||(this.count=0),this.state||(this.state={});let r={element:i,event:e,modifiers:n,handler:this,id:++this.count,step:-1,state:this.state,current:null};if(r.current=r,e.handle$mod&&e.handle$mod.apply(r,n.options||[])==!1)return;let l=Event[this.type+"$handle"]||Event[e.type+"$handle"]||e.handle$mod;if(l&&l.apply(r,n.options||[])==!1)return;this.currentEvents||(this.currentEvents=new Set()),this.currentEvents.add(e);for(let h=0,a=Object.keys(n),u=a.length,o,c;h<u;h++){if(o=a[h],c=n[o],r.step++,o[0]=="_")continue;o.indexOf("~")>0&&(o=o.split("~")[0]);let f=null,$=[e,r],d,m=null,x;if(o[0]=="$"&&o[1]=="_"&&c[0]instanceof Function)o=c[0],$=[e,r].concat(c.slice(1)),m=i;else if(c instanceof Array){$=c.slice(),f=$;for(let p=0,y=iter$$1($),v=y.length;p<v;p++){let g=y[p];if(typeof g=="string"&&g[0]=="~"&&g[1]=="$"){let C=g.slice(2),_=C.split("."),b=r[_.shift()]||e;for(let w=0,E=iter$$1(_),S=E.length;w<S;w++){let F=E[w];b=b?b[F]:void 0}$[p]=b}}}if(typeof o=="string"&&(x=o.match(/^(emit|flag|moved|pin|fit|refit|map|remap)-(.+)$/))&&(f||(f=$=[]),$.unshift(x[2]),o=x[1]),o=="stop")e.stopImmediatePropagation();else if(o=="prevent")e.preventDefault();else if(o=="commit")s=!0;else if(o=="silence"||o=="silent")s=!1;else if(o=="ctrl"){if(!e.ctrlKey)break}else if(o=="alt"){if(!e.altKey)break}else if(o=="shift"){if(!e.shiftKey)break}else if(o=="meta"){if(!e.metaKey)break}else if(o=="once")i.removeEventListener(e.type,this);else{if(o=="options")continue;if(keyCodes[o]){if(keyCodes[o].indexOf(e.keyCode)<0)break}else if(o=="emit"){let p=$[0],y=$[1],v=new CustomEvent(p,{bubbles:!0,detail:y});v.originalEvent=e;let g=i.dispatchEvent(v)}else if(typeof o=="string"){let p=this.type&&Event[this.type+"$"+o+"$mod"];p||(p=e[o+"$mod"]||Event[e.type+"$"+o]||Event[o+"$mod"]),p instanceof Function?(o=p,m=r,$=f||[]):o[0]=="_"?(o=o.slice(1),m=this.closure):m=this.getHandlerForMethod(i,o)}}if(o instanceof Function?d=o.apply(m||i,$):m&&(d=m[o].apply(m,$)),d&&d.then instanceof Function&&d!=imba.scheduler.$promise&&(s&&imba.$commit(),d=await d),d===!1)break;r.value=d}imba.emit(r,"end",r),s&&imba.$commit(),this.currentEvents.delete(e),this.currentEvents.size==0&&this.emit("idle");return}}function round(e,t=1){let i=1/t;return Math.round(e*i)/i}function clamp(e,t,i){return t>i?Math.max(i,Math.min(t,e)):Math.min(i,Math.max(t,e))}function parseDimension(e){if(typeof e=="string"){let[t,i,n]=e.match(/^([-+]?[\d\.]+)(%|\w+)$/);return[parseFloat(i),n]}else if(typeof e=="number")return[e]}function scale(e,t,i,n,s=.1){let[r,l]=parseDimension(i),[h,a]=parseDimension(n),[u,o]=parseDimension(s);return l=="%"&&(r=(t-e)*(r/100)),a=="%"&&(h=(t-e)*(h/100)),o=="%"&&(u=(h-r)*(u/100)),function(c,f){let $=(c-e)/(t-e),d=r+(h-r)*$;return s&&(d=round(d,u)),f&&(d=clamp(d,r,h)),d}}function extend$(e,t){var i=Object.getOwnPropertyDescriptors(t);return Object.defineProperties(e.prototype,i),e}extend$(PointerEvent,{primary$mod(){return!!this.event.isPrimary},mouse$mod(){return this.event.pointerType=="mouse"},pen$mod(){return this.event.pointerType=="pen"},touch$mod(){return this.event.pointerType=="touch"},pressure$mod(e=0){return this.event.pressure>e},lock$mod(e){return!0}});class Touch{constructor(e,t,i){this.phase="init",this.events=[],this.event=e,this.handler=t,this.target=this.currentTarget=i}set event(e){this.x=e.clientX,this.y=e.clientY,this.events.push(e)}get start(){return this.events[0]}get event(){return this.events[this.events.length-1]}get elapsed(){return this.event.timeStamp-this.events[0].timeStamp}get pointerId(){return this.event.pointerId}get clientX(){return this.event.clientX}get clientY(){return this.event.clientY}get offsetX(){return this.event.offsetX}get offsetY(){return this.event.offsetY}get type(){return this.event.type}emit(e,...t){return imba.emit(this,e,t)}on(e,...t){return imba.listen(this,e,...t)}once(e,...t){return imba.once(this,e,...t)}un(e,...t){return imba.unlisten(this,e,...t)}}Event.touch$in$mod=function(){return Event.touch$reframe$mod.apply(this,arguments)},Event.touch$fit$mod=function(){var e,t;let i=(e=this.state)[t=this.step]||(e[t]={clamp:!0});return Event.touch$reframe$mod.apply(this,arguments)},Event.touch$snap$mod=function(e=1,t=e){return this.event.x=round(this.event.x,e),this.event.y=round(this.event.y,t),!0},Event.touch$moved$mod=function(e,t){var i=this,n,s;let r=(n=this.state)[s=this.step]||(n[s]={});if(!r.setup){let o=e||4;typeof e=="string"&&e.match(/^(up|down|left|right|x|y)$/)&&(r.dir=e,o=t||4),r.setup=!0;let[c,f]=parseDimension(o);r.threshold=c,r.sy=c,r.x0=this.event.x,r.y0=this.event.y,f&&f!="px"&&console.warn("only px threshold allowed in @touch.moved")}if(r.active)return!0;let l=r.threshold,h=this.event.x-r.x0,a=this.event.y-r.y0,u=!1;if(h>l&&(r.dir=="right"||r.dir=="x")&&(u=!0),!u&&h<-l&&(r.dir=="left"||r.dir=="x")&&(u=!0),!u&&a>l&&(r.dir=="down"||r.dir=="y")&&(u=!0),!u&&a<-l&&(r.dir=="up"||r.dir=="y")&&(u=!0),!u){let o=Math.sqrt(h*h+a*a);o>l&&!r.dir&&(u=!0)}if(u){r.active=!0;let o=this.state.pinTarget;this.element.flags.incr("_move_"),o&&o.flags.incr("_move_"),imba.once(this.current,"end",function(){return o&&o.flags.decr("_move_"),i.element.flags.decr("_move_")})}return!!r.active},Event.touch$reframe$mod=function(...e){var t,i;let n=(t=this.state)[i=this.step]||(t[i]={});if(n.rect){let s=this.event.x=n.x(this.event.x,n.clamp),r=this.event.y=n.y(this.event.y,n.clamp);this.event.dx=s-this.event.x0,this.event.dy=r-this.event.y0}else{let s=this.element,r=e.length,l=e[0],h=0,a="100%",u=1,o=typeof l;o=="number"||o=="string"&&/^([-+]?\d[\d\.]*)(%|\w+)$/.test(l)||l instanceof Array?l=null:o=="string"&&(l=="this"||l==""?l=this.element:l=="up"?l=this.element.parentNode:l=="op"?l=this.element.offsetParent:l=s.closest(l)||s.querySelector(l)),l==null&&(r++,e.unshift(l=s)),r==2?u=e[1]:r>2&&([h,a,u=1]=e.slice(1));let c=l.getBoundingClientRect();h instanceof Array||(h=[h,h]),a instanceof Array||(a=[a,a]),u instanceof Array||(u=[u,u]),n.rect=c,n.x=scale(c.left,c.right,h[0],a[0],u[0]),n.y=scale(c.top,c.bottom,h[1],a[1],u[1]),this.state.scaleX=n.x,this.state.scaleY=n.y,this.event.x0=this.event.x=n.x(this.event.x,n.clamp),this.event.y0=this.event.y=n.y(this.event.y,n.clamp)}return!0},Event.touch$pin$mod=function(...e){let t=this.state[this.step];if(!t){let i=e[0];typeof i=="string"&&(i=this.element.closest(i)||this.element.querySelector(i)),i instanceof Element||e.unshift(i=this.state.target);let n=e[1]||0,s=e[2]==null?e[2]=n:e[2],r=i.getBoundingClientRect();t=this.state[this.step]={x:this.state.clientX-(r.left+r.width*n),y:this.state.clientY-(r.top+r.height*s)},i&&(this.state.pinTarget=i,i.flags.incr("_touch_"),this.state.once("end",function(){return i.flags.decr("_touch_")}))}return this.event.x-=t.x,this.event.y-=t.y,!0},Event.touch$lock$mod=function(...e){let t=this.state[this.step];if(!t){t=this.state[this.step]=this.state.target.style;let i=t.touchAction;t.touchAction="none",this.state.once("end",function(){return t.removeProperty("touch-action")})}return!0},Event.touch$sync$mod=function(e,t="x",i="y"){let n=this.state[this.step];return n||(n=this.state[this.step]={x:e[t]||0,y:e[i]||0,tx:this.state.x,ty:this.state.y}),t&&(e[t]=n.x+(this.state.x-n.tx)),i&&(e[i]=n.y+(this.state.y-n.ty)),!0},Event.touch$handle=function(){var e=this;let t=this.event,i=this.element,n=this.state.pointerId;if(this.current=this.state,n!=null)return n==t.pointerId;let s=this.state=this.handler.state=this.current=new Touch(t,this.handler,i),r=function(a){return a.preventDefault(),!1},l=function(a){let u=a.type;s.event=a;try{e.handler.handleEvent(s)}catch(o){}if(u=="pointerup"||u=="pointercancel")return i.releasePointerCapture(a.pointerId)},h=function(a){return i.flags.decr("_touch_"),s.emit("end"),e.handler.state={},i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",l),i.removeEventListener("pointercancel",l),document.removeEventListener("selectstart",r)};return i.flags.incr("_touch_"),i.setPointerCapture(t.pointerId),i.addEventListener("pointermove",l),i.addEventListener("pointerup",l),i.addEventListener("pointercancel",l),i.addEventListener("lostpointercapture",h,{once:!0}),document.addEventListener("selectstart",r,{capture:!0}),l(t),!1};function iter$$2(e){return e?e.toIterable?e.toIterable():e:[]}function extend$$1(e,t){var i=Object.getOwnPropertyDescriptors(t);return Object.defineProperties(e.prototype,i),e}extend$$1(DocumentFragment,{get $parent(){return this.up$||this.$$parent},setup$(e,t){return this.$start=imba.document.createComment("start"),this.$end=imba.document.createComment("end"),this.$end.replaceWith$=function(i){return this.parentNode.insertBefore(i,this),i},this.appendChild(this.$start),this.appendChild(this.$end)},text$(e){this.$text?this.$text.textContent=e:this.$text=this.insert$(e);return},insert$(e,t,i){return this.$$parent?this.$$parent.insert$(e,t,i||this.$end):Element.prototype.insert$.call(this,e,t,i||this.$end)},insertInto$(e,t){return this.$$parent||(this.$$parent=e,e.appendChild$(this)),this},replaceWith$(e,t){this.$start.insertBeforeBegin$(e);for(var i=this.$start;i;){let n=i.nextSibling;if(this.appendChild(i),i==this.$end)break;i=n}return e},appendChild$(e){return this.$end?this.$end.insertBeforeBegin$(e):this.appendChild(e),e},removeChild$(e){return e.parentNode&&e.parentNode.removeChild(e),this},isEmpty$(){let e=this.$start,t=this.$end;for(;(e=e.nextSibling)&&!(e==t);)if(e instanceof Element||e instanceof Text)return!1;return!0}}),extend$$1(ShadowRoot,{get $parent(){return this.host}});class TagCollection{constructor(e,t){this.__F=e,this.$parent=t,!(e&128)&&this instanceof KeyedTagFragment&&(this.$start=document$1.createComment("start"),t&&t.appendChild$(this.$start)),e&256||(this.$end=document$1.createComment("end"),t&&t.appendChild$(this.$end)),this.setup()}appendChild$(e,t){this.$end&&this.$parent?this.$end.insertBeforeBegin$(e):this.$parent&&this.$parent.appendChild$(e);return}replaceWith$(e){this.detachNodes(),this.$end.insertBeforeBegin$(e),this.$parent.removeChild$(this.$end),this.$parent=null;return}joinBefore$(e){return this.insertInto$(e.parentNode,e)}insertInto$(e,t){return this.$parent||(this.$parent=e,t?t.insertBeforeBegin$(this.$end):e.appendChild$(this.$end),this.attachNodes()),this}replace$(e){return this.$parent||(this.$parent=e.parentNode),e.replaceWith$(this.$end),this.attachNodes(),this}setup(){return this}}class KeyedTagFragment extends TagCollection{setup(){return this.array=[],this.changes=new Map(),this.dirty=!1,this.$={}}push(e,t){if(!(this.__F&1)){this.array.push(e),this.appendChild$(e);return}let i=this.array[t];if(!(i===e)){this.dirty=!0;let n=this.array.indexOf(e),s=this.changes.get(e);n===-1?(this.array.splice(t,0,e),this.insertChild(e,t)):n===t+1?(i&&this.changes.set(i,-1),this.array.splice(t,1)):(n>=0&&this.array.splice(n,1),this.array.splice(t,0,e),this.insertChild(e,t)),s==-1&&this.changes.delete(e)}return}insertChild(e,t){if(t>0){let i=this.array[t-1];i.insertAfterEnd$(e)}else this.$start?this.$start.insertAfterEnd$(e):this.$parent.insertAfterBegin$(e);return}removeChild(e,t){e.parentNode==this.$parent&&this.$parent.removeChild(e);return}attachNodes(){for(let e=0,t=iter$$2(this.array),i=t.length;e<i;e++){let n=t[e];this.$end.insertBeforeBegin$(n)}return}detachNodes(){for(let e=0,t=iter$$2(this.array),i=t.length;e<i;e++){let n=t[e];this.$parent.removeChild(n)}return}end$(e){var t=this;if(!(this.__F&1)){this.__F|=1;return}if(this.dirty&&(this.changes.forEach(function(i,n){if(i==-1)return t.removeChild(n)}),this.changes.clear(),this.dirty=!1),this.array.length>e)for(;this.array.length>e;){let i=this.array.pop();this.removeChild(i)}return}}class IndexedTagFragment extends TagCollection{setup(){return this.$=[],this.length=0}end$(e){let t=this.length;if(t==e||!this.$parent)return;let i=this.$,n=this.$parent;if(t>e)for(;t>e;)n.removeChild$(i[--t]);else if(e>t)for(;e>t;)this.appendChild$(i[t++]);this.length=e;return}attachNodes(){for(let e=0,t=iter$$2(this.$),i=t.length;e<i;e++){let n=t[e];if(e==this.length)break;this.$end.insertBeforeBegin$(n)}return}detachNodes(){let e=0;for(;e<this.length;){let t=this.$[e++];this.$parent.removeChild$(t)}return}}function createLiveFragment(e,t,i){var n=document$1.createDocumentFragment();return n.setup$(e,t),i&&(n.up$=i),n}function createIndexedFragment(e,t){return new IndexedTagFragment(e,t)}function createKeyedFragment(e,t){return new KeyedTagFragment(e,t)}class ImbaElement extends HTMLElement{constructor(){super();this.flags$ns&&(this.flag$=this.flagExt$),this.setup$(),this.build()}setup$(){return this.__slots={},this.__F=0}init$(){return this.__F|=1|2,this}flag$(e){this.className=this.flags$ext=e;return}slot$(e,t){var i;return e=="__"&&!this.render?this:(i=this.__slots)[e]||(i[e]=imba.createLiveFragment(0,null,this))}build(){return this}awaken(){return this}mount(){return this}unmount(){return this}rendered(){return this}dehydrate(){return this}hydrate(){return this.autoschedule=!0,this}tick(){return this.commit()}visit(){return this.commit()}commit(){return this.isRender?(this.__F|=256,this.render&&this.render(),this.rendered(),this.__F=(this.__F|512)&~256):this}get autoschedule(){return(this.__F&64)!=0}set autoschedule(e){e?this.__F|=64:this.__F&=~64}get isRender(){return!0}get isMounting(){return(this.__F&16)!=0}get isMounted(){return(this.__F&32)!=0}get isAwakened(){return(this.__F&8)!=0}get isRendered(){return(this.__F&512)!=0}get isRendering(){return(this.__F&256)!=0}get isScheduled(){return(this.__F&128)!=0}get isHydrated(){return(this.__F&2)!=0}schedule(){return imba.scheduler.listen("render",this),this.__F|=128,this}unschedule(){return imba.scheduler.unlisten("render",this),this.__F&=~128,this}end$(){return this.visit()}connectedCallback(){let e=this.__F,t=e&1,i=e&8;if(e&(16|32))return;this.__F|=16,t||this.init$(),e&2||(this.flags$ext=this.className,this.hydrate(),this.__F|=2,this.commit()),i||(this.awaken(),this.__F|=8);let n=this.mount();return n&&n.then instanceof Function&&n.then(imba.commit),e=this.__F=(this.__F|32)&~16,e&64&&this.schedule(),this}disconnectedCallback(){return this.__F=this.__F&(~32&~16),this.__F&128&&this.unschedule(),this.unmount()}}const assets={};function register$1(e,t){return assets[e]=t,globalThis}function create(e,t,i){let n=assets[e];if(!n.node){let l=document$1.createElementNS("http://www.w3.org/2000/svg","svg");for(let h=n.attributes,a=0,u=Object.keys(h),o=u.length,c,f;a<o;a++)c=u[a],f=h[c],l.setAttribute(c,f);l.innerHTML=n.content,l.className.baseVal=n.flags.join(" "),n.node=l}let s=n.node.cloneNode(!0),r=s.flags$ns=s.className.baseVal+" ";return s.className.baseVal=r+i,t&&t instanceof Node&&s.insertInto$(t),s}function extend$$2(e,t){var i=Object.getOwnPropertyDescriptors(t);return Object.defineProperties(e.prototype,i),e}const descriptorCache={};function getDescriptor(e,t,i){if(!e)return i[t]=null;if(i[t]!==void 0)return i[t];let n=Object.getOwnPropertyDescriptor(e,t);return n!==void 0||e==SVGElement?i[t]=n||null:getDescriptor(Reflect.getPrototypeOf(e),t,i)}extend$$2(SVGElement,{set$(e,t){var i;let n=descriptorCache[i=this.nodeName]||(descriptorCache[i]={}),s=getDescriptor(this,e,n);!s||!s.set?this.setAttribute(e,t):this[e]=t;return}}),extend$$2(SVGElement,{flag$(e){let t=this.flags$ns;this.className.baseVal=t?t+(this.flags$ext=e):this.flags$ext=e;return},flagSelf$(e){var t=this;return this.flag$=function(i){return t.flagSync$(t.flags$ext=i)},this.flagSelf$=function(i){return t.flagSync$(t.flags$own=i)},this.flagSelf$(e)},flagSync$(){return this.className.baseVal=(this.flags$ns||"")+(this.flags$ext||"")+" "+(this.flags$own||"")+" "+(this.$flags||"")}});function iter$$3(e){return e?e.toIterable?e.toIterable():e:[]}function extend$$3(e,t){var i=Object.getOwnPropertyDescriptors(t);return Object.defineProperties(e.prototype,i),e}const toBind={INPUT:!0,SELECT:!0,TEXTAREA:!0,BUTTON:!0};var isGroup=function(e){return e instanceof Array||e&&e.has instanceof Function},bindHas=function(e,t){return e instanceof Array?e.indexOf(t)>=0:e&&e.has instanceof Function?e.has(t):e&&e.contains instanceof Function?e.contains(t):e==t},bindAdd=function(e,t){if(e instanceof Array)return e.push(t);if(e&&e.add instanceof Function)return e.add(t)},bindRemove=function(e,t){if(e instanceof Array){let i=e.indexOf(t);if(i>=0)return e.splice(i,1)}else if(e&&e.delete instanceof Function)return e.delete(t)};function createProxyProperty(e){function t(){return e[0]?e[0][e[1]]:void 0}function i(n){return e[0]?e[0][e[1]]=n:null}return{get:t,set:i}}extend$$3(Element,{getRichValue(){return this.value},setRichValue(e){return this.value=e},bind$(e,t){let i=t||[];return e=="data"&&!this.$$bound&&toBind[this.nodeName]&&(this.$$bound=!0,this.change$&&this.addEventListener("change",this.change$=this.change$.bind(this)),this.input$&&this.addEventListener("input",this.input$=this.input$.bind(this),{capture:!0}),this.click$&&this.addEventListener("click",this.click$=this.click$.bind(this),{capture:!0})),Object.defineProperty(this,e,i instanceof Array?createProxyProperty(i):i),i}}),Object.defineProperty(Element.prototype,"richValue",{get:function(){return this.getRichValue()},set:function(e){return this.setRichValue(e)}}),extend$$3(HTMLSelectElement,{change$(e){let t=this.data,i=this.$$value;this.$$value=void 0;let n=this.getRichValue();if(this.multiple){if(i)for(let s=0,r=iter$$3(i),l=r.length;s<l;s++){let h=r[s];if(n.indexOf(h)!=-1)continue;bindRemove(t,h)}for(let s=0,r=iter$$3(n),l=r.length;s<l;s++){let h=r[s];(!i||i.indexOf(h)==-1)&&bindAdd(t,h)}}else this.data=n[0];return imba.commit(),this},getRichValue(){var e;if(this.$$value)return this.$$value;e=[];for(let t=0,i=iter$$3(this.selectedOptions),n=i.length;t<n;t++){let s=i[t];e.push(s.richValue)}return this.$$value=e},syncValue(){let e=this.data;if(this.multiple){let t=[];for(let i=0,n=iter$$3(this.options),s=n.length;i<s;i++){let r=n[i],l=r.richValue,h=bindHas(e,l);r.selected=h,h&&t.push(l)}this.$$value=t}else for(let t=0,i=iter$$3(this.options),n=i.length;t<n;t++){let s=i[t],r=s.richValue;if(r==e){this.$$value=[r],this.selectedIndex=t;break}}return},end$(){return this.syncValue()}}),extend$$3(HTMLOptionElement,{setRichValue(e){return this.$$value=e,this.value=e},getRichValue(){return this.$$value!==void 0?this.$$value:this.value}}),extend$$3(HTMLTextAreaElement,{setRichValue(e){return this.$$value=e,this.value=e},getRichValue(){return this.$$value!==void 0?this.$$value:this.value},input$(e){return this.data=this.value,imba.commit()},end$(){if(this.$$bound&&this.value!=this.data)return this.value=this.data}}),extend$$3(HTMLInputElement,{input$(e){let t=this.type;return t=="checkbox"||t=="radio"?void 0:(this.$$value=void 0,this.data=this.richValue,imba.commit())},change$(e){let t=this.data,i=this.richValue;if(this.type=="checkbox"||this.type=="radio"){let n=this.checked;isGroup(t)?n?bindAdd(t,i):bindRemove(t,i):this.data=n?i:!1}return imba.commit()},setRichValue(e){this.$$value!==e&&(this.$$value=e,this.value!==e&&(this.value=e));return},getRichValue(){if(this.$$value!==void 0)return this.$$value;let e=this.value,t=this.type;return t=="range"||t=="number"?(e=this.valueAsNumber,Number.isNaN(e)&&(e=null)):t=="checkbox"&&((e==null||e==="on")&&(e=!0)),e},end$(){if(this.$$bound){let e=this.type;if(e=="checkbox"||e=="radio"){let t=this.data;t===!0||t===!1||t==null?this.checked=!!t:this.checked=bindHas(t,this.richValue)}else this.richValue=this.data}return}}),extend$$3(HTMLButtonElement,{get checked(){return this.$checked},set checked(e){e!=this.$checked&&(this.$checked=e,this.flags.toggle("checked",!!e))},setRichValue(e){return this.$$value=e,this.value=e},getRichValue(){return this.$$value!==void 0?this.$$value:this.value},click$(e){let t=this.data,i=this.checked,n=this.richValue;return isGroup(t)?i?bindRemove(t,n):bindAdd(t,n):this.data=i?null:n,imba.commit()},end$(){if(this.$$bound){let e=this.data;e===!0||e===!1||e==null?this.checked=!!e:this.checked=bindHas(e,this.richValue)}return}});function extend$$4(e,t){var i=Object.getOwnPropertyDescriptors(t);return Object.defineProperties(e.prototype,i),e}var root=typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:null,imba$1={version:"2.0.0",global:root,ctx:null,document:root.document};root.imba=imba$1,root.customElements||(root.customElements={define:function(){return!0},get:function(){return!0}}),imba$1.setTimeout=function(e,t){return setTimeout(function(){return e(),imba$1.$commit()},t)},imba$1.setInterval=function(e,t){return setInterval(function(){return e(),imba$1.$commit()},t)},imba$1.clearInterval=root.clearInterval,imba$1.clearTimeout=root.clearTimeout,Object.defineProperty(imba$1,"flags",{get:function(){return imba$1.document.documentElement.classList}}),imba$1.document=document$1,imba$1.q$=function(e,t){return(t instanceof Element?t:document$1).querySelector(e)},imba$1.q$$=function(e,t){return(t instanceof Element?t:document$1).querySelectorAll(e)},imba$1.toStyleValue=function(e,t,i){return toValue(e,t,i)},imba$1.inlineStyles=function(e,t){register(e,t);return},imba$1.getAllStyles=function(){return toStyleSheet()};var dashRegex=/-./g;imba$1.toCamelCase=function(e){return e.indexOf("-")>=0?e.replace(dashRegex,function(t){return t.charAt(1).toUpperCase()}):e};var emit__=function(e,t,i){let n,s,r;for(;(n=i)&&(i=i.next);)(s=i.listener)&&(i.path&&s[i.path]?r=t?s[i.path].apply(s,t):s[i.path]():r=t?s.apply(i,t):s.call(i)),i.times&&--i.times<=0&&(n.next=i.next,i.listener=null);return};imba$1.listen=function(e,t,i,n){let s,r,l;return s=e.__listeners__||(e.__listeners__={}),r=s[t]||(s[t]={}),l=r.tail||(r.tail=r.next={}),l.listener=i,l.path=n,r.tail=l.next={},l},imba$1.once=function(e,t,i){let n=imba$1.listen(e,t,i);return n.times=1,n},imba$1.unlisten=function(e,t,i,n){let s,r,l=e.__listeners__;if(!l)return;if(s=l[t]){for(;(r=s)&&(s=s.next);)if(s==i||s.listener==i){r.next=s.next,s.listener=null;break}}return},imba$1.emit=function(e,t,i){var n;(n=e.__listeners__)&&(n[t]&&emit__(t,i,n[t]),n.all&&emit__(t,[t,i],n.all));return},imba$1.scheduler=new Scheduler(),imba$1.$commit=function(){return imba$1.scheduler.add("render")},imba$1.commit=function(){return imba$1.scheduler.add("render"),imba$1.scheduler.promise},imba$1.tick=function(){return imba$1.commit(),imba$1.scheduler.promise},imba$1.mount=function(e,t){let i=t||document$1.body,n=e;if(e instanceof Function){let s={_:i},r=function(){return imba$1.ctx=s,e(s)};n=r(),imba$1.scheduler.listen("render",r)}else n.__F|=64;return i.appendChild(n)};var proxyHandler={get(e,t){let i=e,n;for(;i&&n==null;)(i=i.$parent)&&(n=i[t]);return n}};extend$$4(Node,{get $context(){return this.$context_||(this.$context_=new Proxy(this,proxyHandler))},get $parent(){return this.up$||this.parentNode},init$(){return this},replaceWith$(e){return!(e instanceof Node)&&e.replace$?e.replace$(this):this.parentNode.replaceChild(e,this),e},insertInto$(e){return e.appendChild$(this),this},insertBefore$(e,t){return this.insertBefore(e,t)},insertBeforeBegin$(e){return this.parentNode.insertBefore(e,this)},insertAfterEnd$(e){return this.nextSibling?this.nextSibling.insertBeforeBegin$(e):this.parentNode.appendChild(e)},insertAfterBegin$(e){return this.childNodes[0]?this.childNodes[0].insertBeforeBegin$(e):this.appendChild(e)}}),extend$$4(Comment,{replaceWith$(e){return e&&e.joinBefore$?e.joinBefore$(this):this.parentNode.insertBefore$(e,this),this.parentNode.removeChild(this),e}}),extend$$4(Element,{log(...e){return console.log(...e),this},emit(e,t,i={bubbles:!0}){t!=null&&(i.detail=t);let n=new CustomEvent(e,i),s=this.dispatchEvent(n);return n},slot$(e,t){return this},on$(e,t,i){let n="on$"+e,s;this[n]instanceof Function&&(s=this[n](t,i)),s=new EventHandler(t,i);let r=t.capture,l=t.passive,h=r;return l&&(h={passive:l,capture:r}),/^(pointerdrag|touch)$/.test(e)&&(s.type=e,e="pointerdown"),this.addEventListener(e,s,h),s},text$(e){return this.textContent=e,this},insert$(e,t,i){let n=typeof e;if(n==="undefined"||e===null){if(i&&i instanceof Comment)return i;let s=document$1.createComment("");return i?i.replaceWith$(s):s.insertInto$(this),s}if(e===i)return e;if(n!=="object"){let s,r=e;if(t&128&&t&256){this.textContent=r;return}return i?i instanceof Text?(i.textContent=r,i):(s=document$1.createTextNode(r),i.replaceWith$(s,this),s):(this.appendChild$(s=document$1.createTextNode(r)),s)}else return i?i.replaceWith$(e,this):e.insertInto$(this),e},get flags(){return this.$flags||(this.$flags=new Flags(this),this.flag$==Element.prototype.flag$&&(this.flags$ext=this.className),this.flagDeopt$()),this.$flags},flag$(e){let t=this.flags$ns;this.className=t?t+(this.flags$ext=e):this.flags$ext=e;return},flagDeopt$(){var e=this;this.flag$=this.flagExt$,this.flagSelf$=function(t){return e.flagSync$(e.flags$own=t)};return},flagExt$(e){return this.flagSync$(this.flags$ext=e)},flagSelf$(e){return this.flagDeopt$(),this.flagSelf$(e)},flagSync$(){return this.className=(this.flags$ns||"")+(this.flags$ext||"")+" "+(this.flags$own||"")+" "+(this.$flags||"")},open$(){return this},close$(){return this},end$(){this.render&&this.render();return},css$(e,t,i){return this.style[e]=t},css$var(e,t,i,n){let s=imba$1.toStyleValue(t,i,n);this.style.setProperty(e,s);return}}),Element.prototype.appendChild$=Element.prototype.appendChild,Element.prototype.removeChild$=Element.prototype.removeChild,Element.prototype.insertBefore$=Element.prototype.insertBefore,Element.prototype.replaceChild$=Element.prototype.replaceChild,Element.prototype.set$=Element.prototype.setAttribute,Element.prototype.setns$=Element.prototype.setAttributeNS,ShadowRoot.prototype.insert$=Element.prototype.insert$,ShadowRoot.prototype.appendChild$=Element.prototype.appendChild$,imba$1.createLiveFragment=createLiveFragment,imba$1.createIndexedFragment=createIndexedFragment,imba$1.createKeyedFragment=createKeyedFragment;const CustomTagConstructors={};class ImbaElementRegistry{constructor(){this.types={}}lookup(e){return this.types[e]}get(e,t){return!e||e=="component"?ImbaElement:this.types[e]?this.types[e]:t&&root[t]?root[t]:root.customElements.get(e)||ImbaElement}create(e){return this.types[e]?this.types[e].create$():document$1.createElement(e)}define(e,t,i={}){this.types[e]=t,t.nodeName=e;let n=t.prototype,s=n._ns_;if(i.ns){let r=i.ns,l=r+" "+r+"_ ";s&&(l+=n.flags$ns,r+=" "+s),n._ns_=r,n.flags$ns=l}return i.extends?CustomTagConstructors[e]=t:root.customElements.define(e,t),t}}imba$1.tags=new ImbaElementRegistry(),imba$1.registerAsset=register$1,imba$1.createAssetElement=create,imba$1.createElement=function(e,t,i,n,s){var r=document$1.createElement(e);return i&&(r.className=i),n!==null&&r.text$(n),t&&t instanceof Node&&r.insertInto$(t),r},imba$1.createComponent=function(e,t,i,n,s){var r;return typeof e!="string"&&(e&&e.nodeName&&(e=e.nodeName)),CustomTagConstructors[e]?(r=CustomTagConstructors[e].create$(r),r.slot$=ImbaElement.prototype.slot$,r.__slots={}):r=document$1.createElement(e),r.up$=t,r.init$(),n!==null&&r.slot$("__").text$(n),(i||r.flags$ns)&&r.flag$(i||""),r},imba$1.createSVGElement=function(e,t,i,n,s){var r=document$1.createElementNS("http://www.w3.org/2000/svg",e);return i&&(r.className.baseVal=i),t&&t instanceof Node&&r.insertInto$(t),r};function iter$$4(e){return e?e.toIterable?e.toIterable():e:[]}const observers=new(globalThis.WeakMap||Map)(),defaults={threshold:[0]},rootTarget={};Event.intersect$handle=function(){let e=this.event.detail.observer;return this.modifiers._observer==e},Event.intersect$in=function(){return this.event.delta>=0&&this.event.entry.isIntersecting},Event.intersect$out=function(){return this.event.delta<0};function callback(e,t){return function(i,n){let s=n.prevRatios||(n.prevRatios=new WeakMap());for(let r=0,l=iter$$4(i),h=l.length;r<h;r++){let a=l[r],u=s.get(a.target)||0,o=a.intersectionRatio,c={entry:a,ratio:o,from:u,delta:o-u,observer:n},f=new CustomEvent$1(e,{bubbles:!1,detail:c});f.entry=a,f.isIntersecting=a.isIntersecting,f.delta=c.delta,f.ratio=c.ratio,s.set(a.target,o),a.target.dispatchEvent(f)}return}}function getIntersectionObserver(e=defaults){let t=e.threshold.join("-")+e.rootMargin,i=e.root||rootTarget,n=observers.get(i);return n||observers.set(i,n={}),n[t]||(n[t]=new IntersectionObserver(callback("intersect"),e))}Element.prototype.on$intersect=function(e,t){let i;if(e.options){let n=[],s={threshold:n};for(let r=0,l=iter$$4(e.options),h=l.length;r<h;r++){let a=l[r];a instanceof Element?s.root=a:typeof a=="number"&&n.push(a)}if(n.length==1){let r=n[0];if(r>1)for(n[0]=0;n.length<r;)n.push(n.length/(r-1))}n.length==0&&n.push(0),i=getIntersectionObserver(s)}else i=getIntersectionObserver();return e._observer=i,i.observe(this)};var selHandler;function activateSelectionHandler(){if(!selHandler)return selHandler=function(e){if(e.handled$)return;e.handled$=!0;let t=document.activeElement;if(t&&t.matches("input,textarea")){let i=new CustomEvent$1("selection",{detail:{start:t.selectionStart,end:t.selectionEnd}});return t.dispatchEvent(i)}},document.addEventListener("selectionchange",selHandler)}Element.prototype.on$selection=function(e,t){return activateSelectionHandler()};function extend$$5(e,t){var i=Object.getOwnPropertyDescriptors(t);return Object.defineProperties(e.prototype,i),e}function iter$$5(e){return e?e.toIterable?e.toIterable():e:[]}var resizeObserver=null;function getResizeObserver(){return globalThis.ResizeObserver||(resizeObserver||(console.warn(":resize not supported in this browser"),resizeObserver={observe:function(){return!0}})),resizeObserver||(resizeObserver=new ResizeObserver(function(e){for(let t=0,i=iter$$5(e),n=i.length;t<n;t++){let s=i[t],r=new CustomEvent$1("resize",{bubbles:!1,detail:s});r.entry=s,r.rect=s.contentRect,r.width=s.target.offsetWidth,r.height=s.target.offsetHeight,s.target.dispatchEvent(r)}return}))}extend$$5(Element,{on$resize(e,t){return getResizeObserver().observe(this)}});