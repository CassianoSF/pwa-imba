import"../../web_modules/imba/dist/imba.js";var n=Symbol(),a=Symbol(),s=Symbol(),x=Symbol(),R=Symbol(),o=Symbol();const X="ab0828b1-198e-4351-b779-901fa0e0371e",u="4ac8a682-9736-4e5d-932b-e9b31405049c";export default class b extends imba.tags.get("component","ImbaElement"){async mount(){return this.encoder=new TextEncoder(),this.decoder=new TextDecoder(),this.button="OFF",this.options={video:{width:{min:200},height:{min:300},facingMode:{exact:"user"}}},this.stream=await window.navigator.mediaDevices.getUserMedia(this.options),this.$video.srcObject=this.stream,this.$video.play()}async connect(){return this.device=await window.navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:[X]}),this.server=await this.device.gatt.connect(),this.service=await this.server.getPrimaryService(X),this.characteristic=await this.service.getCharacteristic(u),this.characteristic.startNotifications(),this.characteristic.addEventListener("characteristicvaluechanged",this.onButtonChange.bind(this))}onButtonChange(e){let d=this.decoder.decode(e.target.value);if(d=="ON"||d=="OFF")return this.button=d,this.render()}writeLed(e){return this.characteristic?this.characteristic.writeValue(this.encoder.encode(e)):void 0}render(){var e,d,t,Q,l,c=this._ns_||"",F,U,i,B;return t=this,t.open$(),(Q=l=1,t[n]===1)||(Q=l=0,t[n]=1),Q||(F=imba.createElement("section",t,`container ${c}`,null)),Q||(U=this.$video=imba.createElement("video",F,`item ${c} video ref--video`,null)),Q||(F=imba.createElement("section",t,`container ${c}`,null)),Q||(U=imba.createElement("button",F,`item ${c}`,"Connect")),Q||U.on$("gotpointercapture",{connect:!0},this),Q||(F=imba.createElement("section",t,`container ${c}`,null)),Q||(U=imba.createElement("button",F,`item ${c}`,"Red")),Q||U.on$("gotpointercapture",{writeLed:["red"]},this),Q||(U=imba.createElement("button",F,`item ${c}`,"Green")),Q||U.on$("gotpointercapture",{writeLed:["green"]},this),Q||(U=imba.createElement("button",F,`item ${c}`,"Blue")),Q||U.on$("gotpointercapture",{writeLed:["blue"]},this),(F=t[a])||(t[a]=F=imba.createElement("section",t,`container ${c}`,null)),e=null,this.button=="ON"&&((i=B=1,e=t[s])||(i=B=0,t[s]=e=imba.createElement("button",null,`f3tgaucd item ${c}`,"ON")),i||(e.up$=F),i||(e.disabled=!0)),t[x]=F.insert$(e,0,t[x]),d=null,this.button=="OFF"&&((i=B=1,d=t[R])||(i=B=0,t[R]=d=imba.createElement("button",null,`f3tgauce item ${c}`,"OFF")),i||(d.up$=F),i||(d.disabled=!0)),t[o]=F.insert$(d,0,t[o]),t.close$(l),t}}imba.tags.define("bluetooth-f3tgau",b,{ns:"f3tgauc"}),imba.inlineStyles(`.f3tgaucd:not(#_):not(#_) {color: hsla(0.00,0.00%,100.00%,100%);
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
