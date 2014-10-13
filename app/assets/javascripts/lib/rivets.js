// Rivets.js
// version: 0.6.9
// author: Michael Richards
// license: MIT
(function(){var t,e,i,n,s=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},r=function(t,e){return function(){return t.apply(e,arguments)}},o=[].slice,h={}.hasOwnProperty,u=function(t,e){function i(){this.constructor=t}for(var n in e)h.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};t={binders:{},components:{},formatters:{},adapters:{},config:{prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(t,e,i){return this.call(t,e,i.view.models)}}},"jQuery"in window?(n="on"in jQuery.prototype?["on","off"]:["bind","unbind"],e=n[0],i=n[1],t.Util={bindEvent:function(t,i,n){return jQuery(t)[e](i,n)},unbindEvent:function(t,e,n){return jQuery(t)[i](e,n)},getInputValue:function(t){var e;return e=jQuery(t),"checkbox"===e.attr("type")?e.is(":checked"):e.val()}}):t.Util={bindEvent:function(){return"addEventListener"in window?function(t,e,i){return t.addEventListener(e,i,!1)}:function(t,e,i){return t.attachEvent("on"+e,i)}}(),unbindEvent:function(){return"removeEventListener"in window?function(t,e,i){return t.removeEventListener(e,i,!1)}:function(t,e,i){return t.detachEvent("on"+e,i)}}(),getInputValue:function(t){var e,i,n,s;if("checkbox"===t.type)return t.checked;if("select-multiple"===t.type){for(s=[],i=0,n=t.length;n>i;i++)e=t[i],e.selected&&s.push(e.value);return s}return t.value}},t.KeypathParser=function(){function t(){}return t.parse=function(t,e,i){var n,r,o,h,u,l;for(h=[],r={"interface":i,path:""},o=u=0,l=t.length;l>u;o=u+=1)n=t.charAt(o),s.call(e,n)>=0?(h.push(r),r={"interface":n,path:""}):r.path+=n;return h.push(r),h},t}(),t.TextTemplateParser=function(){function t(){}return t.types={text:0,binding:1},t.parse=function(t,e){var i,n,s,r,o,h,u;for(h=[],r=t.length,i=0,n=0;r>n;){if(i=t.indexOf(e[0],n),0>i){h.push({type:this.types.text,value:t.slice(n)});break}if(i>0&&i>n&&h.push({type:this.types.text,value:t.slice(n,i)}),n=i+e[0].length,i=t.indexOf(e[1],n),0>i){o=t.slice(n-e[1].length),s=h[h.length-1],(null!=s?s.type:void 0)===this.types.text?s.value+=o:h.push({type:this.types.text,value:o});break}u=t.slice(n,i).trim(),h.push({type:this.types.binding,value:u}),n=i+e[1].length}return h},t}(),t.Observer=function(){function e(t,e,i,n){this.view=t,this.model=e,this.keypath=i,this.callback=n,this.unobserve=r(this.unobserve,this),this.realize=r(this.realize,this),this.value=r(this.value,this),this.publish=r(this.publish,this),this.read=r(this.read,this),this.set=r(this.set,this),this.adapter=r(this.adapter,this),this.update=r(this.update,this),this.initialize=r(this.initialize,this),this.parse=r(this.parse,this),this.parse(),this.initialize()}return e.prototype.parse=function(){var e,i,n,r,o,h;return e=function(){var t,e;t=this.view.adapters,e=[];for(i in t)o=t[i],o&&e.push(i);return e}.call(this),h=this.keypath[0],s.call(e,h)>=0?(r=this.keypath[0],n=this.keypath.substr(1)):(r=this.view.config.rootInterface,n=this.keypath),this.tokens=t.KeypathParser.parse(n,e,r),this.key=this.tokens.pop()},e.prototype.initialize=function(){return this.objectPath=[],this.target=this.realize(),null!=this.target?this.set(!0,this.key,this.target,this.callback):void 0},e.prototype.update=function(){var t,e;return(t=this.realize())!==this.target&&(null!=this.target&&this.set(!1,this.key,this.target,this.callback),null!=t&&this.set(!0,this.key,t,this.callback),e=this.value(),this.target=t,this.value()!==e)?this.callback():void 0},e.prototype.adapter=function(t){return this.view.adapters[t["interface"]]},e.prototype.set=function(t,e,i,n){var s;return s=t?"subscribe":"unsubscribe",this.adapter(e)[s](i,e.path,n)},e.prototype.read=function(t,e){return this.adapter(t).read(e,t.path)},e.prototype.publish=function(t){return null!=this.target?this.adapter(this.key).publish(this.target,this.key.path,t):void 0},e.prototype.value=function(){return null!=this.target?this.read(this.key,this.target):void 0},e.prototype.realize=function(){var t,e,i,n,s,r,o,h;for(t=this.model,s=null,h=this.tokens,e=r=0,o=h.length;o>r;e=++r)n=h[e],null!=t?(null!=this.objectPath[e]?t!==(i=this.objectPath[e])&&(this.set(!1,n,i,this.update),this.set(!0,n,t,this.update),this.objectPath[e]=t):(this.set(!0,n,t,this.update),this.objectPath[e]=t),t=this.read(n,t)):(null==s&&(s=e),(i=this.objectPath[e])&&this.set(!1,n,i,this.update));return null!=s&&this.objectPath.splice(s),t},e.prototype.unobserve=function(){var t,e,i,n,s,r;for(r=this.tokens,t=n=0,s=r.length;s>n;t=++n)i=r[t],(e=this.objectPath[t])&&this.set(!1,i,e,this.update);return null!=this.target?this.set(!1,this.key,this.target,this.callback):void 0},e}(),t.View=function(){function e(e,i,n){var s,o,h,u,l,a,d,p,c;for(this.els=e,this.models=i,this.options=null!=n?n:{},this.update=r(this.update,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.select=r(this.select,this),this.build=r(this.build,this),this.componentRegExp=r(this.componentRegExp,this),this.bindingRegExp=r(this.bindingRegExp,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),d=["config","binders","formatters","adapters"],l=0,a=d.length;a>l;l++){if(o=d[l],this[o]={},this.options[o]){p=this.options[o];for(s in p)h=p[s],this[o][s]=h}c=t[o];for(s in c)h=c[s],null==(u=this[o])[s]&&(u[s]=h)}this.build()}return e.prototype.bindingRegExp=function(){return new RegExp("^"+this.config.prefix+"-")},e.prototype.componentRegExp=function(){return new RegExp("^"+this.config.prefix.toUpperCase()+"-")},e.prototype.build=function(){var e,i,n,r,o,h,u,l,a;for(this.bindings=[],h=[],e=this.bindingRegExp(),n=this.componentRegExp(),i=function(e){return function(i,n,s,r){var o,h,u,l,a,d,p;return a={},p=function(){var t,e,i,n;for(i=r.split("|"),n=[],t=0,e=i.length;e>t;t++)d=i[t],n.push(d.trim());return n}(),o=function(){var t,e,i,n;for(i=p.shift().split("<"),n=[],t=0,e=i.length;e>t;t++)h=i[t],n.push(h.trim());return n}(),l=o.shift(),a.formatters=p,(u=o.shift())&&(a.dependencies=u.split(/\s+/)),e.bindings.push(new t[i](e,n,s,l,a))}}(this),o=function(r){return function(u){var l,a,d,p,c,f,b,v,g,y,m,w,k,x,E,N,j,O,R,B,P,V,C,U,A,T,S,_,z,Q;if(s.call(h,u)<0){if(3===u.nodeType){if(v=t.TextTemplateParser,(c=r.config.templateDelimiters)&&(w=v.parse(u.data,c)).length&&(1!==w.length||w[0].type!==v.types.text)){for(E=0,R=w.length;R>E;E++)m=w[E],y=document.createTextNode(m.value),u.parentNode.insertBefore(y,u),1===m.type&&i("TextBinding",y,null,m.value);u.parentNode.removeChild(u)}}else if(n.test(u.tagName))k=u.tagName.replace(n,"").toLowerCase(),r.bindings.push(new t.ComponentBinding(r,u,k));else if(null!=u.attributes){for(A=u.attributes,N=0,B=A.length;B>N;N++)if(l=A[N],e.test(l.name)){if(k=l.name.replace(e,""),!(d=r.binders[k])){T=r.binders;for(f in T)x=T[f],"*"!==f&&-1!==f.indexOf("*")&&(g=new RegExp("^"+f.replace("*",".+")+"$"),g.test(k)&&(d=x))}if(d||(d=r.binders["*"]),d.block){for(S=u.childNodes,j=0,P=S.length;P>j;j++)b=S[j],h.push(b);a=[l]}}for(_=a||u.attributes,O=0,V=_.length;V>O;O++)l=_[O],e.test(l.name)&&(k=l.name.replace(e,""),i("Binding",u,k,l.value))}for(z=function(){var t,e,i,n;for(i=u.childNodes,n=[],e=0,t=i.length;t>e;e++)b=i[e],n.push(b);return n}(),Q=[],U=0,C=z.length;C>U;U++)p=z[U],Q.push(o(p));return Q}}}(this),a=this.els,u=0,l=a.length;l>u;u++)r=a[u],o(r)},e.prototype.select=function(t){var e,i,n,s,r;for(s=this.bindings,r=[],i=0,n=s.length;n>i;i++)e=s[i],t(e)&&r.push(e);return r},e.prototype.bind=function(){var t,e,i,n,s;for(n=this.bindings,s=[],e=0,i=n.length;i>e;e++)t=n[e],s.push(t.bind());return s},e.prototype.unbind=function(){var t,e,i,n,s;for(n=this.bindings,s=[],e=0,i=n.length;i>e;e++)t=n[e],s.push(t.unbind());return s},e.prototype.sync=function(){var t,e,i,n,s;for(n=this.bindings,s=[],e=0,i=n.length;i>e;e++)t=n[e],s.push(t.sync());return s},e.prototype.publish=function(){var t,e,i,n,s;for(n=this.select(function(t){return t.binder.publishes}),s=[],e=0,i=n.length;i>e;e++)t=n[e],s.push(t.publish());return s},e.prototype.update=function(t){var e,i,n,s,r,o,h;null==t&&(t={});for(i in t)n=t[i],this.models[i]=n;for(o=this.bindings,h=[],s=0,r=o.length;r>s;s++)e=o[s],h.push(e.update(t));return h},e}(),t.Binding=function(){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.update=r(this.update,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.set=r(this.set,this),this.eventHandler=r(this.eventHandler,this),this.formattedValue=r(this.formattedValue,this),this.setBinder=r(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.model=void 0,this.setBinder()}return e.prototype.setBinder=function(){var t,e,i,n;if(!(this.binder=this.view.binders[this.type])){n=this.view.binders;for(t in n)i=n[t],"*"!==t&&-1!==t.indexOf("*")&&(e=new RegExp("^"+t.replace("*",".+")+"$"),e.test(this.type)&&(this.binder=i,this.args=new RegExp("^"+t.replace("*","(.+)")+"$").exec(this.type),this.args.shift()))}return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},e.prototype.formattedValue=function(t){var e,i,n,s,r,h;for(h=this.formatters,s=0,r=h.length;r>s;s++)i=h[s],e=i.split(/\s+/),n=e.shift(),i=this.view.formatters[n],(null!=i?i.read:void 0)instanceof Function?t=i.read.apply(i,[t].concat(o.call(e))):i instanceof Function&&(t=i.apply(null,[t].concat(o.call(e))));return t},e.prototype.eventHandler=function(t){var e,i;return i=(e=this).view.config.handler,function(n){return i.call(t,this,n,e)}},e.prototype.set=function(t){var e;return t=this.formattedValue(t instanceof Function&&!this.binder["function"]?t.call(this.model):t),null!=(e=this.binder.routine)?e.call(this,this.el,t):void 0},e.prototype.sync=function(){var e,i,n,s,r,o,h,u,l;if(this.model!==this.observer.target){for(h=this.dependencies,n=0,r=h.length;r>n;n++)i=h[n],i.unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(u=this.options.dependencies)?u.length:void 0))for(l=this.options.dependencies,s=0,o=l.length;o>s;s++)e=l[s],i=new t.Observer(this.view,this.model,e,this.sync),this.dependencies.push(i)}return this.set(this.observer.value())},e.prototype.publish=function(){var e,i,n,s,r,h,u,l,a;for(s=t.Util.getInputValue(this.el),u=this.formatters.slice(0).reverse(),r=0,h=u.length;h>r;r++)i=u[r],e=i.split(/\s+/),n=e.shift(),(null!=(l=this.view.formatters[n])?l.publish:void 0)&&(s=(a=this.view.formatters[n]).publish.apply(a,[s].concat(o.call(e))));return this.observer.publish(s)},e.prototype.bind=function(){var e,i,n,s,r,o,h;if(null!=(r=this.binder.bind)&&r.call(this,this.el),this.observer=new t.Observer(this.view,this.view.models,this.keypath,this.sync),this.model=this.observer.target,null!=this.model&&(null!=(o=this.options.dependencies)?o.length:void 0))for(h=this.options.dependencies,n=0,s=h.length;s>n;n++)e=h[n],i=new t.Observer(this.view,this.model,e,this.sync),this.dependencies.push(i);return this.view.config.preloadData?this.sync():void 0},e.prototype.unbind=function(){var t,e,i,n,s;for(null!=(n=this.binder.unbind)&&n.call(this,this.el),this.observer.unobserve(),s=this.dependencies,e=0,i=s.length;i>e;e++)t=s[e],t.unobserve();return this.dependencies=[]},e.prototype.update=function(t){var e;return null==t&&(t={}),this.model=this.observer.target,this.unbind(),null!=(e=this.binder.update)&&e.call(this,t),this.bind()},e}(),t.ComponentBinding=function(e){function i(e,i,n){var o,h,u,l,a;for(this.view=e,this.el=i,this.type=n,this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.update=r(this.update,this),this.locals=r(this.locals,this),this.component=t.components[this.type],this.attributes={},this.inflections={},l=this.el.attributes||[],h=0,u=l.length;u>h;h++)o=l[h],a=o.name,s.call(this.component.attributes,a)>=0?this.attributes[o.name]=o.value:this.inflections[o.name]=o.value}return u(i,e),i.prototype.sync=function(){},i.prototype.locals=function(t){var e,i,n,s,r,o,h,u,l;null==t&&(t=this.view.models),r={},u=this.inflections;for(i in u)for(e=u[i],l=e.split("."),o=0,h=l.length;h>o;o++)s=l[o],r[i]=(r[i]||t)[s];for(i in t)n=t[i],null==r[i]&&(r[i]=n);return r},i.prototype.update=function(t){var e;return null!=(e=this.componentView)?e.update(this.locals(t)):void 0},i.prototype.bind=function(){var e,i;return null!=this.componentView?null!=(i=this.componentView)?i.bind():void 0:(e=this.component.build.call(this.attributes),(this.componentView=new t.View(e,this.locals(),this.view.options)).bind(),this.el.parentNode.replaceChild(e,this.el))},i.prototype.unbind=function(){var t;return null!=(t=this.componentView)?t.unbind():void 0},i}(t.Binding),t.TextBinding=function(t){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.sync=r(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[]}return u(e,t),e.prototype.binder={routine:function(t,e){return t.data=null!=e?e:""}},e.prototype.sync=function(){return e.__super__.sync.apply(this,arguments)},e}(t.Binding),t.adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(t){var e;return t.hasOwnProperty(this.id)||(e=this.counter++,this.weakmap[e]={callbacks:{}},Object.defineProperty(t,this.id,{value:e})),this.weakmap[t[this.id]]},stubFunction:function(t,e){var i,n,s;return n=t[e],i=this.weakReference(t),s=this.weakmap,t[e]=function(){var e,r,o,h,u,l,a,d,p,c;h=n.apply(t,arguments),a=i.pointers;for(o in a)for(r=a[o],c=null!=(d=null!=(p=s[o])?p.callbacks[r]:void 0)?d:[],u=0,l=c.length;l>u;u++)(e=c[u])();return h}},observeMutations:function(t,e,i){var n,r,o,h,u,l;if(Array.isArray(t)){if(o=this.weakReference(t),null==o.pointers)for(o.pointers={},r=["push","pop","shift","unshift","sort","reverse","splice"],u=0,l=r.length;l>u;u++)n=r[u],this.stubFunction(t,n);if(null==(h=o.pointers)[e]&&(h[e]=[]),s.call(o.pointers[e],i)<0)return o.pointers[e].push(i)}},unobserveMutations:function(t,e,i){var n,s,r;return Array.isArray(t&&null!=t[this.id])&&(s=null!=(r=this.weakReference(t).pointers)?r[e]:void 0)&&(n=s.indexOf(i),n>=0)?s.splice(n,1):void 0},subscribe:function(t,e,i){var n,r;return n=this.weakReference(t).callbacks,null==n[e]&&(n[e]=[],r=t[e],Object.defineProperty(t,e,{enumerable:!0,get:function(){return r},set:function(o){return function(h){var u,l,a;if(h!==r){for(r=h,a=n[e].slice(),u=0,l=a.length;l>u;u++)i=a[u],s.call(n[e],i)>=0&&i();return o.observeMutations(h,t[o.id],e)}}}(this)})),s.call(n[e],i)<0&&n[e].push(i),this.observeMutations(t[e],t[this.id],e)},unsubscribe:function(t,e,i){var n,s;return n=this.weakmap[t[this.id]].callbacks[e],s=n.indexOf(i),s>=0&&n.splice(s,1),this.unobserveMutations(t[e],t[this.id],e)},read:function(t,e){return t[e]},publish:function(t,e,i){return t[e]=i}},t.binders.text=function(t,e){return null!=t.textContent?t.textContent=null!=e?e:"":t.innerText=null!=e?e:""},t.binders.html=function(t,e){return t.innerHTML=null!=e?e:""},t.binders.show=function(t,e){return t.style.display=e?"":"none"},t.binders.hide=function(t,e){return t.style.display=e?"none":""},t.binders.enabled=function(t,e){return t.disabled=!e},t.binders.disabled=function(t,e){return t.disabled=!!e},t.binders.checked={publishes:!0,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)===(null!=e?e.toString():void 0):!!e}},t.binders.unchecked={publishes:!0,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)!==(null!=e?e.toString():void 0):!e}},t.binders.value={publishes:!0,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i,n,r,o,h,u,l;if(null!=window.jQuery){if(t=jQuery(t),(null!=e?e.toString():void 0)!==(null!=(o=t.val())?o.toString():void 0))return t.val(null!=e?e:"")}else if("select-multiple"===t.type){if(null!=e){for(l=[],n=0,r=t.length;r>n;n++)i=t[n],l.push(i.selected=(h=i.value,s.call(e,h)>=0));return l}}else if((null!=e?e.toString():void 0)!==(null!=(u=t.value)?u.toString():void 0))return t.value=null!=e?e:""}},t.binders["if"]={block:!0,bind:function(t){var e,i;return null==this.marker?(e=[this.view.config.prefix,this.type].join("-").replace("--","-"),i=t.getAttribute(e),this.marker=document.createComment(" rivets: "+this.type+" "+i+" "),t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t)):void 0},unbind:function(){var t;return null!=(t=this.nested)?t.unbind():void 0},routine:function(e,i){var n,s,r,o,h;if(!!i==(null==this.nested)){if(i){r={},h=this.view.models;for(n in h)s=h[n],r[n]=s;return o={binders:this.view.options.binders,formatters:this.view.options.formatters,adapters:this.view.options.adapters,config:this.view.options.config},(this.nested=new t.View(e,r,o)).bind(),this.marker.parentNode.insertBefore(e,this.marker.nextSibling)}return e.parentNode.removeChild(e),this.nested.unbind(),delete this.nested}},update:function(t){var e;return null!=(e=this.nested)?e.update(t):void 0}},t.binders.unless={block:!0,bind:function(e){return t.binders["if"].bind.call(this,e)},unbind:function(){return t.binders["if"].unbind.call(this)},routine:function(e,i){return t.binders["if"].routine.call(this,e,!i)},update:function(e){return t.binders["if"].update.call(this,e)}},t.binders["on-*"]={"function":!0,unbind:function(e){return this.handler?t.Util.unbindEvent(e,this.args[0],this.handler):void 0},routine:function(e,i){return this.handler&&t.Util.unbindEvent(e,this.args[0],this.handler),t.Util.bindEvent(e,this.args[0],this.handler=this.eventHandler(i))}},t.binders["each-*"]={block:!0,bind:function(t){var e,i,n,s,r;if(null==this.marker)e=[this.view.config.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t);else for(r=this.iterated,n=0,s=r.length;s>n;n++)i=r[n],i.bind()},unbind:function(){var t,e,i,n,s;if(null!=this.iterated){for(n=this.iterated,s=[],e=0,i=n.length;i>e;e++)t=n[e],s.push(t.unbind());return s}},routine:function(e,i){var n,s,r,o,h,u,l,a,d,p,c,f,b,v,g,y,m,w,k,x,E,N,j,O;if(a=this.args[0],i=i||[],this.iterated.length>i.length)for(x=Array(this.iterated.length-i.length),v=0,m=x.length;m>v;v++)r=x[v],b=this.iterated.pop(),b.unbind(),this.marker.parentNode.removeChild(b.els[0]);for(o=g=0,w=i.length;w>g;o=++g)if(l=i[o],s={index:o},s[a]=l,null==this.iterated[o]){E=this.view.models;for(u in E)l=E[u],null==s[u]&&(s[u]=l);p=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,d={binders:this.view.options.binders,formatters:this.view.options.formatters,adapters:this.view.options.adapters,config:{}},N=this.view.options.config;for(h in N)f=N[h],d.config[h]=f;d.config.preloadData=!0,c=e.cloneNode(!0),b=new t.View(c,s,d),b.bind(),this.iterated.push(b),this.marker.parentNode.insertBefore(c,p.nextSibling)}else this.iterated[o].models[a]!==l&&this.iterated[o].update(s);if("OPTION"===e.nodeName){for(j=this.view.bindings,O=[],y=0,k=j.length;k>y;y++)n=j[y],O.push(n.el===this.marker.parentNode&&"value"===n.type?n.sync():void 0);return O}},update:function(t){var e,i,n,s,r,o,h,u;e={};for(i in t)n=t[i],i!==this.args[0]&&(e[i]=n);for(h=this.iterated,u=[],r=0,o=h.length;o>r;r++)s=h[r],u.push(s.update(e));return u}},t.binders["class-*"]=function(t,e){var i;return i=" "+t.className+" ",!e==(-1!==i.indexOf(" "+this.args[0]+" "))?t.className=e?""+t.className+" "+this.args[0]:i.replace(" "+this.args[0]+" "," ").trim():void 0},t.binders["*"]=function(t,e){return null!=e?t.setAttribute(this.type,e):t.removeAttribute(this.type)},t.factory=function(e){return e._=t,e.binders=t.binders,e.components=t.components,e.formatters=t.formatters,e.adapters=t.adapters,e.config=t.config,e.configure=function(e){var i,n;null==e&&(e={});for(i in e)n=e[i],t.config[i]=n},e.bind=function(e,i,n){var s;return null==i&&(i={}),null==n&&(n={}),s=new t.View(e,i,n),s.bind(),s}},"object"==typeof exports?t.factory(exports):"function"==typeof define&&define.amd?define(["exports"],function(e){return t.factory(this.rivets=e),e}):t.factory(this.rivets={})}).call(this);