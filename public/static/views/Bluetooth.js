import"../../web_modules/imba/dist/imba.js";var s=Symbol(),n=Symbol(),x=Symbol(),a=Symbol(),b=Symbol(),R=Symbol();const o="ab0828b1-198e-4351-b779-901fa0e0371e",u="4ac8a682-9736-4e5d-932b-e9b31405049c";export default class m extends imba.tags.get("component","ImbaElement"){async mount(){return this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.button="OFF",this.options={video:{width:{min:200},height:{min:300},facingMode:{exact:"environment"}}},this.stream=await window.navigator.mediaDevices.getUserMedia(this.options),this.$video.srcObject=this.stream,this.$video.play()}async connect(){return this.device=await window.navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:[o]}),this.server=await this.device.gatt.connect(),this.service=await this.server.getPrimaryService(o),this.characteristic=await this.service.getCharacteristic(u),this.characteristic.startNotifications(),this.characteristic.addEventListener("characteristicvaluechanged",this.onButtonChange.bind(this))}onButtonChange(e){let d=this.decoder.decode(e.target.value);if(d=="ON"||d=="OFF")return this.button=d,this.render()}writeLed(e){return this.characteristic?this.characteristic.writeValue(this.encoder.encode(e)):void 0}render(){var e,d,t,F,l,c=this._ns_||"",Q,U,i,B;return t=this,t.open$(),(F=l=1,t[s]===1)||(F=l=0,t[s]=1),F||(Q=imba.createElement("section",t,`container ${c}`,null)),F||(U=this.$video=imba.createElement("video",Q,`item ${c} video ref--video`,null)),F||(Q=imba.createElement("section",t,`container ${c}`,null)),F||(U=imba.createElement("button",Q,`item ${c}`,"Connect")),F||U.on$("gotpointercapture",{connect:!0},this),F||(Q=imba.createElement("section",t,`container ${c}`,null)),F||(U=imba.createElement("button",Q,`item ${c}`,"Red")),F||U.on$("gotpointercapture",{writeLed:["red"]},this),F||(U=imba.createElement("button",Q,`item ${c}`,"Green")),F||U.on$("gotpointercapture",{writeLed:["green"]},this),F||(U=imba.createElement("button",Q,`item ${c}`,"Blue")),F||U.on$("gotpointercapture",{writeLed:["blue"]},this),(Q=t[n])||(t[n]=Q=imba.createElement("section",t,`container ${c}`,null)),e=null,this.button=="ON"&&((i=B=1,e=t[x])||(i=B=0,t[x]=e=imba.createElement("button",null,`f3tgaucd item ${c}`,"ON")),i||(e.up$=Q),i||(e.disabled=!0)),t[a]=Q.insert$(e,0,t[a]),d=null,this.button=="OFF"&&((i=B=1,d=t[b])||(i=B=0,t[b]=d=imba.createElement("button",null,`f3tgauce item ${c}`,"OFF")),i||(d.up$=Q),i||(d.disabled=!0)),t[R]=Q.insert$(d,0,t[R]),t.close$(l),t}}imba.tags.define("bluetooth-f3tgau",m,{ns:"f3tgauc"}),imba.inlineStyles(`.f3tgaucd:not(#_):not(#_) {color: hsla(0.00,0.00%,100.00%,100%);
background: green;}

.f3tgauce:not(#_):not(#_) {color: hsla(0.00,0.00%,100.00%,100%);
background: red;}

button.f3tgauc:not(#_) {height: 8vh;}

video.f3tgauc:not(#_) {max-width: 100vw;
max-height: 300px;}

.container.f3tgauc:not(#_) {max-width: 100vw;
display: flex;
margin: 0rem auto;
flex-flow: row wrap;}

.item.f3tgauc:not(#_) {flex: 1;
margin: 5px;
text-align: center;
font-fs: 1.5em;}

`,"f3tgau");
