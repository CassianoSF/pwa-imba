import"../web_modules/imba/dist/imba.js";var r=Symbol(),F=Symbol(),b=Symbol(),m=Symbol(),d=Symbol(),u=Symbol(),Q=Symbol(),B=Symbol(),U=Symbol(),R=Symbol(),p=Symbol(),i,g,y;import{Router as h}from"./router/router.js";import H from"./views/Clock.js";import Z from"./views/Geo.js";import G from"./views/Bluetooth.js";new h().go("/clock");class X extends imba.tags.get("component","ImbaElement"){mount(){var o=this;return this.install_prompt=!1,this.render(),window.onbeforeinstallprompt=function(n){return console.log(n),n.preventDefault(),o.install_prompt=!0,o.render(),o.deferred_prompt=n}}async install(){if(this.deferred_prompt.prompt(),this.choiceResult=await this.deferred_prompt.userChoice,this.choiceResult.outcome==="accepted")return this.install_prompt=!1,this.render()}render(){var o,n,a,c,x,e,s,t,l;return o=this,o.open$(),(n=a=1,o[r]===1)||(n=a=0,o[r]=1),(c=o[F])||(o[F]=c=imba.createElement("div",o,"header yuxr2ec",null)),imba.ctx=o[m]||(o[m]={_:c}),x=window.location.pathname.slice(1),imba.ctx=null,x===o[d]&&n||(o[b]=c.insert$(o[d]=x,384,o[b])),n||(c=imba.createElement("div",o,"content yuxr2ec",null)),n||(e=imba.createElement("div",c,"container yuxr2ec",null)),n||(s=imba.createElement("button",e,"yuxr2ecd yuxr2ec","Instalar")),n||s.on$("gotpointercapture",{install:!0},this),(t=l=1,e=o[u])||(t=l=0,o[u]=e=imba.createComponent(H,c,"yuxr2ec",null)),t||(e.route__={exact:!0}),t||(e.route="/clock"),t||!e.setup||e.setup(l),e.end$(l),t||e.insertInto$(c),(t=l=1,e=o[Q])||(t=l=0,o[Q]=e=imba.createComponent(Z,c,"yuxr2ec",null)),t||(e.route__={exact:!0}),t||(e.route="/geo"),t||!e.setup||e.setup(l),e.end$(l),t||e.insertInto$(c),(t=l=1,e=o[B])||(t=l=0,o[B]=e=imba.createComponent(G,c,"yuxr2ec",null)),t||(e.route__={exact:!0}),t||(e.route="/bluetooth"),t||!e.setup||e.setup(l),e.end$(l),t||e.insertInto$(c),n||(c=imba.createElement("div",o,"nav yuxr2ec",null)),(t=l=1,e=o[U])||(t=l=0,o[U]=e=imba.createElement("i",c,"nav-item yuxr2ec",null)),t||(e.routeTo="/clock"),t||(s=imba.createElement("span",e,"fa fa-clock fa-2x yuxr2ec",null)),t||e.insert$("Clock"),t||!e.setup||e.setup(l),e.end$(l),(t=l=1,e=o[R])||(t=l=0,o[R]=e=imba.createElement("i",c,"nav-item yuxr2ec",null)),t||(e.routeTo="/geo"),t||(s=imba.createElement("span",e,"fa fa-map-marker-alt fa-2x yuxr2ec",null)),t||e.insert$("Geo"),t||!e.setup||e.setup(l),e.end$(l),(t=l=1,e=o[p])||(t=l=0,o[p]=e=imba.createElement("i",c,"nav-item yuxr2ec",null)),t||(e.routeTo="/bluetooth"),t||(s=imba.createElement("span",e,"fa fa-bluetooth fa-2x yuxr2ec",null)),t||e.insert$("Bluetooth"),t||!e.setup||e.setup(l),e.end$(l),o.close$(a),o}}imba.tags.define("app-yuxr2e",X,{ns:"yuxr2ec"}),imba.mount((i=imba.createComponent(X,null,null,null),g||!i.setup||i.setup(y),i.end$(y),i)),imba.inlineStyles(`.yuxr2ecd:not(#_):not(#_) {height: 8vh;
margin: auto;
width: 50vw;
font-size: 18px;
line-height: 28px;
--u_lh: 28px;}

.header.yuxr2ec:not(#_) {height: 10vh;
background-color: hsla(0.00,0.00%,0.00%,100%);
display: flex;
margin: auto;
align-items: center;
justify-content: center;
border-bottom: 1px solid #444;
color: hsla(0.00,0.00%,100.00%,100%);
font-family: var(--font-sans,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
text-transform: uppercase;
font-weight: bold;}

.content.yuxr2ec:not(#_) {background-color: hsla(0.00,0.00%,0.00%,100%);
color: hsla(0.00,0.00%,100.00%,100%);
height: 80vh;
padding: 10px;}

.nav.yuxr2ec:not(#_) {border-top: 1px solid #444;
height: 10vh;
background-color: hsla(0.00,0.00%,0.00%,100%);
color: hsla(0.00,0.00%,100.00%,100%);
display: flex;}

.nav-item.yuxr2ec:not(#_) {display: grid;
text-align: center;
margin: auto;
font-family: var(--font-sans,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
font-size: 10px;
line-height: 16px;
--u_lh: 16px;}

.container.yuxr2ec:not(#_) {display: flex;
border-radius: 4px;
text-align: center;}

body {margin: 0rem;}

`,"yuxr2e");
