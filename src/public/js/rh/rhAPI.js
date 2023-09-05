(()=>{var h=Object.defineProperty;var d=(n,e,t)=>e in n?h(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var o=(n,e,t)=>(d(n,typeof e!="symbol"?e+"":e,t),t);var a=class{constructor(e,t,s){this.server=e,this.signal=t,this.password=s}async get(e){this.password&&(e.includes("?")?e+="&pwd="+this.password:e+="?pwd="+this.password);try{let t=await fetch(new URL(e,this.server),{signal:this.signal});if(t.status===200)return await t.text();throw new Error('unexpected server response to not match "200". Server says "'.concat(await t.text(),'"'))}catch(t){throw console.error(t),new Error("Cannot communicate with the server")}}async needPassword(){return await this.get("needpassword")==="true"}async newSession(){return await this.get("newsession")}async editSession(e,t,s){let i=await this.get("editsession?id="+encodeURIComponent(e)+(t?"&httpProxy="+encodeURIComponent(t):"")+"&enableShuffling="+(s?"1":"0"));if(i!=="Success")throw new Error("unexpected response from server. received ".concat(i))}async sessionExists(e){let t=await this.get("sessionexists?id="+encodeURIComponent(e));switch(t){case"exists":return!0;case"not found":return!1;default:throw new Error("unexpected response from server. received ".concat(t))}}async deleteSession(e){if(await this.sessionExists(e)){let t=await this.get("deletesession?id="+e);if(t!=="Success"&&t!=="not found")throw new Error("unexpected response from server. received ".concat(t))}}async shuffleDict(e){let t=await this.get("api/shuffleDict?id="+encodeURIComponent(e));return JSON.parse(t)}},c=class{constructor(e){o(this,"baseDictionary","0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~-");o(this,"shuffledIndicator","_rhs");e||(e=this.generateDictionary()),this.dictionary=e}mod(e,t){return(e%t+t)%t}generateDictionary(){let e="",t=this.baseDictionary.split("");for(;t.length>0;)e+=t.splice(Math.floor(Math.random()*t.length),1)[0];return e}shuffle(e){if(e.startsWith(this.shuffledIndicator))return e;let t="";for(let s=0;s<e.length;s++){let i=e.charAt(s),r=this.baseDictionary.indexOf(i);i==="%"&&e.length-s>=3?(t+=i,t+=e.charAt(++s),t+=e.charAt(++s)):r===-1?t+=i:t+=this.dictionary.charAt(this.mod(r+s,this.baseDictionary.length))}return this.shuffledIndicator+t}unshuffle(e){if(!e.startsWith(this.shuffledIndicator))return e;e=e.slice(this.shuffledIndicator.length);let t="";for(let s=0;s<e.length;s++){let i=e.charAt(s),r=this.dictionary.indexOf(i);i==="%"&&e.length-s>=3?(t+=i,t+=e.charAt(++s),t+=e.charAt(++s)):r===-1?t+=i:t+=this.baseDictionary.charAt(this.mod(r-s,this.baseDictionary.length))}return t}};})();
//# sourceMappingURL=rhAPI.js.map
