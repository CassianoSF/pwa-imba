import"../../web_modules/imba/dist/imba.js";function G(Q,F){var U=Object.getOwnPropertyDescriptors(F);return Object.defineProperties(Q.prototype,U),Q}var l=typeof window!="undefined",i={};class y{}import{Location as R}from"./location.js";import"./history.js";import{Request as L}from"./request.js";import{Route as t}from"./route.js";import"./element.js";var E;export class Router{static get instance(){return E||(E=new this())}constructor(Q={}){this.routes={},this.options=Q,this.busy=[],this.root=Q.root||"",this.history=window.history,this.location=new R(Q.url||document.location.href,this),this.mode=Q.mode||"history",this.setup(),this.instance||(this.instance=this)}get origin(){return this.$origin||(this.$origin=document.location.origin)}option(Q,F){return F==null?this.options[Q]:(this.options[Q]=F,this)}get realpath(){let Q=document.location;return Q.href.slice(Q.origin.length)}get state(){return{}}pushState(Q,F,U){return this.history.pushState(Q,F||null,String(U))}replaceState(Q,F,U){return this.history.replaceState(Q,F||null,String(U))}refresh(Q={}){var F=this;if(this.refreshing)return;this.refreshing=!0;let U=this.location,B=R.parse(Q.location||this.realpath,this),x=Q.mode;if(!B.equals(U)){let s=new L(this,B,U);if(s.mode=x,this.emit("beforechange",s),s.aborted){var c=!s.forceAbort&&window.confirm("Are you sure you want to leave? You might have unsaved changes");c?s.aborted=!1:x=="pop"?this.pushState(this.state,null,String(U)):x=="replace"&&this.replaceState(this.state,null,String(U))}s.aborted||(this.location=s.location,x=="push"?this.pushState(Q.state||this.state,null,String(this.location)):x=="replace"&&this.replaceState(Q.state||this.state,null,String(this.location)),l&&(this.location.state=window.history.state),this.emit("change",s),imba.commit())}return this.onReady(function(){let s=document.location.hash;if(s!=F.$hash)return F.emit("hashchange",F.$hash=s)}),this.refreshing=!1,this}onpopstate(Q){return this.refresh({pop:!0,mode:"pop"}),this}onbeforeunload(Q){let F=new L(this,null,this.location);return this.emit("beforechange",F),F.aborted?!0:void 0}onhashchange(Q){return this.emit("hashchange",this.$hash=document.location.hash),imba.commit()}setup(){return l&&(this.onclick=this.onclick.bind(this),this.onhashchange=this.onhashchange.bind(this),this.$hash=document.location.hash,this.location=R.parse(this.realpath,this),this.history.replaceState(this.state,null,String(this.location)),window.onpopstate=this.onpopstate.bind(this),window.onbeforeunload=this.onbeforeunload.bind(this),window.addEventListener("hashchange",this.onhashchange),window.addEventListener("click",this.onclick,{capture:!0})),this}onclick(Q){if(Q.metaKey||Q.altKey)return;let F=null,U=null,B=Q.target;for(;B;)B.nodeName=="A"&&(F||(F=B)),B.$routeTo&&(U||(U=B)),B=B.parentNode;if(F&&U!=F&&(!U||U.contains(F))){let x=F.getAttribute("href");x&&!x.match(/\:\/\//)&&!F.getAttribute("target")&&!F.classList.contains("external")&&F.addEventListener("click",this.onclicklink.bind(this),{once:!0})}return!0}onclicklink(Q){let F=Q.currentTarget||Q.target,U=F.getAttribute("href"),B=new URL(F.href),x=B.href.slice(B.origin.length);return this.go(x),Q.stopPropagation(),Q.preventDefault()}get path(){return this.location.path}get url(){return this.location.url}query(Q,F){return Q==null?this.location.searchParams():this.location.query(Q,F)}get hash(){return this.$hash}serializeParams(Q){var F;if(Q instanceof Object){F=[];for(let B=0,x=Object.keys(Q),c=x.length,s,d;B<c;B++)s=x[B],d=Q[s],F.push([s,globalThis.encodeURI(d)].join("="));var U=F;return U.join("&")}return Q||""}set hash(Q){l&&this.history.replaceState({},null,"#"+this.serializeParams(Q))}match(Q){var F,U=(F=this.routes)[Q]||(F[Q]=new t(this,Q));return U.test()}route(Q){var F;return(F=this.routes)[Q]||(F[Q]=new t(this,Q))}routeFor(Q,F,U,B){return new t(this,F,U,B)}go(Q,F={}){let U=this.location.clone().update(Q,F);return this.refresh({push:!0,mode:"push",location:U,state:F}),this}replace(Q,F={}){let U=this.location.clone().update(Q,F);return this.refresh({replace:!0,mode:"replace",location:U,state:F})}normalize(Q){return this.mode=="hash"?Q="#"+Q:this.root()&&(Q=this.root()+Q),Q}onReady(Q){var F=this;return imba.scheduler.add(function(){return F.busy.length==0?Q(F):imba.once(F,"ready",Q)})}emit(Q,...F){return imba.emit(this,Q,F)}on(Q,...F){return imba.listen(this,Q,...F)}once(Q,...F){return imba.once(this,Q,...F)}un(Q,...F){return imba.unlisten(this,Q,...F)}tapRouteHandler(Q){let F=this.dom(),U=this.dom().getAttribute("href");F.nodeName!="A"&&(Q.meta()||Q.alt())&&(Q.stop().prevent(),window.open(U,"_blank"));let B=this.trigger("taproute",{path:U,sourceEvent:Q,router:this.router});B.isPrevented()||(Q.stop().prevent(),Q.meta()||Q.alt()?window.open(U,"_blank"):this.router.go(U,{}));return}}G(imba.tags.get("element","Element"),{get router(){return Router.instance}});
