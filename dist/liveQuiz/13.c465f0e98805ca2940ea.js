(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"7Dlj":function(e,t,n){"use strict";n.r(t),n.d(t,"SettingsRoutingModule",function(){return ee});var a=n("tyNb"),i=n("l207"),r=n("fXoL"),l=n("1kSV"),o=n("gvIg"),s=n("njyG"),d=n("XNiG"),c=n("l3fW"),m=n("ofXK"),p=n("zTjc"),h=n("Xa2L"),u=n("9svf"),f=n("7dP1"),g=n("dNgK"),v=n("3Pt+");function b(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"button",11),r["\u0275\u0275listener"]("click",function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().editUser()}),r["\u0275\u0275text"](1,"Edit"),r["\u0275\u0275elementEnd"]()}}function S(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"button",11),r["\u0275\u0275listener"]("click",function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().updateUser()}),r["\u0275\u0275text"](1,"Update"),r["\u0275\u0275elementEnd"]()}}const x=function(){return{standalone:!0}};let y=(()=>{class e{constructor(e,t,n,a,i,l){this.adminService=e,this.confirmationDialogService=t,this.modalService=n,this.authService=a,this.matSnackBar=i,this.router=l,this.adminDetails=[],this.showCase=!1,this.refresh_admins=new r.EventEmitter}ngOnInit(){console.log(this.id),this.getSingleAdminDetails(this.id)}getSingleAdminDetails(e){this.adminService.getSingleAdmin(e).subscribe(e=>{this.adminDetails=e,this.adminMobile=this.adminDetails._admin.mobile_number})}editUser(){this.showCase=!0}deleteUser(){this.confirmationDialogService.confirm("Please confirm..",`Do you really want to delete ${this.adminDetails.name} ?`).then(e=>{e&&(console.log("clicked okay",e),this.refresh_admins.emit(!0),this.authService.deleteSingleUser(this.adminDetails._id).subscribe(e=>{console.log(e),this.matSnackBar.open(e.message,"success",{duration:2e3,verticalPosition:"top",horizontalPosition:"right"})}),this.modalService.dismissAll(),this.router.navigate(["livequiz/settings/page/student/list"]))}).catch(()=>console.log("User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"))}updateUser(){this.adminDetails._admin.mobile_number=this.adminMobile,this.authService.updateUser(this.adminDetails._id,this.adminDetails).subscribe(e=>{console.log(e),this.matSnackBar.open(e.message,"success",{duration:2e3,verticalPosition:"top",horizontalPosition:"right"}),this.modalService.dismissAll()},e=>{this.matSnackBar.open(e.error.message,"undo",{duration:2e3,verticalPosition:"top",horizontalPosition:"right"}),this.modalService.dismissAll()})}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](c.a),r["\u0275\u0275directiveInject"](u.a),r["\u0275\u0275directiveInject"](l.d),r["\u0275\u0275directiveInject"](f.a),r["\u0275\u0275directiveInject"](g.a),r["\u0275\u0275directiveInject"](a.c))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-admin-details"]],inputs:{id:"id"},outputs:{refresh_admins:"refresh_admins"},decls:22,vars:14,consts:[[1,"main-div"],[1,"form-group"],[1,"col-sm-12"],["for","admin_email",1,"control-label","required"],["type","email","id","admin_email",1,"form-control",3,"ngModel","ngModelOptions","disabled","ngModelChange"],["for","admin_name",1,"control-label","required"],["type","text","id","admin_name",1,"form-control",3,"ngModel","ngModelOptions","disabled","ngModelChange"],["for","admin_mobile_number",1,"control-label","required"],["type","number","id","admin_mobile_number",1,"form-control",3,"ngModel","ngModelOptions","disabled","ngModelChange"],[1,"row","justify-content-center","mx-3"],["class","mx-3 btn",3,"click",4,"ngIf"],[1,"mx-3","btn",3,"click"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"form"),r["\u0275\u0275elementStart"](2,"div",1),r["\u0275\u0275elementStart"](3,"div",2),r["\u0275\u0275elementStart"](4,"label",3),r["\u0275\u0275text"](5,"Email"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"input",4),r["\u0275\u0275listener"]("ngModelChange",function(e){return t.adminDetails.email=e}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](7,"div",1),r["\u0275\u0275elementStart"](8,"div",2),r["\u0275\u0275elementStart"](9,"label",5),r["\u0275\u0275text"](10,"Name"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](11,"input",6),r["\u0275\u0275listener"]("ngModelChange",function(e){return t.adminDetails.name=e}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](12,"div",1),r["\u0275\u0275elementStart"](13,"div",2),r["\u0275\u0275elementStart"](14,"label",7),r["\u0275\u0275text"](15,"Mobile"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](16,"input",8),r["\u0275\u0275listener"]("ngModelChange",function(e){return t.adminMobile=e}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](17,"div",9),r["\u0275\u0275template"](18,b,2,0,"button",10),r["\u0275\u0275template"](19,S,2,0,"button",10),r["\u0275\u0275elementStart"](20,"button",11),r["\u0275\u0275listener"]("click",function(){return t.deleteUser()}),r["\u0275\u0275text"](21,"Delete"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](6),r["\u0275\u0275property"]("ngModel",t.adminDetails.email)("ngModelOptions",r["\u0275\u0275pureFunction0"](11,x))("disabled",!t.showCase),r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("ngModel",t.adminDetails.name)("ngModelOptions",r["\u0275\u0275pureFunction0"](12,x))("disabled",!t.showCase),r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("ngModel",t.adminMobile)("ngModelOptions",r["\u0275\u0275pureFunction0"](13,x))("disabled",!t.showCase),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngIf",!t.showCase),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.showCase))},directives:[v.C,v.r,v.s,v.d,v.q,v.t,v.v,m.NgIf],styles:[""]}),e})();const w=["singleAdminModal"];function C(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"app-im-alert",6),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](e.adminError)}}function E(e,t){1&e&&r["\u0275\u0275element"](0,"mat-spinner",7),2&e&&r["\u0275\u0275property"]("diameter",50)}function _(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"tr"),r["\u0275\u0275elementStart"](1,"td",8),r["\u0275\u0275listener"]("click",function(){r["\u0275\u0275restoreView"](e);const n=t.index;return r["\u0275\u0275nextContext"]().onListItemClick(n)}),r["\u0275\u0275text"](2),r["\u0275\u0275pipe"](3,"titlecase"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](r["\u0275\u0275pipeBind1"](3,1,e.name))}}function I(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",9),r["\u0275\u0275elementStart"](1,"div",10),r["\u0275\u0275elementStart"](2,"h2",11),r["\u0275\u0275text"](3,"Admin Details"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"i",12),r["\u0275\u0275listener"]("click",function(){return t.$implicit.dismiss("Cross click")}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](5,"div",13),r["\u0275\u0275elementStart"](6,"app-admin-details",14),r["\u0275\u0275listener"]("refresh_admins",function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().onSaveDataRefreshAdmins(t)})("modalClose",function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().modalClose(t)}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){const e=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](6),r["\u0275\u0275property"]("id",e.selectedid)}}let O=(()=>{class e{constructor(e,t,n,a,l){this.adminServies=e,this.localUserService=t,this.changeDetector=n,this.router=a,this.modalService=l,this.loading=!0,this.allAdminsOfASchoollength=null,this.dtOptions={},this.dtTrigger=new d.a,this.selectedAdmin=new r.EventEmitter,this.loading=!0,this.schoolId=this.localUserService.getUser().belongs_to_school,this.adminTableHead=i.o,this.adminError=i.i}ngOnInit(){this.getData(),this.dtOptions={pagingType:"full",pageLength:10,dom:"Pfrtip",searching:!0,language:{search:"",searchPlaceholder:"Search...",info:"showing _END_ out of _TOTAL_ Admins Found",infoEmpty:" 0 Admins Found"},oLanguage:{oPaginate:{sFirst:"First",sPrevious:"<i class='fa fa-arrow-left' aria-hidden='true'></i>",sNext:"<i class='fa fa-arrow-right' aria-hidden='true'></i>",sLast:"Last"}}}}onListItemClick(e){this.selectedid=this.allAdminsOfASchool[e]._id,console.log(this.selectedid),this.open(this.singleAdminModal)}getData(){this.adminServies.getAdmins(this.schoolId).subscribe(e=>{this.allAdminsOfASchool=e.filter(e=>"admin"==e.role),this.allAdminsOfASchoollength=this.allAdminsOfASchool.length,this.loading=!1,this.dtTrigger.next()})}open(e){this.modalService.open(e,{ariaLabelledBy:"New Class",windowClass:"admin-details",centered:!0})}modalClose(e){console.warn("modal close")}onSaveDataRefreshAdmins(e){!0===e&&this.getData()}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](c.a),r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](r.ChangeDetectorRef),r["\u0275\u0275directiveInject"](a.c),r["\u0275\u0275directiveInject"](l.d))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-admin-list"]],viewQuery:function(e,t){var n;1&e&&(r["\u0275\u0275viewQuery"](s.a,!0),r["\u0275\u0275viewQuery"](w,!0)),2&e&&(r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.dtElement=n.first),r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.singleAdminModal=n.first))},inputs:{refresh_admins:"refresh_admins"},outputs:{selectedAdmin:"selectedAdmin"},decls:12,vars:6,consts:[["type","danger",4,"ngIf"],["class","loading",3,"diameter",4,"ngIf"],["datatable","",1,"table",3,"dtOptions","dtTrigger"],[1,"text-center","text-white","m-0"],[4,"ngFor","ngForOf"],["singleAdminModal",""],["type","danger"],[1,"loading",3,"diameter"],[2,"color","black","cursor","pointer",3,"click"],[1,"modal_control"],[1,"modal-header","_text_color"],["id","modal-basic-title",1,"modal-title","_text_color"],["aria-hidden","true",1,"fa","fa-times","_text_color",3,"click"],[1,"modal-body"],[3,"id","refresh_admins","modalClose"]],template:function(e,t){1&e&&(r["\u0275\u0275template"](0,C,2,1,"app-im-alert",0),r["\u0275\u0275template"](1,E,1,1,"mat-spinner",1),r["\u0275\u0275elementStart"](2,"table",2),r["\u0275\u0275elementStart"](3,"thead"),r["\u0275\u0275elementStart"](4,"tr"),r["\u0275\u0275elementStart"](5,"th"),r["\u0275\u0275elementStart"](6,"h2",3),r["\u0275\u0275text"](7),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](8,"tbody"),r["\u0275\u0275template"](9,_,4,3,"tr",4),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](10,I,7,1,"ng-template",null,5,r["\u0275\u0275templateRefExtractor"])),2&e&&(r["\u0275\u0275property"]("ngIf",0==t.allAdminsOfASchoollength),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",1==t.loading&&null==t.allAdminsOfASchoollength),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("dtOptions",t.dtOptions)("dtTrigger",t.dtTrigger),r["\u0275\u0275advance"](5),r["\u0275\u0275textInterpolate"](t.adminTableHead),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngForOf",t.allAdminsOfASchool))},directives:[m.NgIf,s.a,m.NgForOf,p.a,h.b,y],pipes:[m.TitleCasePipe],styles:[".admin-details .modal-content{border:3px solid #3a8af6!important;border-radius:25px!important}@media only screen and (max-width:600px){  .admin-details .modal-dialog{width:100%;margin:0!important;border:none!important}  .modal-open .modal{overflow:hidden!important}.modal_control[_ngcontent-%COMP%]{height:100vh}  .modal-backdrop.show{opacity:0!important}  .admin-details .modal-content{border:0!important;border-radius:0!important}.students[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 100px)!important}}"]}),e})();var k=n("kmDb");function A(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",5),r["\u0275\u0275elementStart"](1,"div",6),r["\u0275\u0275element"](2,"div",7),r["\u0275\u0275elementStart"](3,"div",8),r["\u0275\u0275elementStart"](4,"h2",9),r["\u0275\u0275text"](5),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"div",10),r["\u0275\u0275elementStart"](7,"i",11),r["\u0275\u0275listener"]("click",function(){return t.$implicit.dismiss("Cross click")}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](8,"hr"),r["\u0275\u0275elementStart"](9,"div",12),r["\u0275\u0275elementStart"](10,"app-admin-create",13),r["\u0275\u0275listener"]("refresh_admins",function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().onSaveDataRefreshAdmins(t)}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){const e=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](5),r["\u0275\u0275textInterpolate"](e.adminCreateTitle),r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("schoolId",e.schoolId)}}let P=(()=>{class e{constructor(e,t){this.modalService=e,this.local=t,this.adminCreateTitle=i.g,this.adminAddButton=i.e,this.adminPageTitle=i.l}ngOnInit(){const e=this.local.getUser();console.log(e),this.schoolId=e.belongs_to_school}open(e){this.modalService.open(e,{ariaLabelledBy:"New Class",windowClass:"admin-create",centered:!0})}modalClose(e){console.warn("modal close")}onSaveDataRefreshAdmins(e){console.log(e),this.refresh_admins=e,this.modalService.dismissAll()}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](l.d),r["\u0275\u0275directiveInject"](o.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-admin-page"]],decls:8,vars:1,consts:[[1,"_overall_mat_card_inner","_text_color","admins"],[1,"float",3,"click"],[1,"fa","fa-plus","my-float"],[1,"classListItem",3,"refresh_admins"],["content3",""],[1,"modal_control"],[1,"row","my-3"],[1,"col"],[1,"col","text-center"],["id","modal-basic-title",1,"m-0"],[1,"col","d-flex","justify-content-end","align-items-center"],["aria-hidden","true",1,"fa","fa-times","mr-3",3,"click"],[1,"modal-body"],[3,"schoolId","refresh_admins"]],template:function(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"div"),r["\u0275\u0275elementStart"](2,"a",1),r["\u0275\u0275listener"]("click",function(){r["\u0275\u0275restoreView"](e);const n=r["\u0275\u0275reference"](7);return t.open(n)}),r["\u0275\u0275element"](3,"i",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"div"),r["\u0275\u0275element"](5,"app-admin-list",3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](6,A,11,2,"ng-template",null,4,r["\u0275\u0275templateRefExtractor"])}2&e&&(r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("refresh_admins",t.refresh_admins))},directives:[O,k.a],styles:[".admins[_ngcontent-%COMP%]{margin-top:10px}  .admin-create .modal-content{border:3px solid #3a8af6!important;border-radius:25px!important}@media only screen and (max-width:600px){.admins[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 110px)!important}  .admin-create .modal-dialog{width:100%;margin:0!important;border:none!important}  .modal-open .modal{overflow:hidden!important}.modal_control[_ngcontent-%COMP%]{height:100vh}  .modal-backdrop.show{opacity:0!important}  .admin-create .modal-content{border:0!important;border-radius:0!important}.students[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 100px)!important}}"]}),e})();var M=n("Q4sr");function j(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"app-im-alert",5),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](e.classError)}}function D(e,t){1&e&&r["\u0275\u0275element"](0,"mat-spinner",6),2&e&&r["\u0275\u0275property"]("diameter",50)}function F(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"tr"),r["\u0275\u0275elementStart"](1,"td",7),r["\u0275\u0275text"](2),r["\u0275\u0275pipe"](3,"titlecase"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](r["\u0275\u0275pipeBind1"](3,1,e.name))}}let U=(()=>{class e{constructor(e,t,n,a,r){this.classService=e,this.localUserService=t,this.ref=n,this.router=a,this.modalService=r,this.loading=!0,this.refresh_classes=!1,this.dtOptions={},this.dtTrigger=new d.a,this.classError=i.v,this.classTableHead=i.y}ngOnChanges(){if(1==this.refresh_classes){let e=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([e])})}}ngOnInit(){this.schoolId=this.localUserService.getUser().belongs_to_school,this.getData(),this.dtOptions={pagingType:"full",pageLength:10,dom:"Pfrtip",searching:!0,language:{search:"",searchPlaceholder:"Search...",info:"showing _END_ out of _TOTAL_ Classes Found",infoEmpty:" 0 Classes Found"},oLanguage:{oPaginate:{sFirst:"First",sPrevious:"<i class='fa fa-arrow-left' aria-hidden='true'></i>",sNext:"<i class='fa fa-arrow-right' aria-hidden='true'></i>",sLast:"Last"}}}}getData(){this.classService.getClassesOfoneSchool(this.schoolId).subscribe(e=>{this.classes=e,this.classeslength=e.length,this.loading=!1,this.dtTrigger.next()})}open(e){this.modalService.open(e,{ariaLabelledBy:"New Class",windowClass:"my-class"})}modalClose(e){console.warn("modal close")}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](M.a),r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](r.ChangeDetectorRef),r["\u0275\u0275directiveInject"](a.c),r["\u0275\u0275directiveInject"](l.d))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-classes-list"]],viewQuery:function(e,t){var n;1&e&&r["\u0275\u0275viewQuery"](s.a,!0),2&e&&r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.dtElement=n.first)},inputs:{refresh_classes:"refresh_classes"},features:[r["\u0275\u0275NgOnChangesFeature"]],decls:10,vars:6,consts:[["type","danger",4,"ngIf"],["class","loading",3,"diameter",4,"ngIf"],["datatable","",1,"table","hover",3,"dtOptions","dtTrigger"],[1,"text-center","text-white","m-0"],[4,"ngFor","ngForOf"],["type","danger"],[1,"loading",3,"diameter"],[2,"color","black"]],template:function(e,t){1&e&&(r["\u0275\u0275template"](0,j,2,1,"app-im-alert",0),r["\u0275\u0275template"](1,D,1,1,"mat-spinner",1),r["\u0275\u0275elementStart"](2,"table",2),r["\u0275\u0275elementStart"](3,"thead"),r["\u0275\u0275elementStart"](4,"tr"),r["\u0275\u0275elementStart"](5,"th"),r["\u0275\u0275elementStart"](6,"h2",3),r["\u0275\u0275text"](7),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](8,"tbody"),r["\u0275\u0275template"](9,F,4,3,"tr",4),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275property"]("ngIf",0==t.classeslength),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",1==t.loading&&null==t.classeslength),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("dtOptions",t.dtOptions)("dtTrigger",t.dtTrigger),r["\u0275\u0275advance"](5),r["\u0275\u0275textInterpolate"](t.classTableHead),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngForOf",t.classes))},directives:[m.NgIf,s.a,m.NgForOf,p.a,h.b],pipes:[m.TitleCasePipe],styles:["@media only screen and (max-width:600px){.classes[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 100px)!important}}"]}),e})();var R=n("UpE1");function T(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",5),r["\u0275\u0275elementStart"](1,"div",6),r["\u0275\u0275element"](2,"div",7),r["\u0275\u0275elementStart"](3,"div",8),r["\u0275\u0275elementStart"](4,"h2",9),r["\u0275\u0275text"](5),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"div",10),r["\u0275\u0275elementStart"](7,"i",11),r["\u0275\u0275listener"]("click",function(){return t.$implicit.dismiss("Cross click")}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](8,"hr"),r["\u0275\u0275elementStart"](9,"div",12),r["\u0275\u0275elementStart"](10,"app-classes-create",13),r["\u0275\u0275listener"]("refresh_classes",function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().onSaveDataRefreshClasses(t)}),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){const e=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](5),r["\u0275\u0275textInterpolate"](e.classCreateTitle)}}let L=(()=>{class e{constructor(e){this.modalService=e,this.classAddButton=i.s,this.classesPageTitle=i.A,this.classCreateTitle=i.u}ngOnInit(){}open(e){this.modalService.open(e,{ariaLabelledBy:"New Class",windowClass:"class-create",centered:!0})}modalClose(e){console.warn("modal close")}onSaveDataRefreshClasses(e){this.refresh_classes=e,this.modalService.dismissAll()}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](l.d))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-classes-page"]],decls:8,vars:1,consts:[[1,"_overall_mat_card_inner","_text_color","classes"],[1,"float",3,"click"],[1,"fa","fa-plus","my-float"],[1,"classListItem",3,"refresh_classes"],["content",""],[1,"modal_control"],[1,"row","my-3"],[1,"col"],[1,"col","text-center"],["id","modal-basic-title",1,"m-0"],[1,"col","d-flex","justify-content-end","align-items-center"],["aria-hidden","true",1,"fa","fa-times","mr-3",3,"click"],[1,"modal-body"],[3,"refresh_classes"]],template:function(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"div"),r["\u0275\u0275elementStart"](2,"a",1),r["\u0275\u0275listener"]("click",function(){r["\u0275\u0275restoreView"](e);const n=r["\u0275\u0275reference"](7);return t.open(n)}),r["\u0275\u0275element"](3,"i",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"div"),r["\u0275\u0275element"](5,"app-classes-list",3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](6,T,11,1,"ng-template",null,4,r["\u0275\u0275templateRefExtractor"])}2&e&&(r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("refresh_classes",t.refresh_classes))},directives:[U,R.a],styles:[".classes[_ngcontent-%COMP%]{margin-top:10px}  .class-create .modal-content{border:3px solid #3a8af6!important;border-radius:25px!important}@media only screen and (max-width:600px){.classes[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 110px)!important}  .class-create .modal-dialog{width:100%;margin:0!important;border:none!important}  .modal-open .modal{overflow:hidden!important}.modal_control[_ngcontent-%COMP%]{height:100vh}  .modal-backdrop.show{opacity:0!important}  .class-create .modal-content{border:0!important;border-radius:0!important}.students[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 100px)!important}}"]}),e})();var N=n("AytR");const V=[{tiername:"Free: current Plan",price:0,features:[{featurename:"60 participants per live class",availability:!0},{featurename:"Unlimited Students",availability:!0},{featurename:"Unlimited Schedule class",availability:!0},{featurename:"Online Exams",availability:!1},{featurename:"Remote proctoring",availability:!1},{featurename:"Dedicated Phone Support",availability:!1},{featurename:"Free Feature upgrades",availability:!1},{featurename:"Monthly Status Reports",availability:!1}],buttonStatus:!1},{tiername:"PLUS: Currently Unavailable",price:9,features:[{featurename:"5 Users",availability:!0},{featurename:"50GB Storage",availability:!0},{featurename:"Unlimited Public Projects",availability:!0},{featurename:"Community Access",availability:!0},{featurename:"Unlimited Private Projects",availability:!0},{featurename:"Dedicated Phone Support",availability:!0},{featurename:"Free Subdomain",availability:!0},{featurename:"Monthly Status Reports",availability:!1}],buttonStatus:!0},{tiername:"PRO: Currently Unavailable",price:49,features:[{featurename:"Unlimited Users",availability:!0},{featurename:"150GB Storage",availability:!0},{featurename:"Unlimited Public Projects",availability:!0},{featurename:"Community Access",availability:!0},{featurename:"Unlimited Private Projects",availability:!0},{featurename:"Dedicated Phone Support",availability:!0},{featurename:"Unlimited Free Subdomains",availability:!0},{featurename:"Monthly Status Reports",availability:!0}],buttonStatus:!0}];var B=n("f4AX");let z=(()=>{class e{constructor(){}get nativeWindow(){return window}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function $(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"div"),r["\u0275\u0275elementStart"](1,"span",15),r["\u0275\u0275element"](2,"fa-icon",16),r["\u0275\u0275elementEnd"](),r["\u0275\u0275text"](3),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"]().$implicit,t=r["\u0275\u0275nextContext"](2);r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("icon",t.faCheck),r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate1"]("",e.featurename," ")}}function q(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"span",15),r["\u0275\u0275element"](1,"fa-icon",16),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](2,"div",17),r["\u0275\u0275text"](3),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"]().$implicit,t=r["\u0275\u0275nextContext"](2);r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("icon",t.faTimes),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](e.featurename)}}function Q(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"li"),r["\u0275\u0275template"](1,$,4,2,"div",13),r["\u0275\u0275template"](2,q,4,2,"ng-template",null,14,r["\u0275\u0275templateRefExtractor"]),r["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=r["\u0275\u0275reference"](3);r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",e.availability)("ngIfElse",n)}}function H(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"button",18),r["\u0275\u0275listener"]("click",function(){r["\u0275\u0275restoreView"](e);const t=r["\u0275\u0275nextContext"]().index;return r["\u0275\u0275nextContext"]().buyNow(t)}),r["\u0275\u0275text"](1,"Buy Now"),r["\u0275\u0275elementEnd"]()}}function W(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"div",3),r["\u0275\u0275elementStart"](1,"div",4),r["\u0275\u0275elementStart"](2,"div",5),r["\u0275\u0275elementStart"](3,"h5",6),r["\u0275\u0275text"](4),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](5,"div",7),r["\u0275\u0275elementStart"](6,"span"),r["\u0275\u0275text"](7,"\u20b9"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](8,"h6",8),r["\u0275\u0275text"](9),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](10,"span",9),r["\u0275\u0275text"](11,"/month"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](12,"hr"),r["\u0275\u0275elementStart"](13,"ul",10),r["\u0275\u0275template"](14,Q,4,2,"li",11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](15,H,2,0,"button",12),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=t.index,a=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](4),r["\u0275\u0275textInterpolate"](e.tiername),r["\u0275\u0275advance"](5),r["\u0275\u0275textInterpolate"](a.rateInRs[n]),r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("ngForOf",e.features),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",a.plan!==n+1)}}let X=(()=>{class e{constructor(e,t,n){this.localUserService=e,this.userService=t,this.winRef=n,this.title="componentapp",this.cards=V,this.status=[],this.isloading=null,this.rateInRs=[100,200,300],this.rates=[1e4,2e4,3e4],this.plan=this.localUserService.getUser().subscriptionPlan}ngOnInit(){}buyNow(e){this.userService.payForSubscription({amount:this.rates[e]}).subscribe(t=>{console.log("response from data",t),t&&this.payWithRazor(t.id,e)})}payWithRazor(e,t){const n={key:N.a.razKey,amount:125500,currency:"INR",name:"Kthree",description:"Subscription plan",image:"./assets/logo.png",order_id:e,modal:{escape:!1},notes:{},theme:{color:"#0c238a"},handler:(e,t)=>{n.response=e,console.log(e),e.razorpay_payment_id&&console.log("From Insight Mirror : Success"),console.log(n)}};n.modal.ondismiss=()=>{console.log("Transaction cancelled.")},new this.winRef.nativeWindow.Razorpay(n).open()}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](B.a),r["\u0275\u0275directiveInject"](z))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-subscription"]],decls:3,vars:1,consts:[[1,"sub_page"],[1,"row"],["class","col-lg-4",4,"ngFor","ngForOf"],[1,"col-lg-4"],[1,"card","mb-lg-0"],[1,"card-body"],[1,"card-title","text-muted","text-uppercase","text-center"],[1,"row",2,"display","flex","justify-content","center"],[1,"card-price",2,"font-size","30px"],[1,"period"],[1,"fa-ul"],[4,"ngFor","ngForOf"],["href","#","class","btn btn-block btn-primary text-uppercase",3,"click",4,"ngIf"],[4,"ngIf","ngIfElse"],["notAvail",""],[1,"fa-li"],[3,"icon"],[1,"text-muted"],["href","#",1,"btn","btn-block","btn-primary","text-uppercase",3,"click"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"div",1),r["\u0275\u0275template"](2,W,16,4,"div",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngForOf",t.cards))},directives:[m.NgForOf,m.NgIf],styles:[".card[_ngcontent-%COMP%]{overflow:hidden;margin:15px}.sub_page[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 210px)!important}@media only screen and (max-width:600px){.card[_ngcontent-%COMP%]{margin-bottom:5px}.sub_page[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 150px)!important}}"]}),e})();var G=n("4HcB"),K=n("Rs8g"),J=n("wZkO");function Z(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"a",4,5),r["\u0275\u0275text"](2),r["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=r["\u0275\u0275reference"](1);r["\u0275\u0275property"]("active",n.isActive)("routerLink",e.path),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate1"](" ",e.label," ")}}const Y=[{path:"",children:[{path:"page",component:(()=>{class e{constructor(e,t,n,a,i,r){this.route=e,this.router=t,this.changeDetector=n,this.localService=a,this.schoolService=i,this.jwtService=r,this.isViewInitialized=!1,this.navLinks=[],this.loggedInUser=this.localService.getUser(),this.role=this.loggedInUser.role}ngOnInit(){this.navLinks=this.route.routeConfig&&this.route.routeConfig.children?this.buildNavItems(this.route.routeConfig.children):[]}ngAfterViewInit(){this.isViewInitialized=!0,this.changeDetector.detectChanges()}buildNavItems(e){return e.filter(e=>e.data).map(({path:e="",data:t})=>({path:e,label:t.label,icon:t.icon}))}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](a.a),r["\u0275\u0275directiveInject"](a.c),r["\u0275\u0275directiveInject"](r.ChangeDetectorRef),r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](G.a),r["\u0275\u0275directiveInject"](K.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-settings"]],decls:5,vars:1,consts:[[1,"settings_page"],["mat-tab-nav-bar","",1,"_text_color"],["mat-tab-link","","routerLinkActive","","class","_text_color",3,"active","routerLink",4,"ngFor","ngForOf"],[1,"out_let"],["mat-tab-link","","routerLinkActive","",1,"_text_color",3,"active","routerLink"],["rla","routerLinkActive"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"nav",1),r["\u0275\u0275template"](2,Z,3,3,"a",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](3,"div",3),r["\u0275\u0275element"](4,"router-outlet"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngForOf",t.navLinks))},directives:[J.e,m.NgForOf,a.g,a.e,J.d,a.d],styles:[".sub-menu{background-color:bisque;width:10%;height:100%}.mat-tab-label{min-width:25px!important;padding:5px;background-color:initial}.mat-tab-nav-bar,nav{z-index:0!important}:host ::ng-deep .mat-tab-body-wrapper,:host ::ng-deep .mat-tab-header{position:fixed!important}@media only screen and (max-width:600px){.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{background-color:#fff}.mat-tab-link:last-child{display:none!important}}"],encapsulation:2}),e})(),children:[{path:"",redirectTo:"admins",pathMatch:"full"},{path:"admins",data:{label:i.Cb},component:P},{path:"student",loadChildren:()=>Promise.all([n.e(1),n.e(0),n.e(14)]).then(n.bind(null,"ejW6")).then(e=>e.StudentModule),data:{label:i.Db}},{path:"teacher",data:{label:i.Eb},loadChildren:()=>Promise.all([n.e(1),n.e(0),n.e(7)]).then(n.bind(null,"4+hN")).then(e=>e.teacherModule)},{path:"classes",data:{label:i.Fb},component:L},{path:"subscription",data:{label:i.Hb},component:X}]}]}];let ee=(()=>{class e{}return e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.f.forChild(Y)],a.f]}),e})()}}]);