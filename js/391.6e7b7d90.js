(self["webpackChunkeshop"]=self["webpackChunkeshop"]||[]).push([[391],{2776:function(e,t,s){
/*!
  * Bootstrap toast.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,n){e.exports=n(s(4072),s(9286),s(5695),s(1127))})(0,(function(e,t,s,n){"use strict";const a=e=>e&&"object"===typeof e&&"default"in e?e:{default:e},i=a(t),o=a(s),r="toast",l="bs.toast",c=`.${l}`,u=`mouseover${c}`,h=`mouseout${c}`,d=`focusin${c}`,m=`focusout${c}`,_=`hide${c}`,p=`hidden${c}`,f=`show${c}`,g=`shown${c}`,v="fade",b="hide",k="show",w="showing",y={animation:"boolean",autohide:"boolean",delay:"number"},$={animation:!0,autohide:!0,delay:5e3};class T extends o.default{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return $}static get DefaultType(){return y}static get NAME(){return r}show(){const t=i.default.trigger(this._element,f);if(t.defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(v);const s=()=>{this._element.classList.remove(w),i.default.trigger(this._element,g),this._maybeScheduleHide()};this._element.classList.remove(b),e.reflow(this._element),this._element.classList.add(k,w),this._queueCallback(s,this._element,this._config.animation)}hide(){if(!this.isShown())return;const e=i.default.trigger(this._element,_);if(e.defaultPrevented)return;const t=()=>{this._element.classList.add(b),this._element.classList.remove(w,k),i.default.trigger(this._element,p)};this._element.classList.add(w),this._queueCallback(t,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(k),super.dispose()}isShown(){return this._element.classList.contains(k)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t;break;case"focusin":case"focusout":this._hasKeyboardInteraction=t;break}if(t)return void this._clearTimeout();const s=e.relatedTarget;this._element===s||this._element.contains(s)||this._maybeScheduleHide()}_setListeners(){i.default.on(this._element,u,(e=>this._onInteraction(e,!0))),i.default.on(this._element,h,(e=>this._onInteraction(e,!1))),i.default.on(this._element,d,(e=>this._onInteraction(e,!0))),i.default.on(this._element,m,(e=>this._onInteraction(e,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each((function(){const t=T.getOrCreateInstance(this,e);if("string"===typeof e){if("undefined"===typeof t[e])throw new TypeError(`No method named "${e}"`);t[e](this)}}))}}return n.enableDismissTrigger(T),e.defineJQueryPlugin(T),T}))},4418:function(e,t,s){"use strict";s.d(t,{Z:function(){return w}});var n=s(6252);const a={class:"toast-container position-absolute pt-2 pe-3 top-0 end-0"};function i(e,t,s,i,o,r){const l=(0,n.up)("Toast");return(0,n.wg)(),(0,n.iD)("div",a,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.messages,((e,t)=>((0,n.wg)(),(0,n.j4)(l,{key:t,msg:e},null,8,["msg"])))),128))])}s(7658);var o=s(3577);const r={class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true",ref:"toast"},l={class:"toast-header"},c={class:"me-auto"},u=(0,n._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close"},null,-1),h={key:0,class:"toast-body"};function d(e,t,s,a,i,d){return(0,n.wg)(),(0,n.iD)("div",r,[(0,n._)("div",l,[(0,n._)("span",{class:(0,o.C_)([`bg-${s.msg.style}`,"p-2 rounded me-2 d-inline-block"])},null,2),(0,n._)("strong",c,(0,o.zw)(s.msg.title),1),u]),s.msg.content?((0,n.wg)(),(0,n.iD)("div",h,(0,o.zw)(s.msg.content),1)):(0,n.kq)("",!0)],512)}var m=s(2776),_=s.n(m),p={name:"ToastMessages",props:["msg"],mounted(){const e=this.$refs.toast,t=new(_())(e,{delay:6e3});t.show()}},f=s(3744);const g=(0,f.Z)(p,[["render",d]]);var v=g,b={components:{Toast:v},data(){return{messages:[]}},inject:["emitter"],mounted(){this.emitter.on("push-message",(e=>{const{style:t="success",title:s,content:n}=e;this.messages.push({style:t,title:s,content:n})}))}};const k=(0,f.Z)(b,[["render",i]]);var w=k},391:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return T}});var n=s(6252);const a={class:"position-absolute top-0 start-0 w-100"},i={class:"container-fluid bg-white"},o={class:"container-fluid mt-3"};function r(e,t,s,r,l,c){const u=(0,n.up)("Navbar"),h=(0,n.up)("RouterView"),d=(0,n.up)("ToastMessages");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",a,[(0,n.Wm)(u)]),(0,n._)("div",i,[(0,n.Wm)(h),(0,n._)("div",o,[(0,n.Wm)(d)])])],64)}s(7658);var l=s(5820),c=s(4418),u=s(9963);const h={class:"navbar navbar-expand-lg navbar-light bg-light position-relative top-0 start-0",style:{"z-index":"100"}},d={class:"container-fluid"},m=(0,n._)("a",{class:"navbar-brand",href:"/#/dashboard/backproducts"}," DESSERT ",-1),_=(0,n._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,n._)("span",{class:"navbar-toggler-icon"})],-1),p={class:"collapse navbar-collapse",id:"navbarNavAltMarkup"},f={class:"navbar-nav text-center"};function g(e,t){return(0,n.wg)(),(0,n.iD)("nav",h,[(0,n._)("div",d,[m,_,(0,n._)("div",p,[(0,n._)("div",f,[(0,n._)("a",{class:"nav-link","aria-current":"page",href:"#",onClick:t[0]||(t[0]=(0,u.iM)((t=>e.$router.push("/dashboard/backproducts")),["prevent"]))},"產品 "),(0,n._)("a",{class:"nav-link",href:"#",onClick:t[1]||(t[1]=(0,u.iM)((t=>e.$router.push("/dashboard/order")),["prevent"]))},"訂單 "),(0,n._)("a",{class:"nav-link",href:"#",onClick:t[2]||(t[2]=(0,u.iM)((t=>e.$router.push("/dashboard/coupon")),["prevent"]))},"優惠卷 "),(0,n._)("a",{class:"nav-link d-inline-block d-lg-none",href:"#",onClick:t[3]||(t[3]=(0,u.iM)((t=>e.$router.push("/")),["prevent"]))},"登出 ")]),(0,n._)("a",{class:"text-black d-none d-lg-block ms-auto href-none",href:"#",onClick:t[4]||(t[4]=(0,u.iM)((t=>e.$router.push("/")),["prevent"]))},"登出 ")])])])}var v=s(3744);const b={},k=(0,v.Z)(b,[["render",g]]);var w=k,y={created(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)dessertToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e;const t="https://vue3-course-api.hexschool.io/api/user/check";this.$http.post(t,this.user).then((e=>{e.data.success||this.$router.push("login")}))},components:{ToastMessages:c.Z,Navbar:w},provide(){return{emitter:l.Z}}};const $=(0,v.Z)(y,[["render",r]]);var T=$}}]);
//# sourceMappingURL=391.6e7b7d90.js.map