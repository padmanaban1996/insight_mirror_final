(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"4+hN":function(e,t,n){"use strict";n.r(t),n.d(t,"teacherModule",function(){return $});var a=n("ofXK"),r=n("3Pt+"),l=n("Vxd/"),i=n("tyNb"),s=n("ecC8"),o=n("l207"),c=n("r2HY"),d=n("fXoL"),h=n("gvIg"),m=n("Q4sr"),p=n("RKuE"),u=n("dNgK"),g=n("4HcB"),f=n("OrhT"),v=n("NFeN"),b=n("ZOsW");function S(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"div",27),d["\u0275\u0275text"](1),d["\u0275\u0275elementEnd"]()),2&e){const e=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275textInterpolate"](e.pwdConfirmError)}}function _(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"div",27),d["\u0275\u0275text"](1),d["\u0275\u0275elementEnd"]()),2&e){const e=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275textInterpolate"](e.emailError)}}const C=function(){return{standalone:!0}};function E(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"div",4),d["\u0275\u0275elementStart"](1,"ng-select",28),d["\u0275\u0275listener"]("ngModelChange",function(t){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275nextContext"]().classTeacherOfClassSelected=t}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()}if(2&e){const e=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("items",e.classTeacherRequired)("selectableGroup",!0)("closeOnSelect",!1)("ngModel",e.classTeacherOfClassSelected)("ngModelOptions",d["\u0275\u0275pureFunction0"](5,C))}}let x=(()=>{class e{constructor(e,t,n,a,r,l,i){this.formBuilder=e,this.localUserService=t,this.classesServie=n,this.teacherService=a,this.matSnackBar=r,this.schoolService=l,this.router=i,this.classesList=[],this.classTeacherRequired=[],this.classesSelected=[],this.subjectsSelected=[],this.selected_Id="",this.options=!1,this.flag=!1,this.subjects=["Maths","Chemistry","Physics","Biology","Geography","Computer","English","History"],this.p_hide=!0,this.cp_hide=!0,this.role="teacher",this.schoolId=this.localUserService.getUser().belongs_to_school,this.schoolService.getSingleSchoolDetails(this.schoolId).subscribe(e=>{this.subjectsList=e.subjects,this.subscriptionPlan=this.localUserService.getUser().subscriptionPlan}),this.options=!1,this.teacherCreateTitle=o.jc,this.teacherNameLabel=o.oc,this.teacherEmailLabel=o.kc,this.teacherPasswordLabel=o.qc,this.teacherCPasswordLabel=o.gc,this.teacherClassLabel=o.hc,this.teacherClassesPlaceholder=o.ic,this.classTeacherofLabel=o.z,this.subjectsLabel=o.bc,this.subjectsPlaceHolder=o.cc,this.teacherMobileNUmber=o.nc,this.teacherSubmitButton=o.rc,this.emailError=o.D,this.pwdConfirmError=o.Y}ngOnInit(){this.initForm(),this.classesServie.getClassesOfoneSchool(this.schoolId).subscribe(e=>{this.classesList=e,e.forEach(e=>{null==e.classTeacher&&this.classTeacherRequired.push(e)})})}initForm(){this.teachercreateform=this.formBuilder.group({name:["",r.A.required],email:["",[r.A.required,r.A.email,r.A.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],password:["",[r.A.required]],confirm_password:["",[r.A.required]],belongs_to_school:[""],subscriptionPlan:[""],_teacher:this.formBuilder.group({belongs_to_class:[""],subjects:[""],is_class_teacher:[""],class_teacher_of:[""],mobile_number:["",[r.A.required,r.A.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]})},{validator:Object(c.a)("password","confirm_password")}),this.teachercreateform.get("email").valueChanges.subscribe(e=>{this.teachercreateform.get("email").setValue(e.toLowerCase(),{emitEvent:!1})})}get f(){return this.teachercreateform.controls}get s(){return this.teachercreateform.controls._teacher.controls}passwordEye(){this.p_hide=!this.p_hide}confirmpasswordEye(){this.cp_hide=!this.cp_hide}onSubmit(){this.flag=!0;const e=this.teachercreateform.value;e.role=this.role,e.belongs_to_school=this.schoolId,e._teacher.belongs_to_class=this.classesSelected,e._teacher.is_class_teacher=this.options,e._teacher.is_class_teacher=this.options,e._teacher.subjects=this.subjectsSelected,e.subscriptionPlan=this.subscriptionPlan,e._teacher.class_teacher_of=this.options?this.classTeacherOfClassSelected:null,this.teacherService.createTeacherUser(e).subscribe(e=>{e._id?(this.matSnackBar.open("Teacher  create","success",{duration:2e3}),this.reset(),this.flag=!1,this.router.navigate(["livequiz/settings/page/teacher/list"])):this.matSnackBar.open("Something wrong","failed",{duration:2e3})})}reset(){this.teachercreateform.reset()}}return e.\u0275fac=function(t){return new(t||e)(d["\u0275\u0275directiveInject"](r.g),d["\u0275\u0275directiveInject"](h.a),d["\u0275\u0275directiveInject"](m.a),d["\u0275\u0275directiveInject"](p.a),d["\u0275\u0275directiveInject"](u.a),d["\u0275\u0275directiveInject"](g.a),d["\u0275\u0275directiveInject"](i.c))},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-teacher-create"]],decls:54,vars:34,consts:[[1,"main-div","_text_color"],[3,"formGroup"],[2,"text-align","center"],["class","alert alert-danger",4,"ngIf"],[1,"form-group"],[1,"col-sm-12"],["for","name",1,"control-label","required"],["type","text","id","name","formControlName","name","required","","appCheckFormFieldValidity","",1,"form-control"],["for","email",1,"control-label","required"],["type","email","id","email","formControlName","email","required","","appCheckFormFieldValidity","",1,"form-control"],[1,"input_img",3,"click"],["for","password",1,"control-label","required"],["type","password","id","password","formControlName","password","required","","appCheckFormFieldValidity","",1,"form-control",3,"type"],[1,"input_img_confirm",3,"click"],["for","text",1,"control-label","required"],["type","password","id","text","formControlName","confirm_password","required","","appCheckFormFieldValidity","",1,"form-control",3,"type"],["formGroupName","_teacher"],["for","number",1,"control-label","required"],["bindLabel","name","bindValue","_id","appendTo","body",3,"items","multiple","placeholder","selectableGroup","closeOnSelect","ngModel","ngModelOptions","ngModelChange"],[1,"form-group",2,"margin","15px"],["formControlName","is_class_teacher","type","checkbox",3,"ngModel","ngModelChange"],["for","number",1,"control-label","required","m-1"],["class","form-group",4,"ngIf"],["appendTo","body",3,"items","placeholder","closeOnSelect","ngModel","ngModelOptions","ngModelChange"],["type","number","id","number","formControlName","mobile_number","required","","appCheckFormFieldValidity","",1,"form-control"],[1,"bt"],[1,"btn",3,"disabled","click"],[1,"alert","alert-danger"],["bindLabel","name","bindValue","_id","placeholder","click to select the class","appendTo","body",2,"margin","15px",3,"items","selectableGroup","closeOnSelect","ngModel","ngModelOptions","ngModelChange"]],template:function(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"div",0),d["\u0275\u0275elementStart"](1,"form",1),d["\u0275\u0275elementStart"](2,"h1",2),d["\u0275\u0275text"](3),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](4,S,2,1,"div",3),d["\u0275\u0275template"](5,_,2,1,"div",3),d["\u0275\u0275elementStart"](6,"div",4),d["\u0275\u0275elementStart"](7,"div",5),d["\u0275\u0275elementStart"](8,"label",6),d["\u0275\u0275text"](9),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](10,"input",7),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](11,"div",4),d["\u0275\u0275elementStart"](12,"div",5),d["\u0275\u0275elementStart"](13,"label",8),d["\u0275\u0275text"](14),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](15,"input",9),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](16,"div",4),d["\u0275\u0275elementStart"](17,"div",5),d["\u0275\u0275elementStart"](18,"mat-icon",10),d["\u0275\u0275listener"]("click",function(){return t.passwordEye()}),d["\u0275\u0275text"](19),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](20,"label",11),d["\u0275\u0275text"](21),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](22,"input",12),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](23,"div",4),d["\u0275\u0275elementStart"](24,"div",5),d["\u0275\u0275elementStart"](25,"mat-icon",13),d["\u0275\u0275listener"]("click",function(){return t.confirmpasswordEye()}),d["\u0275\u0275text"](26),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](27,"label",14),d["\u0275\u0275text"](28),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](29,"input",15),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](30,"div",16),d["\u0275\u0275elementStart"](31,"div",4),d["\u0275\u0275elementStart"](32,"div",5),d["\u0275\u0275elementStart"](33,"label",17),d["\u0275\u0275text"](34),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](35,"ng-select",18),d["\u0275\u0275listener"]("ngModelChange",function(e){return t.classesSelected=e}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](36,"div",19),d["\u0275\u0275elementStart"](37,"input",20),d["\u0275\u0275listener"]("ngModelChange",function(e){return t.options=e}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](38,"label",21),d["\u0275\u0275text"](39),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](40,E,2,6,"div",22),d["\u0275\u0275elementStart"](41,"div",4),d["\u0275\u0275elementStart"](42,"div",5),d["\u0275\u0275elementStart"](43,"label",17),d["\u0275\u0275text"](44),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](45,"ng-select",23),d["\u0275\u0275listener"]("ngModelChange",function(e){return t.subjectsSelected=e}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](46,"div",4),d["\u0275\u0275elementStart"](47,"div",5),d["\u0275\u0275elementStart"](48,"label",17),d["\u0275\u0275text"](49),d["\u0275\u0275elementEnd"](),d["\u0275\u0275element"](50,"input",24),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](51,"div",25),d["\u0275\u0275elementStart"](52,"button",26),d["\u0275\u0275listener"]("click",function(){return t.onSubmit()}),d["\u0275\u0275text"](53),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()),2&e&&(d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("formGroup",t.teachercreateform),d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate"](t.teacherCreateTitle),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.f.confirm_password.invalid&&t.f.confirm_password.errors.confirmedValidator),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.f.email.invalid&&t.f.email.errors.pattern),d["\u0275\u0275advance"](4),d["\u0275\u0275textInterpolate"](t.teacherNameLabel),d["\u0275\u0275advance"](5),d["\u0275\u0275textInterpolate"](t.teacherEmailLabel),d["\u0275\u0275advance"](5),d["\u0275\u0275textInterpolate1"](" ",t.p_hide?"visibility_off":"visibility"," "),d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate"](t.teacherPasswordLabel),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("type",t.p_hide?"password":"text"),d["\u0275\u0275advance"](4),d["\u0275\u0275textInterpolate1"](" ",t.cp_hide?"visibility_off":"visibility"," "),d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate"](t.teacherCPasswordLabel),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("type",t.cp_hide?"password":"text"),d["\u0275\u0275advance"](5),d["\u0275\u0275textInterpolate"](t.teacherClassLabel),d["\u0275\u0275advance"](1),d["\u0275\u0275propertyInterpolate"]("placeholder",t.teacherClassesPlaceholder),d["\u0275\u0275property"]("items",t.classesList)("multiple",!0)("selectableGroup",!0)("closeOnSelect",!1)("ngModel",t.classesSelected)("ngModelOptions",d["\u0275\u0275pureFunction0"](32,C)),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("ngModel",t.options),d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate"](t.classTeacherofLabel),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.options),d["\u0275\u0275advance"](4),d["\u0275\u0275textInterpolate"](t.subjectsLabel),d["\u0275\u0275advance"](1),d["\u0275\u0275propertyInterpolate"]("placeholder",t.subjectsPlaceHolder),d["\u0275\u0275property"]("items",t.subjects)("closeOnSelect",!0)("ngModel",t.subjectsSelected)("ngModelOptions",d["\u0275\u0275pureFunction0"](33,C)),d["\u0275\u0275advance"](4),d["\u0275\u0275textInterpolate"](t.teacherMobileNUmber),d["\u0275\u0275advance"](3),d["\u0275\u0275property"]("disabled",t.teachercreateform.invalid||t.flag),d["\u0275\u0275advance"](1),d["\u0275\u0275textInterpolate"](t.teacherSubmitButton))},directives:[r.C,r.r,r.k,a.NgIf,r.d,r.q,r.i,r.y,f.a,v.a,r.l,b.a,r.t,r.a,r.v],styles:[".main-div[_ngcontent-%COMP%]{display:flex;justify-content:center;overflow:scroll;overflow-x:hidden;height:calc(100vh - 150px)!important}form[_ngcontent-%COMP%]{width:800px}.bt[_ngcontent-%COMP%]{text-align:center}@media only screen and (max-width:600px){.main-div[_ngcontent-%COMP%]{height:auto;margin:0;left:0}.main-div[_ngcontent-%COMP%], form[_ngcontent-%COMP%]{width:100%}}@media only screen and (min-width:1200px) and (max-width:1440px){.main-div[_ngcontent-%COMP%]{height:auto;margin:0;left:0}.main-div[_ngcontent-%COMP%], form[_ngcontent-%COMP%]{width:100%}}"]}),e})();var w=n("1kSV"),y=n("njyG"),I=n("XNiG"),M=n("Xa2L"),k=n("zTjc"),T=n("NpuA"),O=n("tk/3");let j=(()=>{class e{constructor(e,t,n,a,r,l,i){this.fb=e,this.httpClient=t,this.teacherService=n,this.router=a,this.localUserService=r,this.eachClassService=l,this.matSnackBar=i,this.teachers=[],this.schoolId="",this.templateDownloaded=!1,this.teachersExcelData=[],this.selectedClassId=null,this.currentSubscriptionPlan=null,this.belongsToClass=[],this.close_Teacher_upload_modal=new d.EventEmitter,this.schoolId=this.localUserService.getUser().belongs_to_school,this.currentSubscriptionPlan=this.localUserService.getUser().subscriptionPlan,this.uploadText=o.xc,this.downloadButton=o.C,this.saveButton=o.qb}ngOnInit(){this.eachClassService.getClassesOfoneSchool(this.schoolId).subscribe(e=>{this.classes=e,console.log("each class data",e)}),this.uploadForm=this.fb.group({uploadteachers:[""]})}classListItemClick(e){console.log("selected value",this.classes[e]),this.selectedClassId=this.classes[e]._id,this.selectedClassname=this.classes[e].name}downloadExcelFile(){let e=document.createElement("a");e.download="teachers_upload.csv",e.href=o.uc,e.click(),this.templateDownloaded=!0}onFileSelect(e){if(e.target.files.length>0){const t=e.target.files[0];this.uploadForm.get("uploadteachers").setValue(t),T.parse(t,{header:!0,skipEmptyLines:!0,complete:(e,t)=>{console.log("upload data ",e.data),this.teachersExcelData=e.data,this.teachersExcelData.forEach(e=>{const t={};t.belongs_to_school=this.schoolId,t.name=e.name,t.email=e.email,t.password=e.password,t._teacher={},t._teacher.is_class_teacher="true"===e.is_class_teacher.toLowerCase(),e.belongs_to_class.split(",").forEach(e=>{for(let t=0;t<this.classes.length;t++)this.classes[t].name==e&&(this.belongsToClass.push(this.classes[t]._id),console.log("classes",this.classes[t]._id))});for(let n=0;n<this.classes.length;n++)this.classes[n].name==e.class_teacher_of&&(this.ClassTeacherOf=this.classes[n]._id,console.log("class teacher of",this.ClassTeacherOf));t._teacher.belongs_to_class=this.belongsToClass,t._teacher.class_teacher_of=this.ClassTeacherOf,t._teacher.mobile_number=e.mobile_number,t.role="teacher",t.subscriptionPlan=this.teachers.push(t)})}})}}onSubmit(){console.log("teacher on submit",this.teachers),this.teacherService.saveManyTeachers(this.teachers).subscribe(e=>{console.log("response is",e),this.matSnackBar.open("Teacher upload","success",{duration:1e3}),this.close_Teacher_upload_modal.emit(!0),this.router.navigate(["livequiz/settings/page/teacher/list"])})}}return e.\u0275fac=function(t){return new(t||e)(d["\u0275\u0275directiveInject"](r.g),d["\u0275\u0275directiveInject"](O.HttpClient),d["\u0275\u0275directiveInject"](p.a),d["\u0275\u0275directiveInject"](i.c),d["\u0275\u0275directiveInject"](h.a),d["\u0275\u0275directiveInject"](m.a),d["\u0275\u0275directiveInject"](u.a))},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-upload-teacher"]],outputs:{close_Teacher_upload_modal:"close_Teacher_upload_modal"},decls:18,vars:4,consts:[[1,"col","justify-content-center","text-center"],[1,"downloadExcelFile"],[1,"btn",3,"click"],[1,"row","justify-content-center",2,"text-align","center"],[1,"pl-2"],[1,"pt-2","download-teacher","justify-content-end","pl-2",3,"formGroup","ngSubmit"],[1,"dwnld-input",2,"width","200px","display","block"],["width","2em","height","2em","viewBox","0 0 19 19","fill","currentColor","xmlns","http://www.w3.org/2000/svg",1,"bi","bi-upload"],["fill-rule","evenodd","d","M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"],["fill-rule","evenodd","d","M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"],["type","file","id","fileDropRef","name","uploadteachers",3,"change"],["fileDropRef",""],["type","submit",1,"btn","mt-3"]],template:function(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"div",0),d["\u0275\u0275elementStart"](1,"div",1),d["\u0275\u0275elementStart"](2,"div"),d["\u0275\u0275elementStart"](3,"p"),d["\u0275\u0275text"](4),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](5,"button",2),d["\u0275\u0275listener"]("click",function(){return t.downloadExcelFile()}),d["\u0275\u0275text"](6),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](7,"div",3),d["\u0275\u0275elementStart"](8,"div",4),d["\u0275\u0275elementStart"](9,"form",5),d["\u0275\u0275listener"]("ngSubmit",function(){return t.onSubmit()}),d["\u0275\u0275elementStart"](10,"div",6),d["\u0275\u0275namespaceSVG"](),d["\u0275\u0275elementStart"](11,"svg",7),d["\u0275\u0275element"](12,"path",8),d["\u0275\u0275element"](13,"path",9),d["\u0275\u0275elementEnd"](),d["\u0275\u0275namespaceHTML"](),d["\u0275\u0275elementStart"](14,"input",10,11),d["\u0275\u0275listener"]("change",function(e){return t.onFileSelect(e)}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](16,"button",12),d["\u0275\u0275text"](17),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()),2&e&&(d["\u0275\u0275advance"](4),d["\u0275\u0275textInterpolate"](t.uploadText),d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate"](t.downloadButton),d["\u0275\u0275advance"](3),d["\u0275\u0275property"]("formGroup",t.uploadForm),d["\u0275\u0275advance"](8),d["\u0275\u0275textInterpolate"](t.saveButton))},directives:[r.C,r.r,r.k],styles:[""]}),e})();var P=n("9svf"),L=n("7dP1");function q(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"button",11),d["\u0275\u0275listener"]("click",function(){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275nextContext"]().editUser()}),d["\u0275\u0275text"](1,"Edit"),d["\u0275\u0275elementEnd"]()}}function F(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"button",11),d["\u0275\u0275listener"]("click",function(){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275nextContext"]().updateUser()}),d["\u0275\u0275text"](1,"Update"),d["\u0275\u0275elementEnd"]()}}const D=function(){return{standalone:!0}};let N=(()=>{class e{constructor(e,t,n,a,r,l){this.teacherService=e,this.confirmationDialogService=t,this.modalService=n,this.authService=a,this.matSnackBar=r,this.router=l,this.teacherDetails=[],this.showCase=!1}ngOnInit(){console.log(this.id),this.getSingleteacherDetails(this.id)}getSingleteacherDetails(e){this.teacherService.getSingleTeacher(e).subscribe(e=>{console.log(e),this.teacherDetails=e,this.teacherMobile=this.teacherDetails._teacher.mobile_number})}editUser(){this.showCase=!0}deleteUser(){this.confirmationDialogService.confirm("Please confirm..",`Do you really want to delete ${this.teacherDetails.name} ?`).then(e=>{e&&(console.log("clicked okay",e),this.authService.deleteSingleUser(this.teacherDetails._id).subscribe(e=>{console.log(e),this.matSnackBar.open(e.message,"success",{duration:2e3,verticalPosition:"top",horizontalPosition:"right"})}),this.modalService.dismissAll(),this.router.navigate(["livequiz/settings/page"]))}).catch(()=>console.log("User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"))}updateUser(){this.teacherDetails._teacher.mobile_number=this.teacherMobile,this.authService.updateUser(this.teacherDetails._id,this.teacherDetails).subscribe(e=>{console.log(e),this.matSnackBar.open(e.message,"success",{duration:2e3,verticalPosition:"top",horizontalPosition:"right"}),this.modalService.dismissAll()},e=>{this.matSnackBar.open(e.error.message,"undo",{duration:2e3,verticalPosition:"top",horizontalPosition:"right"}),this.modalService.dismissAll()})}}return e.\u0275fac=function(t){return new(t||e)(d["\u0275\u0275directiveInject"](p.a),d["\u0275\u0275directiveInject"](P.a),d["\u0275\u0275directiveInject"](w.d),d["\u0275\u0275directiveInject"](L.a),d["\u0275\u0275directiveInject"](u.a),d["\u0275\u0275directiveInject"](i.c))},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-teacher-details"]],inputs:{id:"id"},decls:22,vars:14,consts:[[1,"main-div"],[1,"form-group"],[1,"col-sm-12"],["for","teacher_email",1,"control-label","required"],["type","email","id","teacher_email",1,"form-control",3,"ngModel","ngModelOptions","disabled","ngModelChange"],["for","teacher_name",1,"control-label","required"],["type","text","id","teacher_name",1,"form-control",3,"ngModel","ngModelOptions","disabled","ngModelChange"],["for","teacher_mobile_number",1,"control-label","required"],["type","number","id","teacher_mobile_number",1,"form-control",3,"ngModel","ngModelOptions","disabled","ngModelChange"],[1,"row","justify-content-center","mx-3"],["class","mx-3 btn",3,"click",4,"ngIf"],[1,"mx-3","btn",3,"click"]],template:function(e,t){1&e&&(d["\u0275\u0275elementStart"](0,"div",0),d["\u0275\u0275elementStart"](1,"form"),d["\u0275\u0275elementStart"](2,"div",1),d["\u0275\u0275elementStart"](3,"div",2),d["\u0275\u0275elementStart"](4,"label",3),d["\u0275\u0275text"](5,"Email"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](6,"input",4),d["\u0275\u0275listener"]("ngModelChange",function(e){return t.teacherDetails.email=e}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](7,"div",1),d["\u0275\u0275elementStart"](8,"div",2),d["\u0275\u0275elementStart"](9,"label",5),d["\u0275\u0275text"](10,"Name"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](11,"input",6),d["\u0275\u0275listener"]("ngModelChange",function(e){return t.teacherDetails.name=e}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](12,"div",1),d["\u0275\u0275elementStart"](13,"div",2),d["\u0275\u0275elementStart"](14,"label",7),d["\u0275\u0275text"](15,"Mobile"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](16,"input",8),d["\u0275\u0275listener"]("ngModelChange",function(e){return t.teacherMobile=e}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](17,"div",9),d["\u0275\u0275template"](18,q,2,0,"button",10),d["\u0275\u0275template"](19,F,2,0,"button",10),d["\u0275\u0275elementStart"](20,"button",11),d["\u0275\u0275listener"]("click",function(){return t.deleteUser()}),d["\u0275\u0275text"](21,"Delete"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()),2&e&&(d["\u0275\u0275advance"](6),d["\u0275\u0275property"]("ngModel",t.teacherDetails.email)("ngModelOptions",d["\u0275\u0275pureFunction0"](11,D))("disabled",!t.showCase),d["\u0275\u0275advance"](5),d["\u0275\u0275property"]("ngModel",t.teacherDetails.name)("ngModelOptions",d["\u0275\u0275pureFunction0"](12,D))("disabled",!t.showCase),d["\u0275\u0275advance"](5),d["\u0275\u0275property"]("ngModel",t.teacherMobile)("ngModelOptions",d["\u0275\u0275pureFunction0"](13,D))("disabled",!t.showCase),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("ngIf",!t.showCase),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",t.showCase))},directives:[r.C,r.r,r.s,r.d,r.q,r.t,r.v,a.NgIf],styles:[""]}),e})();const V=["singleteacherModal"];function U(e,t){1&e&&d["\u0275\u0275element"](0,"mat-spinner",12)}function B(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"app-im-alert",13),d["\u0275\u0275text"](1),d["\u0275\u0275elementEnd"]()),2&e){const e=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275textInterpolate"](e.teacherError)}}function A(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"tr"),d["\u0275\u0275elementStart"](1,"td",14),d["\u0275\u0275listener"]("click",function(){d["\u0275\u0275restoreView"](e);const n=t.index;return d["\u0275\u0275nextContext"]().onListItemClick(n)}),d["\u0275\u0275text"](2),d["\u0275\u0275pipe"](3,"titlecase"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;d["\u0275\u0275advance"](2),d["\u0275\u0275textInterpolate1"]("",d["\u0275\u0275pipeBind1"](3,1,e.name)," ")}}function z(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"div",15),d["\u0275\u0275elementStart"](1,"div",16),d["\u0275\u0275elementStart"](2,"h2",17),d["\u0275\u0275text"](3),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](4,"i",18),d["\u0275\u0275listener"]("click",function(){return t.$implicit.dismiss("Cross click")}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](5,"div",19),d["\u0275\u0275elementStart"](6,"app-upload-teacher",20),d["\u0275\u0275listener"]("close_Teacher_upload_modal",function(t){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275nextContext"]().closeteacheruploadmodal(t)}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()}if(2&e){const e=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](3),d["\u0275\u0275textInterpolate"](e.teacheruploadTitle)}}function R(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"div",15),d["\u0275\u0275elementStart"](1,"div",21),d["\u0275\u0275elementStart"](2,"h2",22),d["\u0275\u0275text"](3,"Teacher Details"),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](4,"i",23),d["\u0275\u0275listener"]("click",function(){return t.$implicit.dismiss("Cross click")}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](5,"div",19),d["\u0275\u0275elementStart"](6,"app-teacher-details",24),d["\u0275\u0275listener"]("modalClose",function(t){return d["\u0275\u0275restoreView"](e),d["\u0275\u0275nextContext"]().modalClose(t)}),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()}if(2&e){const e=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](6),d["\u0275\u0275property"]("id",e.selectedid)}}const G=[{path:"",canActivate:[s.a],children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:(()=>{class e{constructor(e,t,n,a){this.router=e,this.teacherservice=t,this.localUserService=n,this.modalService=a,this.closeResult="",this.teacherslength=null,this.quizlists=[],this.dtOptions={},this.dtTrigger=new I.a,this.schoolId=this.localUserService.getUser().belongs_to_school,this.teacherAddButton=o.fc,this.teacherUploadButton=o.tc,this.teacherError=o.lc,this.teacherTableHead=o.sc,this.teacheruploadTitle=o.vc}ngOnInit(){this.getteachers(),this.dtOptions={pagingType:"full",pageLength:10,dom:"Pfrtip",searching:!0,language:{search:"",searchPlaceholder:"Search...",info:"showing _END_ out of _TOTAL_ Teachers Found",infoEmpty:"0 Teachers Found"},oLanguage:{oPaginate:{sFirst:"First",sPrevious:"<i class='fa fa-arrow-left' aria-hidden='true'></i>",sNext:"<i class='fa fa-arrow-right' aria-hidden='true'></i>",sLast:"Last"}}}}getteachers(){this.loading=!0,this.teacherservice.getteachers(this.schoolId).subscribe(e=>{this.teachers=e,this.teacherslength=e.length,this.loading=!1,this.dtTrigger.next()})}onListItemClick(e){this.selectedid=this.teachers[e]._id,console.log(this.selectedid),this.open(this.singleteacherModal)}openAddNewteacher(){this.router.navigate(["livequiz","settings","page","teacher","create"])}open(e){this.modalService.open(e,{ariaLabelledBy:"New Class",windowClass:"teacher-upload",centered:!0}).result.then(e=>{this.closeResult="Closed with: "+e},e=>{this.closeResult="Dismissed "+this.getDismissReason(e)})}closeteacheruploadmodal(e){this.close_Teacher_upload_modal=e,console.log(e),1==this.close_Teacher_upload_modal&&(console.log("changeDetected..."),this.modalService.dismissAll())}modalClose(e){console.warn("modal close")}getDismissReason(e){return e===w.a.ESC?"by pressing ESC":e===w.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: "+e}}return e.\u0275fac=function(t){return new(t||e)(d["\u0275\u0275directiveInject"](i.c),d["\u0275\u0275directiveInject"](p.a),d["\u0275\u0275directiveInject"](h.a),d["\u0275\u0275directiveInject"](w.d))},e.\u0275cmp=d["\u0275\u0275defineComponent"]({type:e,selectors:[["app-teacher-list"]],viewQuery:function(e,t){var n;1&e&&(d["\u0275\u0275viewQuery"](y.a,!0),d["\u0275\u0275viewQuery"](V,!0)),2&e&&(d["\u0275\u0275queryRefresh"](n=d["\u0275\u0275loadQuery"]())&&(t.dtElement=n.first),d["\u0275\u0275queryRefresh"](n=d["\u0275\u0275loadQuery"]())&&(t.singleteacherModal=n.first))},inputs:{quizlists:"quizlists"},decls:21,vars:6,consts:[[1,"_text_color","teachers"],[1,"float",3,"click"],[1,"fa","fa-plus","my-float"],[1,"float-upload",3,"click"],[1,"fa","fa-upload","my-float"],["class","loading",4,"ngIf"],["type","danger",4,"ngIf"],["datatable","",1,"table",3,"dtOptions","dtTrigger"],[1,"text-center","text-white","m-0"],[4,"ngFor","ngForOf"],["content",""],["singleteacherModal",""],[1,"loading"],["type","danger"],[2,"color","black","cursor","pointer",3,"click"],[1,"modal_control"],[1,"modal-header"],["id","modal-basic-title",1,"modal-title","w-100","text-center"],["aria-hidden","true",1,"fa","fa-times",3,"click"],[1,"modal-body"],[3,"close_Teacher_upload_modal"],[1,"modal-header","_text_color"],["id","modal-basic-title",1,"modal-title","_text_color"],["aria-hidden","true",1,"fa","fa-times","_text_color",3,"click"],[3,"id","modalClose"]],template:function(e,t){if(1&e){const e=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"div",0),d["\u0275\u0275elementStart"](1,"div"),d["\u0275\u0275elementStart"](2,"a",1),d["\u0275\u0275listener"]("click",function(){return t.openAddNewteacher()}),d["\u0275\u0275element"](3,"i",2),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](4,"div"),d["\u0275\u0275elementStart"](5,"a",3),d["\u0275\u0275listener"]("click",function(){d["\u0275\u0275restoreView"](e);const n=d["\u0275\u0275reference"](18);return t.open(n)}),d["\u0275\u0275element"](6,"i",4),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](7,U,1,0,"mat-spinner",5),d["\u0275\u0275template"](8,B,2,1,"app-im-alert",6),d["\u0275\u0275elementStart"](9,"table",7),d["\u0275\u0275elementStart"](10,"thead"),d["\u0275\u0275elementStart"](11,"tr"),d["\u0275\u0275elementStart"](12,"th"),d["\u0275\u0275elementStart"](13,"h2",8),d["\u0275\u0275text"](14),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementStart"](15,"tbody"),d["\u0275\u0275template"](16,A,4,3,"tr",9),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275template"](17,z,7,1,"ng-template",null,10,d["\u0275\u0275templateRefExtractor"]),d["\u0275\u0275template"](19,R,7,1,"ng-template",null,11,d["\u0275\u0275templateRefExtractor"])}2&e&&(d["\u0275\u0275advance"](7),d["\u0275\u0275property"]("ngIf",t.loading),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",0==t.teacherslength),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("dtOptions",t.dtOptions)("dtTrigger",t.dtTrigger),d["\u0275\u0275advance"](5),d["\u0275\u0275textInterpolate"](t.teacherTableHead),d["\u0275\u0275advance"](2),d["\u0275\u0275property"]("ngForOf",t.teachers))},directives:[a.NgIf,y.a,a.NgForOf,M.b,k.a,j,N],pipes:[a.TitleCasePipe],styles:[".teachers[_ngcontent-%COMP%]{margin-top:10px}  .teacher-upload .modal-content{border:3px solid #3a8af6!important;border-radius:25px!important}@media only screen and (max-width:600px){  .teacher-upload .modal-dialog{width:100%;margin:0!important;border:none!important}  .modal-open .modal{overflow:hidden!important}.modal_control[_ngcontent-%COMP%]{height:100vh}  .modal-backdrop.show{opacity:0!important}  .teacher-upload .modal-content{border:0!important;border-radius:0!important}.teachers[_ngcontent-%COMP%]{overflow:scroll;overflow-x:hidden;height:calc(100vh - 100px)!important}}"]}),e})(),canActivate:[s.a]},{path:"create",component:x,canActivate:[s.a]}]}];let H=(()=>{class e{}return e.\u0275mod=d["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=d["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.f.forChild(G)],i.f]}),e})();var K=n("zib+"),Q=n("pKmL");let $=(()=>{class e{}return e.\u0275mod=d["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=d["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},providers:[p.a],imports:[[a.CommonModule,r.m,r.x,l.a,H,b.b,w.e,K.a,Q.a,y.b]]}),e})()},RKuE:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var a=n("AytR"),r=n("fXoL"),l=n("tk/3");const i=a.a.base_api_url+"/user/";let s=(()=>{class e{constructor(e){this.httpClient=e}createTeacherUser(e){return this.httpClient.post(i,e)}saveManyTeachers(e){return this.httpClient.post(a.a.base_api_url+"/user/teachers/upload",e)}getteachers(e){return this.httpClient.get(i+e+"/teachers/")}getSingleTeacher(e){return this.httpClient.get(i+"/singleuser/"+e)}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275inject"](l.HttpClient))},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);