(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"0PFH":function(e,t,n){"use strict";n.r(t),n.d(t,"AppRoutingModule",function(){return D});var o=n("fXoL"),i=n("tyNb"),r=n("gvIg"),a=n("1kSV"),l=n("Wp6s"),c=n("4HcB"),s=n("Rs8g"),d=n("xKM4"),m=n("b6Qw"),p=n("ofXK"),g=n("1jcm");let _=(()=>{class e{constructor(e,t){this.router=e,this.themeService=t,this.useDefault=!1}ngOnInit(){this.useDefault=this.themeService.gettheme()}toggle(e){this.useDefault=e.checked,1==e.checked?(this.themeService.toggleDark(),this.hideDiv=!1):(this.themeService.toggleLight(),this.hideDiv=!0)}get hideDiv(){return this.themeService.hideDiv}set hideDiv(e){this.themeService.hideDiv=e}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](i.c),o["\u0275\u0275directiveInject"](d.a))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-admin-theme"]],decls:4,vars:1,consts:[[1,"main-div","justify-content-center","align-items-center"],["aria-hidden","true","title","Light Mode",1,"fa","fa-sun-o"],[1,"toggle_button",3,"checked","change"],["aria-hidden","true","title","Dark Mode",1,"fa","fa-moon-o"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",0),o["\u0275\u0275element"](1,"i",1),o["\u0275\u0275elementStart"](2,"mat-slide-toggle",2),o["\u0275\u0275listener"]("change",function(e){return t.toggle(e)}),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](3,"i",3),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("checked",t.useDefault))},directives:[g.a],styles:[".main-div[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;color:var(--text-color)!important}.fa[_ngcontent-%COMP%]{margin:5px}mat-slide-toggle[_ngcontent-%COMP%]{z-index:0!important}  .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar,   .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:var(--button-color)!important}"]}),e})();var h=n("3Pt+");let u=(()=>{class e{transform(e){return e.split(" ").map(e=>e[0]).join("").toUpperCase()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=o["\u0275\u0275definePipe"]({name:"shortName",type:e,pure:!0}),e})();function f(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"div",8),o["\u0275\u0275elementStart"](1,"div",9),o["\u0275\u0275elementStart"](2,"div"),o["\u0275\u0275elementStart"](3,"span",4),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const t=o["\u0275\u0275nextContext"]();return t.showlModel=!t.showlModel}),o["\u0275\u0275elementStart"](4,"span",5),o["\u0275\u0275text"](5),o["\u0275\u0275pipe"](6,"shortName"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](7,"hr",10),o["\u0275\u0275elementStart"](8,"div",11),o["\u0275\u0275elementStart"](9,"h1",12),o["\u0275\u0275text"](10),o["\u0275\u0275pipe"](11,"titlecase"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](12,"h3",13),o["\u0275\u0275text"](13),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](14,"h1",14),o["\u0275\u0275text"](15),o["\u0275\u0275pipe"](16,"titlecase"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](17,"hr",10),o["\u0275\u0275elementStart"](18,"div"),o["\u0275\u0275elementStart"](19,"div",15),o["\u0275\u0275elementStart"](20,"div"),o["\u0275\u0275element"](21,"app-admin-theme"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}if(2&e){const e=o["\u0275\u0275nextContext"]();o["\u0275\u0275advance"](5),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](6,4,e.userName)),o["\u0275\u0275advance"](5),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](11,6,e.userName)),o["\u0275\u0275advance"](3),o["\u0275\u0275textInterpolate"](e.email),o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](16,8,e.schoolName))}}function v(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"li"),o["\u0275\u0275elementStart"](1,"a",40),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const t=o["\u0275\u0275nextContext"](2);return t.showDiv=!t.showDiv}),o["\u0275\u0275element"](2,"i",41),o["\u0275\u0275elementStart"](3,"em"),o["\u0275\u0275text"](4,"Dashboard"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}if(2&e){const e=o["\u0275\u0275nextContext"](2);o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("routerLink",e.dashboardRoute)}}function x(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"li"),o["\u0275\u0275elementStart"](1,"a",42),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const t=o["\u0275\u0275nextContext"](2);return t.showDiv=!t.showDiv}),o["\u0275\u0275element"](2,"i",43),o["\u0275\u0275elementStart"](3,"em"),o["\u0275\u0275text"](4,"Settings"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}}function C(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",44),o["\u0275\u0275elementStart"](1,"small",14),o["\u0275\u0275text"](2,"Powered by"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](3,"img",45),o["\u0275\u0275elementEnd"]())}function M(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",44),o["\u0275\u0275elementStart"](1,"small",14),o["\u0275\u0275text"](2,"Powered by"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](3,"img",46),o["\u0275\u0275elementEnd"]())}function O(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"div",16),o["\u0275\u0275elementStart"](1,"div",17),o["\u0275\u0275elementStart"](2,"div",18),o["\u0275\u0275elementStart"](3,"div",19),o["\u0275\u0275elementStart"](4,"div",20),o["\u0275\u0275elementStart"](5,"div",21),o["\u0275\u0275elementStart"](6,"span",22),o["\u0275\u0275elementStart"](7,"span",5),o["\u0275\u0275text"](8),o["\u0275\u0275pipe"](9,"shortName"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](10,"div",23),o["\u0275\u0275elementStart"](11,"div",24),o["\u0275\u0275elementStart"](12,"h1",25),o["\u0275\u0275text"](13),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](14,"div",23),o["\u0275\u0275elementStart"](15,"div",26),o["\u0275\u0275elementStart"](16,"h2",27),o["\u0275\u0275text"](17),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](18,"hr"),o["\u0275\u0275elementStart"](19,"div"),o["\u0275\u0275elementStart"](20,"div",28),o["\u0275\u0275elementStart"](21,"div"),o["\u0275\u0275element"](22,"app-admin-theme"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](23,"hr"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](24,"div",29),o["\u0275\u0275elementStart"](25,"ul",30),o["\u0275\u0275template"](26,v,5,1,"li",31),o["\u0275\u0275elementStart"](27,"li"),o["\u0275\u0275elementStart"](28,"a",32),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const t=o["\u0275\u0275nextContext"]();return t.showDiv=!t.showDiv}),o["\u0275\u0275element"](29,"i",33),o["\u0275\u0275elementStart"](30,"em"),o["\u0275\u0275text"](31,"Quiz"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](32,"li"),o["\u0275\u0275elementStart"](33,"a",34),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const t=o["\u0275\u0275nextContext"]();return t.showDiv=!t.showDiv}),o["\u0275\u0275element"](34,"i",35),o["\u0275\u0275elementStart"](35,"em"),o["\u0275\u0275text"](36,"Schedule"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](37,x,5,0,"li",31),o["\u0275\u0275elementStart"](38,"li"),o["\u0275\u0275elementStart"](39,"a",36),o["\u0275\u0275listener"]("click",function(){return o["\u0275\u0275restoreView"](e),o["\u0275\u0275nextContext"]().logOut()}),o["\u0275\u0275element"](40,"i",37),o["\u0275\u0275elementStart"](41,"em"),o["\u0275\u0275text"](42,"Logout"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](43,C,4,0,"div",38),o["\u0275\u0275template"](44,M,4,0,"div",38),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](45,"div",18),o["\u0275\u0275elementStart"](46,"div",39),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const t=o["\u0275\u0275nextContext"]();return t.showDiv=!t.showDiv}),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}if(2&e){const e=o["\u0275\u0275nextContext"]();o["\u0275\u0275advance"](8),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](9,8,e.userName)),o["\u0275\u0275advance"](5),o["\u0275\u0275textInterpolate"](e.userName),o["\u0275\u0275advance"](4),o["\u0275\u0275textInterpolate"](e.schoolName),o["\u0275\u0275advance"](9),o["\u0275\u0275property"]("ngIf","admin"==e.role),o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("hidden","student"==e.role),o["\u0275\u0275advance"](9),o["\u0275\u0275property"]("ngIf","admin"==e.role),o["\u0275\u0275advance"](6),o["\u0275\u0275property"]("ngIf",e.hideDiv),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",!e.hideDiv)}}let P=(()=>{class e{constructor(e,t,n,o,i,r){this.localService=e,this.schoolService=t,this.jwtService=n,this.router=o,this.themeService=i,this.cookieService=r,this.url=null,this.showDiv=null,this.isRunning=!0,this.dashboardRoute="",this.shortname=!1,this.loggedInUser=this.localService.getUser(),this.role=this.loggedInUser.role}ngOnInit(){this.jwtToken=this.cookieService.get("jwt_token"),this.userName=this.loggedInUser.name,this.email=this.loggedInUser.email,"superadmin"!==this.role&&this.schoolService.getSingleSchoolDetails(this.loggedInUser.belongs_to_school).subscribe(e=>{this.schoolName=e.name,this.url=e.logoUrl,"admin"===this.role&&(this.dashboardRoute="dashboard/admin"),this.shortname=this.schoolName.length>20})}opensideNav(){this.showDiv=!0}logOut(){this.jwtService.destroyToken(),this.localService.destroyUser(),this.router.navigate(["login"]),window.location.reload()}verifyLogin(){let e;return this.jwtToken&&(e=!0),e=!1,e}pauseClick(){this.isRunning=!1}restartClick(){this.isRunning=!0}get hideDiv(){return this.themeService.hideDiv}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](r.a),o["\u0275\u0275directiveInject"](c.a),o["\u0275\u0275directiveInject"](s.a),o["\u0275\u0275directiveInject"](i.c),o["\u0275\u0275directiveInject"](d.a),o["\u0275\u0275directiveInject"](m.a))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-top-bar"]],decls:11,vars:5,consts:[[1,"navbar"],[1,"row",2,"display","flex","align-items","center","margin","0px","width","100%","justify-content","space-between"],["aria-hidden","true",1,"fa","fa-bars",3,"click"],[1,"mat-h1","m-0"],[1,"user","_text_color",2,"cursor","pointer",3,"click"],[1,"user_name"],["class","lg_profile",4,"ngIf"],["class","mobile_sidenav",4,"ngIf"],[1,"lg_profile"],[1,"d-flex","justify-content-center","align-items-center","py-4"],[1,"m-0"],[1,"row","py-3","_text_color",2,"flex-direction","column"],[1,"_text_color","name","text-center"],[1,"name","text-center","text-muted"],[1,"_text_color"],[1,"row","text-center","justify-content-center","py-4"],[1,"mobile_sidenav"],[1,"row","no-gutters"],[1,"col"],[1,"wrapper"],[1,"school_name"],[1,"row","mt-4","align-items-center","justify-content-center"],[1,"user_mobile","_text_color"],[1,"row","mt-2"],[1,"col","align-items-center","justify-content-center"],[1,"_text_color","name"],[1,"col","text-center"],[1,"_text_color",3,"ngModel"],[1,"row","text-center","justify-content-center"],[1,"sidebar__inner"],[1,"siderbar_menu"],[4,"ngIf"],["routerLinkActive","active","routerLink","quiz/list",1,"s-sidebar__nav-link",3,"hidden","click"],["aria-hidden","true",1,"fa","fa-pencil-square-o"],["routerLinkActive","active","routerLink","schedule/list",1,"s-sidebar__nav-link",3,"click"],[1,"fa","fa-camera"],[1,"s-sidebar__nav-link",3,"click"],[1,"fas","fa-sign-out-alt"],["class","social_media",4,"ngIf"],[1,"opasitive",3,"click"],["routerLinkActive","active",1,"s-sidebar__nav-link",3,"routerLink","click"],["aria-hidden","true",1,"fa","fa-bar-chart"],["routerLinkActive","active","routerLink","settings/page",1,"s-sidebar__nav-link",3,"click"],["aria-hidden","true",1,"fa","fa-cog"],[1,"social_media"],["src","/assets/images/fevicon.png"],["src","/assets/images/Logo 2.png"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"nav",0),o["\u0275\u0275elementStart"](1,"div",1),o["\u0275\u0275elementStart"](2,"i",2),o["\u0275\u0275listener"]("click",function(){return t.opensideNav()}),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](3,"h1",3),o["\u0275\u0275text"](4,"Insight Mirror"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"span",4),o["\u0275\u0275listener"]("click",function(){return t.showlModel=!t.showlModel}),o["\u0275\u0275elementStart"](6,"span",5),o["\u0275\u0275text"](7),o["\u0275\u0275pipe"](8,"shortName"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](9,f,22,10,"div",6),o["\u0275\u0275template"](10,O,47,10,"div",7)),2&e&&(o["\u0275\u0275advance"](7),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](8,3,t.userName)),o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("ngIf",t.showlModel),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",t.showDiv))},directives:[a.f,p.NgIf,_,h.q,h.t,i.e,i.d],pipes:[u,p.TitleCasePipe],styles:["nav[_ngcontent-%COMP%]{width:100%;z-index:1;border-radius:5px}li[_ngcontent-%COMP%]{list-style:none}.fa-bars[_ngcontent-%COMP%]{display:none}a[_ngcontent-%COMP%]{text-decoration:none}.navbar-brand[_ngcontent-%COMP%]{color:var(--text-color)!important;text-align:center}.nav-item[_ngcontent-%COMP%]{justify-content:end}.user[_ngcontent-%COMP%], .user_mobile[_ngcontent-%COMP%]{width:50px;height:50px;background-color:var(--button-color)!important;border-radius:50%;display:flex;justify-content:center;align-items:center;text-align:center;font-size:24px;font-weight:600}.fa-user[_ngcontent-%COMP%]{font-size:20px}.mobile_sidenav[_ngcontent-%COMP%]{display:none!important}h1[_ngcontent-%COMP%]{margin:0}.navbar[_ngcontent-%COMP%]{padding:0}.lg_profile[_ngcontent-%COMP%]{width:250px;border-radius:35px;position:absolute;z-index:1;right:20px;top:75px;background-color:var(--secondl-card-color)!important;box-shadow:0 3px 6px 0 rgba(0,0,0,.2);transition:all .3s;-webkit-transition:all .3s;-moz-transition:all .3s;-ms-transition:all .3s;-o-transition:all .3s}.mat-h1[_ngcontent-%COMP%]{color:var(--text-color)!important}h1[_ngcontent-%COMP%]{font-size:22px}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{margin:auto}h2[_ngcontent-%COMP%]{color:darken(color(grey),15);font-weight:300;font-size:14px}.user_name[_ngcontent-%COMP%]{color:#fff}@media screen and (max-width:600px){.brand[_ngcontent-%COMP%]{display:none!important}.navbar[_ngcontent-%COMP%]{padding:0 16px}.user[_ngcontent-%COMP%]{display:none!important}.mobile_sidenav[_ngcontent-%COMP%]{display:inline!important}.app_title[_ngcontent-%COMP%]{display:inline;font-size:24px;font-weight:400}.lg_profile[_ngcontent-%COMP%]{display:none!important}nav[_ngcontent-%COMP%]{width:100%;z-index:1;background-color:var(--button-color);top:0;border-radius:0;height:60px;color:#fff;box-shadow:0 0 4px 1px #000}.navbar-brand[_ngcontent-%COMP%]{display:flex;justify-content:center;color:var(--text-color)!important;font-size:20px}.fa-bars[_ngcontent-%COMP%]{color:#fff}li[_ngcontent-%COMP%]{list-style:none}a[_ngcontent-%COMP%]{font-size:15px;cursor:pointer}.fa-bars[_ngcontent-%COMP%], .fa-times[_ngcontent-%COMP%]{display:inherit;padding:5px;font-size:25px}em[_ngcontent-%COMP%]{font-style:normal;font-size:15px}a[_ngcontent-%COMP%]{text-decoration:none;color:inherit}.s-sidebar__nav-link[_ngcontent-%COMP%]{position:relative;display:inline-block;width:100%;height:3em}.s-sidebar__nav-link[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{position:absolute;top:50%;left:3.5em;transform:translateY(-50%)}.s-sidebar__nav-link[_ngcontent-%COMP%]:hover{background:#00f}.s-sidebar__nav-link[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{position:absolute;top:0;left:0;display:inline-block;width:4em;height:4em}.s-sidebar__nav-link[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]:before{position:absolute;top:30%;left:50%;transform:translate(-50%,-50%)}.wrapper[_ngcontent-%COMP%]{width:80%;height:100%;position:fixed;top:0;left:0;background:var(--firstl-card-color)!important;z-index:999}.school_name[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-transform:uppercase}.app_title[_ngcontent-%COMP%]{font-family:Helvetica Neue}.social_media[_ngcontent-%COMP%], .toggle[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-direction:column;align-items:center;text-align:center;width:100%}.social_media[_ngcontent-%COMP%]{position:absolute;bottom:20px}img[_ngcontent-%COMP%]{height:70px;width:100px}.opasitive[_ngcontent-%COMP%]{width:20%;height:100%;position:fixed;top:0;right:0;z-index:999;background-color:grey;opacity:.4}ul[_ngcontent-%COMP%]{list-style-type:none}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px 50px;display:block;height:40px;margin-bottom:1px;color:var(--text-color)!important;text-align:center;text-transform:uppercase;margin-top:10px;margin-left:-25px}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:var(--button-color)!important;color:#fff!important;border-radius:5px;height:40px}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]:before, .wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{display:block}.fa[_ngcontent-%COMP%]{font-size:15px}.fa-bars[_ngcontent-%COMP%]{font-size:22px}.mat-h1[_ngcontent-%COMP%]{color:#fff!important}}@media only screen and (min-width:600px) and (max-width:1250px){.lg_profile[_ngcontent-%COMP%]{display:none}.name[_ngcontent-%COMP%]{text-transform:uppercase;justify-content:center;text-align:center}.brand[_ngcontent-%COMP%], .user[_ngcontent-%COMP%]{display:none}.mobile_sidenav[_ngcontent-%COMP%]{display:inline!important}.app_title[_ngcontent-%COMP%]{display:inline;font-size:24px;font-weight:400}nav[_ngcontent-%COMP%]{width:100%;z-index:1;padding:0;left:0;top:0;border-radius:0}.navbar-brand[_ngcontent-%COMP%]{display:flex;justify-content:center;font-size:20px}.fa-bars[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{color:var(--text-color)!important}li[_ngcontent-%COMP%]{list-style:none}a[_ngcontent-%COMP%]{font-size:15px;cursor:pointer}.fa-bars[_ngcontent-%COMP%], .fa-times[_ngcontent-%COMP%]{display:inherit;padding:5px;font-size:22px}em[_ngcontent-%COMP%]{font-style:normal;font-size:15px}a[_ngcontent-%COMP%]{text-decoration:none;color:inherit}.s-sidebar__nav-link[_ngcontent-%COMP%]{position:relative;display:inline-block;width:100%;height:3em}.s-sidebar__nav-link[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{position:absolute;top:50%;left:3.5em;transform:translateY(-50%)}.s-sidebar__nav-link[_ngcontent-%COMP%]:hover{background:#00f}.s-sidebar__nav-link[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{position:absolute;top:0;left:0;display:inline-block;width:4em;height:4em}.s-sidebar__nav-link[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]:before{position:absolute;top:35%;left:50%;transform:translate(-50%,-50%)}.wrapper[_ngcontent-%COMP%]{width:40%;height:100%;position:fixed;top:0;left:0;background:var(--firstl-card-color)!important;z-index:999}.social_media[_ngcontent-%COMP%]{position:absolute;bottom:20px;text-align:center;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}img[_ngcontent-%COMP%]{height:70px;width:100px}.opasitive[_ngcontent-%COMP%]{width:60%;height:100%;position:fixed;top:0;right:0;z-index:999;background-color:grey;opacity:.1}ul[_ngcontent-%COMP%]{list-style-type:none}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px 50px;display:block;height:40px;margin-bottom:1px;color:var(--text-color)!important;text-align:center;text-transform:uppercase;margin-top:10px;margin-left:-25px}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:var(--button-color)!important;color:#fff!important;border-radius:5px;height:40px}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]:before, .wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{display:block}.mat-h1[_ngcontent-%COMP%]{color:var(--text-color)!important}}"]}),e})();const b=function(){return{exact:!0}};function w(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"li",9),o["\u0275\u0275elementStart"](1,"a",15),o["\u0275\u0275elementStart"](2,"em"),o["\u0275\u0275element"](3,"i",16),o["\u0275\u0275text"](4,"Dashboard"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e){const e=o["\u0275\u0275nextContext"]();o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("routerLinkActiveOptions",o["\u0275\u0275pureFunction0"](2,b))("routerLink",e.dashboardRoute)}}function S(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"li",9),o["\u0275\u0275elementStart"](1,"a",17),o["\u0275\u0275elementStart"](2,"em"),o["\u0275\u0275element"](3,"i",18),o["\u0275\u0275text"](4,"Settings"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("routerLinkActiveOptions",o["\u0275\u0275pureFunction0"](1,b)))}function y(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",19),o["\u0275\u0275elementStart"](1,"small"),o["\u0275\u0275text"](2,"Powered by"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](3,"img",20),o["\u0275\u0275elementEnd"]())}function k(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",19),o["\u0275\u0275elementStart"](1,"small"),o["\u0275\u0275text"](2,"Powered by"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](3,"img",21),o["\u0275\u0275elementEnd"]())}let E=(()=>{class e{constructor(e,t,n,o,i,r){this.localService=e,this.cookieService=t,this.schoolService=n,this.jwtService=o,this.router=i,this.themeService=r,this.dashboardRoute="",this.loggedInUser=this.localService.getUser(),this.role=this.loggedInUser.role}ngOnInit(){"superadmin"!==this.role&&(this.jwtToken=this.cookieService.get("jwt_token"),this.schoolService.getSingleSchoolDetails(this.loggedInUser.belongs_to_school),"admin"===this.role&&(this.dashboardRoute="dashboard/admin"))}logOut(){this.jwtService.destroyToken(),this.localService.destroyUser(),this.cookieService.delete("jwt_token"),this.router.navigate(["login"])}verifyLogin(){let e;return this.jwtToken&&(e=!0),e=!1,e}get hideDiv(){return this.themeService.hideDiv}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](r.a),o["\u0275\u0275directiveInject"](m.a),o["\u0275\u0275directiveInject"](c.a),o["\u0275\u0275directiveInject"](s.a),o["\u0275\u0275directiveInject"](i.c),o["\u0275\u0275directiveInject"](d.a))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-nav-bar"]],decls:24,vars:7,consts:[[1,"wrapper","_text_color"],[1,"sidebar"],[1,"bg_shadow"],[1,"sidebar__inner"],[1,"siderbar_menu","_text_color"],["class","nav_item",4,"ngIf"],["routerLinkActive","active",1,"nav_item",3,"hidden"],["routerLink","quiz/list",1,"s-sidebar__nav-link","_text_color"],["aria-hidden","true",1,"fa","fa-pencil-square-o"],[1,"nav_item"],["routerLinkActive","active","routerLink","schedule/list",1,"s-sidebar__nav-link","_text_color",3,"routerLinkActiveOptions"],[1,"fa","fa-camera"],[1,"s-sidebar__nav-link","_text_color",3,"click"],[1,"fas","fa-sign-out-alt"],["class","social_media",4,"ngIf"],["routerLinkActive","active",1,"s-sidebar__nav-link","_text_color",3,"routerLinkActiveOptions","routerLink"],["aria-hidden","true",1,"fa","fa-bar-chart"],["routerLinkActive","active","routerLink","settings/page",1,"s-sidebar__nav-link","_text_color",3,"routerLinkActiveOptions"],["aria-hidden","true",1,"fa","fa-cog"],[1,"social_media"],["src","/assets/images/fevicon.png",1,"logo_white"],["src","/assets/images/Logo 2.png",1,"logo_dark"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",0),o["\u0275\u0275elementStart"](1,"div",1),o["\u0275\u0275element"](2,"div",2),o["\u0275\u0275elementStart"](3,"div",3),o["\u0275\u0275elementStart"](4,"ul",4),o["\u0275\u0275template"](5,w,5,3,"li",5),o["\u0275\u0275elementStart"](6,"li",6),o["\u0275\u0275elementStart"](7,"a",7),o["\u0275\u0275elementStart"](8,"em"),o["\u0275\u0275element"](9,"i",8),o["\u0275\u0275text"](10,"Quiz"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](11,"li",9),o["\u0275\u0275elementStart"](12,"a",10),o["\u0275\u0275elementStart"](13,"em"),o["\u0275\u0275element"](14,"i",11),o["\u0275\u0275text"](15,"Schedule"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](16,S,5,2,"li",5),o["\u0275\u0275elementStart"](17,"li",9),o["\u0275\u0275elementStart"](18,"a",12),o["\u0275\u0275listener"]("click",function(){return t.logOut()}),o["\u0275\u0275elementStart"](19,"em"),o["\u0275\u0275element"](20,"i",13),o["\u0275\u0275text"](21,"Logout"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](22,y,4,0,"div",14),o["\u0275\u0275template"](23,k,4,0,"div",14),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275advance"](5),o["\u0275\u0275property"]("ngIf","admin"==t.role),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("hidden","student"==t.role),o["\u0275\u0275advance"](6),o["\u0275\u0275property"]("routerLinkActiveOptions",o["\u0275\u0275pureFunction0"](6,b)),o["\u0275\u0275advance"](4),o["\u0275\u0275property"]("ngIf","admin"==t.role),o["\u0275\u0275advance"](6),o["\u0275\u0275property"]("ngIf",t.hideDiv),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",!t.hideDiv))},directives:[p.NgIf,i.d,i.e],styles:["em[_ngcontent-%COMP%]{font-style:normal;font-size:15px}a[_ngcontent-%COMP%]{text-decoration:none;color:inherit;cursor:pointer}.s-sidebar__trigger[_ngcontent-%COMP%]{z-index:2;position:fixed;top:0;left:0}.s-sidebar__nav-link[_ngcontent-%COMP%]{position:relative;display:inline-block;width:100%;height:3em}.s-sidebar__nav-link[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{position:absolute;top:50%;left:1.4em;transform:translateY(-50%)}.wrapper[_ngcontent-%COMP%]{display:fixed;width:100%;height:100%}.fa-bar-chart[_ngcontent-%COMP%]{margin:0;padding:4px}.nav_item[_ngcontent-%COMP%]{padding-top:30px}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]{width:100%;height:100%;position:relative;border-radius:5px}i[_ngcontent-%COMP%]{font-size:20px;padding:8px}ul[_ngcontent-%COMP%]{list-style-type:none}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px 50px;display:block;height:40px;margin-bottom:1px;color:var(--text-color)!important;text-transform:uppercase;margin-left:-20px}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{width:100%;background:var(--button-color)!important;color:#fff!important;border-radius:5px}.wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]:before, .wrapper[_ngcontent-%COMP%]   .sidebar__inner[_ngcontent-%COMP%]   .siderbar_menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{display:block}.social_media[_ngcontent-%COMP%]{position:absolute;bottom:20px;display:flex;justify-content:center;flex-direction:column;align-items:center;width:100%}.logo_dark[_ngcontent-%COMP%], .logo_white[_ngcontent-%COMP%]{height:100px;width:150px}h4[_ngcontent-%COMP%]{margin:0}@media screen and (max-width:530px){.wrapper[_ngcontent-%COMP%]{display:none}}@media screen and (max-width:1400px){i[_ngcontent-%COMP%]{font-size:18px;padding:2px}}"]}),e})(),I=(()=>{class e{constructor(e,t){this.localUserService=e,this.router=t,this.role="",this.role=this.localUserService.getUser().role,console.log("URL",t.url)}ngOnInit(){"admin"==this.role&&this.router.navigate([""]),"superadmin"==this.role&&this.router.navigate(["/superAdmin/school/page"])}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](r.a),o["\u0275\u0275directiveInject"](i.c))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-root"]],decls:12,vars:0,consts:[[1,"container-fluid",2,"height","100vh","bottom","0px","display","flex","flex-direction","column"],[1,"row","navbar","p-3"],[1,"_overall_mat_card","topnav_matcard"],[1,"row","content"],[1,"col-lg-2","col-md-3","sidenav_col"],[1,"side_nav","_overall_mat_card"],[1,"mt-4"],[1,"col","mobile_scroll"],[1,"_overall_mat_card","mobile_outlet"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",0),o["\u0275\u0275elementStart"](1,"div",1),o["\u0275\u0275elementStart"](2,"mat-card",2),o["\u0275\u0275element"](3,"app-top-bar"),o["\u0275\u0275element"](4,"hr"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"div",3),o["\u0275\u0275elementStart"](6,"div",4),o["\u0275\u0275elementStart"](7,"mat-card",5),o["\u0275\u0275element"](8,"app-nav-bar",6),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](9,"div",7),o["\u0275\u0275elementStart"](10,"mat-card",8),o["\u0275\u0275element"](11,"router-outlet"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]())},directives:[a.f,l.a,P,E,i.g],styles:["mat-card[_ngcontent-%COMP%]{width:100%;height:100%;bottom:0;border-radius:15px}.content[_ngcontent-%COMP%]{flex:1;margin-bottom:10px}.side_nav[_ngcontent-%COMP%]{padding:0!important}hr[_ngcontent-%COMP%]{display:none}.mobile_scroll[_ngcontent-%COMP%]{height:calc(100vh - 120px)}@media only screen and (max-width:600px){.topnav_matcard[_ngcontent-%COMP%]{padding:5px}.side_nav[_ngcontent-%COMP%]{display:none}.sidenav_col[_ngcontent-%COMP%]{display:none!important}.container-fluid[_ngcontent-%COMP%]{margin:0!important;padding:0!important}.content[_ngcontent-%COMP%]{flex:1;margin-bottom:0}.navbar[_ngcontent-%COMP%]{padding:0!important;box-shadow:2px 2px 2px -1px rgba(0,0,0,.12),1px 1px 1px 1px rgba(0,0,0,.12),1px 1px 2px 2px rgba(0,0,0,.12)}.mobile_scroll[_ngcontent-%COMP%]{height:calc(100vh - 60px)}mat-card[_ngcontent-%COMP%]{width:100%;height:100%;bottom:0;border-radius:0;box-shadow:none!important;padding:0 8px 8px!important;overflow-y:scroll}hr[_ngcontent-%COMP%]{display:block;margin:0}}@media only screen and (min-width:600px) and (max-width:1250px){.side_nav[_ngcontent-%COMP%], .sidenav_col[_ngcontent-%COMP%]{display:none!important}.mobile_outlet[_ngcontent-%COMP%]{padding:15px!important}}"]}),e})(),j=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-admin-subsciption-expire"]],decls:12,vars:0,consts:[[1,"overall"],["id","notfound"],[1,"notfound"],[1,"notfound-404"],["href","#"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",0),o["\u0275\u0275elementStart"](1,"div",1),o["\u0275\u0275elementStart"](2,"div",2),o["\u0275\u0275element"](3,"div",3),o["\u0275\u0275elementStart"](4,"h1"),o["\u0275\u0275text"](5,"Oops!"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](6,"h2"),o["\u0275\u0275text"](7," Page Not Be Found"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](8,"p"),o["\u0275\u0275text"](9,"Sorry there is an issue"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](10,"a",4),o["\u0275\u0275text"](11,"Please Contact School Admin"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]())},styles:['.overall[_ngcontent-%COMP%]{display:block;width:100%;height:100%;justify-content:center;align-items:center;margin:0 auto;background-image:url(/assets/images/Blue.jpg)}#notfound[_ngcontent-%COMP%]{position:relative;height:100vh}#notfound[_ngcontent-%COMP%]   .notfound[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.notfound[_ngcontent-%COMP%]{max-width:560px;width:100%;padding-left:160px;line-height:1.1;background-color:#f2f5f8}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]{position:absolute;left:0;top:0;display:inline-block;width:140px;height:140px;background-image:url(/assets/images/emoji.png);background-size:cover;background-color:#f2f5f8}.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]:before{content:"";position:absolute;width:100%;height:100%;transform:scale(2.4);border-radius:50%;background-color:#f2f5f8;z-index:-1}.notfound[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:45px;font-weight:700;margin-top:0;margin-bottom:10px}.notfound[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .notfound[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-family:Nunito,sans-serif;color:var(--text-color)!important;text-transform:uppercase}.notfound[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:21px;font-weight:400;margin:0}.notfound[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--text-color)!important;font-weight:400}.notfound[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .notfound[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Nunito,sans-serif}.notfound[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;font-weight:700;border-radius:40px;text-decoration:none;color:#388dbc}@media only screen and (max-width:767px){.notfound[_ngcontent-%COMP%]   .notfound-404[_ngcontent-%COMP%]{width:110px;height:110px}.notfound[_ngcontent-%COMP%]{padding-left:15px;padding-right:15px;padding-top:110px}}']}),e})();new o.InjectionToken("externalUrlRedirectResolver");const z=[{path:"",component:I,children:[{path:"",redirectTo:"schedule",pathMatch:"full"},{path:"questions",loadChildren:()=>Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"nZJs")).then(e=>e.QuestionsModule)},{path:"quiz",loadChildren:()=>Promise.all([n.e(1),n.e(3),n.e(0),n.e(11)]).then(n.bind(null,"Rc+H")).then(e=>e.QuizModule)},{path:"schedule",loadChildren:()=>Promise.all([n.e(1),n.e(3),n.e(0),n.e(12)]).then(n.bind(null,"L0xO")).then(e=>e.ScheduleModule)},{path:"dashboard",loadChildren:()=>n.e(9).then(n.bind(null,"Oy4E")).then(e=>e.DashboardRoutingModule)},{path:"settings",loadChildren:()=>n.e(13).then(n.bind(null,"7Dlj")).then(e=>e.SettingsRoutingModule)},{path:"admincontact",component:j}]}];let D=(()=>{class e{}return e.\u0275mod=o["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=o["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.f.forChild(z)],i.f]}),e})()}}]);