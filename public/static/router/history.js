import"../../web_modules/imba/dist/imba.js";export class History{constructor(F){this.router=F,this.stack=[],this.pos=-1}pushState(F,Q,s){return this.stack.length=Math.max(this.pos,0),this.stack[++this.pos]=[F,Q,s],this}replaceState(F,Q,s){return this.stack.length=this.pos,this.stack[this.pos]=[F,Q,s]}popState(){return this.stack.length=this.pos+1,this.pos-=1,this.stack.pop()}currentState(){return this.stack[this.pos]}}
