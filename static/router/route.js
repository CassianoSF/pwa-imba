import"../../web_modules/imba/dist/imba.js";function E(F){return F?F.toIterable?F.toIterable():F:[]}var V=typeof window!="undefined";export class Route{constructor(F,Q,B,s={}){this.parent=B,this.router=F,this.options=s,this.status=200,this.path=Q}set path(F){var Q=this;if(this.$path==F)return;if(this.raw=F,this.$path=F,this.groups=[],this.params={},this.cache={},F.indexOf("?")>=0){let D=F.split("?");F=D.shift(),this.query={};for(let d=0,c=E(D.join("?").split("&")),t=c.length;d<t;d++){let H=c[d];if(!H)continue;var[B,s]=H.split("=");B[0]=="!"&&(B=B.slice(1),s=!1),s===""&&(s=!1),this.query[B]=s||!(s===!1)}}if(F=F.replace(/\:(\w+|\*)(\.)?/g,function(D,d,c){return d!="*"&&Q.groups.push(d),c?"([^/#.?]+).":"([^/#?]+)"}),F==""&&this.query)return;F="^"+F;let X=F[F.length-1];this.options.exact&&X!="$"?F=F+"(?=[#?]|$)":X!="/"&&X!="$"&&F!="^/"&&(F=F+"(?=[/#?]|$)"),this.regex=new RegExp(F)}test(F,Q){var B,s;F||(F=this.router.location),Q||(Q=F.pathname);let X=F.path;if(X==this.cache.url)return this.cache.match;let D="",d=Q;this.cache.url=X,this.cache.match=null;let c;if(this.query){c={};for(let t=this.query,H=0,R=Object.keys(t),l=R.length,L,U;H<l;H++){L=R[H],U=t[L];let x=F.query(L),y=L;if(U===!1){if(x)return null;continue}if(U[0]==":"&&(y=U.slice(1),U=!0),U==!0&&x||U==x)c[y]=x;else return null}}if(this.parent&&this.raw[0]!="/"&&((B=this.parent.test(F,Q))&&(Q.indexOf(B.path)==0&&(D=B.path+"/",d=Q.slice(B.path.length+1)))),s=this.regex?d.match(this.regex):[""]){let t=D+s[0],H=this.params;if(t==this.params.path)this.params.url=X;else if(this.params={path:t,url:X},this.groups.length)for(let R=0,l=E(s),L=l.length,U;R<L;R++){let x=l[R];(U=this.groups[R-1])&&(this.params[U]=x)}if(c){let R=!1;for(let l=0,L=Object.keys(c),U=L.length,x,y;l<U;l++)x=L[l],y=c[x],this.params[x]!=y&&(R=!0,this.params[x]=y);R&&H==this.params&&(this.params=Object.assign({},this.params))}return this.cache.match=this.params}return this.cache.match=null}resolve(F){var Q;return this.raw[0]=="/"?this.raw:(F||(F=this.router.url),this.cache.resolveUrl==F&&this.cache.resolved?this.cache.resolved:(this.cache.resolveUrl=F,this.parent?(Q=this.parent.test())&&(this.raw[0]=="?"?this.cache.resolved=Q.path+this.raw:this.cache.resolved=Q.path+"/"+this.raw):this.cache.resolved=this.raw,this.cache.resolved))}}