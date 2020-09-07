import"../../web_modules/imba/dist/imba.js";var i=Symbol(),l=Symbol(),n=Symbol(),m=Symbol();import c from"../../web_modules/dayjs.js";export default class a extends imba.tags.get("component","ImbaElement"){mount(){return setInterval(this.render.bind(this),1e3)}render(){var e,t,o,s;return e=this,e.open$(),(t=o=1,e[i]===1)||(t=o=0,e[i]=1),(!t||o&2)&&e.flagSelf$("fqjbyw clock"),imba.ctx=e[n]||(e[n]={_:e}),s=c().format("hh:mm:ss"),imba.ctx=null,s===e[m]&&t||(e[l]=e.insert$(e[m]=s,384,e[l])),e.close$(o),e}}imba.tags.define("clock-fqjbyw",a,{}),imba.inlineStyles(`.clock.fqjbyw {display: flex;
height: 100%;
margin: auto;
align-items: center;
justify-content: center;
font-size: 90px;
font-family: var(--font-sans,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");}

`,"fqjbyw");
