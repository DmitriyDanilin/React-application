(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{101:function(e,t,n){e.exports={item:"Post_item__3vmwz",profilePH:"Post_profilePH__3UCF8",postText:"Post_postText__N8KPb",like:"Post_like__xqKg3"}},121:function(e,t,n){e.exports={formControl:"FormControls_formControl__2MWe9",error:"FormControls_error__3Ztry",formSummaryError:"FormControls_formSummaryError__2TFZp",text:"FormControls_text__2SF-c"}},122:function(e,t,n){e.exports={postsBlock:"MyPosts_postsBlock__GVH_v",posts:"MyPosts_posts__3JNgW",addPostBTN:"MyPosts_addPostBTN__4Hplh"}},123:function(e,t,n){e.exports={header:"Header_header__o1S2-",title:"Header_title__JxuRg",loginBlock:"Header_loginBlock__2JIDk",login:"Header_login__1-vnv"}},148:function(e,t,n){e.exports={wrappedBlock:"Music_wrappedBlock__3tHZ0",card:"Music_card__pfE-t"}},156:function(e,t,n){e.exports={email:"Login_email__1L1dZ",pass:"Login_pass__RENn2",remember:"Login_remember__2ISws",formSummaryError:"Login_formSummaryError__6n6nu",loginBTN:"Login_loginBTN__3Sip5",captcha:"Login_captcha__uoZTn"}},239:function(e,t,n){e.exports={preloaderIMG:"Preloader_preloaderIMG__34bRm"}},361:function(e,t,n){},362:function(e,t,n){},468:function(e,t,n){"use strict";n.r(t);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r,s=n(28),a=n(22),c=n.n(a),i=n(33),o=n(54),u=n(8),l=n(235),d=n.n(l).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0",headers:{"API-KEY":"97132c0f-39d9-4230-aaf8-d365f7c03dce"}});!function(e){e[e.Success=0]="Success",e[e.Error=1]="Error",e[e.CaptchRequired=10]="CaptchRequired"}(r||(r={}));var j=function(e){return d.get("/profile/".concat(e)).then((function(e){return e.data}))},b=function(e){return d.get("/profile/status/"+e).then((function(e){return e.data}))},f=function(e){return d.put("/profile/status",{status:e}).then((function(e){return e.data}))},p=function(e){var t=new FormData;return t.append("image",e),d.put("/profile/photo",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return e.data}))},O=function(e){return d.put("/profile",e).then((function(e){return e.data}))},h=n(61),m={posts:[{id:1,message:"Hi, how are you?",likesCount:12},{id:2,message:"It's my first post",likesCount:11},{id:3,message:"Blabla",likesCount:11},{id:4,message:"Dada",likesCount:11}],status:"",profile:null},g={addPostActionCreator:function(e){return{type:"ADD_POST",newPostBody:e}},setUserProfile:function(e){return{type:"SET_USER_PROFILE",profile:e}},setUserStatusAC:function(e){return{type:"SET_STATUS",status:e}},deletePost:function(e){return{type:"DELETE_POST",postID:e}},setUserPhoto:function(e){return{type:"SET_PHOTO",photo:e}}},x=function(e){return function(){var t=Object(i.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j(e);case 2:r=t.sent,n(g.setUserProfile(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_POST":var n=e.posts.length,r={id:n,message:t.newPostBody,likesCount:0};return Object(u.a)(Object(u.a)({},e),{},{posts:[].concat(Object(o.a)(e.posts),[r])});case"SET_USER_PROFILE":return Object(u.a)(Object(u.a)({},e),{},{profile:t.profile});case"DELETE_POST":return Object(u.a)(Object(u.a)({},e),{},{posts:e.posts.filter((function(e){return e.id!=t.postID}))});case"SET_STATUS":return Object(u.a)(Object(u.a)({},e),{},{status:t.status});case"SET_PHOTO":return Object(u.a)(Object(u.a)({},e),{},{profile:Object(u.a)(Object(u.a)({},e.profile),{},{photos:t.photo})});default:return e}},_="SEND_MESSAGE",S={dialogs:[{id:1,name:"Anna"},{id:2,name:"Vitaliy"},{id:3,name:"Ivan"},{id:4,name:"Dima"}],messages:[{id:1,message:"Hi"},{id:2,message:"How are you?"},{id:3,message:"Yo"},{id:4,message:"Yo"},{id:5,message:"Yo"}]},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case _:var n=e.messages.length,r=t.newMessageBody;return Object(u.a)(Object(u.a)({},e),{},{messages:[].concat(Object(o.a)(e.messages),[{id:n,message:r}])});default:return e}},y={},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y;return e},P={getUsers:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return d.get("/users?page=".concat(e,"&count=").concat(t,"&term=").concat(n)+(null===r?"":"&friend=".concat(r))).then((function(e){return e.data}))},Follow:function(e){return d.post("/follow/".concat(e)).then((function(e){return e.data}))},unFollow:function(e){return d.delete("/follow/".concat(e)).then((function(e){return e.data}))}},N=function(e,t,n,r){return e.map((function(e){return e[n]===t?Object(u.a)(Object(u.a)({},e),r):e}))},C={users:[],pageSize:10,totalUsersCount:0,currentPage:1,isFetching:!1,isFollowingInProgress:[],filter:{term:"",friend:null}},T=function(e){return{type:"SET_FILTER",payload:e}},I=function(e){return{type:"FOLLOW",userId:e}},k=function(e){return{type:"UNFOLLOW",userId:e}},U=function(e){return{type:"SET_USERS",users:e}},A=function(e){return{type:"SET_CURRENT_PAGE",currentPage:e}},L=function(e){return{type:"SET_TOTAL_USERS_COUNT",totalCount:e}},D=function(e){return{type:"TOGGLE_IS_FETCHING",isFetching:e}},F=function(e,t){return{type:"TOGGLE_IS_FOLLOWING_PROGRESS",isFollowingInProgress:e,userId:t}},B=function(e,t,n){return function(){var r=Object(i.a)(c.a.mark((function r(s,a){var i;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s(D(!0)),s(A(e)),s(T(n)),r.next=5,P.getUsers(e,t,n.term,n.friend);case 5:i=r.sent,s(U(i.items)),s(L(i.totalCount)),s(D(!1));case 9:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}()},R=function(){var e=Object(i.a)(c.a.mark((function e(t,n,r,s){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(F(!0,n)),e.next=3,r(n);case 3:0==e.sent.resultCode&&t(s(n)),t(F(!1,n));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r,s){return e.apply(this,arguments)}}(),M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FOLLOW":return Object(u.a)(Object(u.a)({},e),{},{users:N(e.users,t.userId,"id",{followed:!0})});case"UNFOLLOW":return Object(u.a)(Object(u.a)({},e),{},{users:N(e.users,t.userId,"id",{followed:!1})});case"SET_USERS":return Object(u.a)(Object(u.a)({},e),{},{users:t.users});case"SET_CURRENT_PAGE":return Object(u.a)(Object(u.a)({},e),{},{currentPage:t.currentPage});case"SET_TOTAL_USERS_COUNT":return Object(u.a)(Object(u.a)({},e),{},{totalUsersCount:t.totalCount});case"TOGGLE_IS_FETCHING":return Object(u.a)(Object(u.a)({},e),{},{isFetching:t.isFetching});case"TOGGLE_IS_FOLLOWING_PROGRESS":return Object(u.a)(Object(u.a)({},e),{},{isFollowingInProgress:t.isFollowingInProgress?[].concat(Object(o.a)(e.isFollowingInProgress),[t.userId]):e.isFollowingInProgress.filter((function(e){return e!=t.userId}))});case"SET_FILTER":return Object(u.a)(Object(u.a)({},e),{},{filter:t.payload});default:return e}},H=function(){return d.get("/security/get-captcha-url").then((function(e){return e.data}))},G=function(){return d.get("/auth/me").then((function(e){return e.data}))},W=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return d.post("/auth/login",{email:e,password:t,rememberMe:n,captcha:r}).then((function(e){return e.data}))},z=function(){return d.delete("/auth/login").then((function(e){return e.data}))},V={userID:null,email:null,login:null,isAuth:!1,captchaURL:null},J=function(e,t,n,r){return{type:"SET_USER_DATA",payload:{userID:e,email:t,login:n,isAuth:r}}},Y=function(e){return{type:"GET_CAPTCHA_URL_SUCCESS",payload:{captchaURL:e}}},Z=function(){return function(){var e=Object(i.a)(c.a.mark((function e(t){var n,s,a,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G();case 2:(n=e.sent).resultCode===r.Success&&(s=n.data,a=s.id,i=s.login,o=s.email,t(J(a,o,i,!0)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},q=function(){return function(){var e=Object(i.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H();case 2:n=e.sent,r=n.url,t(Y(r));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER_DATA":case"GET_CAPTCHA_URL_SUCCESS":return Object(u.a)(Object(u.a)({},e),t.payload);default:return e}},X=n(236),Q=n(234),$={isInitialized:!1},ee=function(){return{type:"INITIALIZED_SUCCESED"}},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INITIALIZED_SUCCESED":return Object(u.a)(Object(u.a)({},e),{},{isInitialized:!0});default:return e}},ne=null,re=function(){console.log("WS closed"),fe["status-changed"].forEach((function(e){return e("pending")})),setTimeout(oe,3e3)},se=function(e){var t=JSON.parse(e.data);fe["message-received"].forEach((function(e){return e(t)}))},ae=function(){fe["status-changed"].forEach((function(e){return e("ready")}))},ce=function(){fe["status-changed"].forEach((function(e){return e("error")}))},ie=function(){var e,t,n,r;null===(e=ne)||void 0===e||e.removeEventListener("close",re),null===(t=ne)||void 0===t||t.removeEventListener("message",se),null===(n=ne)||void 0===n||n.removeEventListener("open",ae),null===(r=ne)||void 0===r||r.removeEventListener("error",ce)};function oe(){var e;ie(),null===(e=ne)||void 0===e||e.close(),ne=new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"),fe["status-changed"].forEach((function(e){return e("pending")})),ne.addEventListener("close",re),ne.addEventListener("message",se),ne.addEventListener("open",ae),ne.addEventListener("error",ce)}var ue=function(){oe()},le=function(){var e;fe["message-received"]=[],fe["status-changed"]=[],ie(),null===(e=ne)||void 0===e||e.close()},de=function(e,t){return fe[e].push(t),function(){fe[e]=fe[e].filter((function(e){return e!==t}))}},je=function(e,t){fe[e]=fe[e].filter((function(e){return e!==t}))},be=function(e){var t;null===(t=ne)||void 0===t||t.send(e)},fe={"message-received":[],"status-changed":[]},pe=n(478),Oe={messages:[],status:"ready"},he=function(e){return{type:"/chat/MESSAGES_RECEIVED",payload:{messages:e}}},me=function(e){return{type:"/chat/STATUS_CHANGED",payload:{status:e}}},ge=null,xe=function(e){return null!==ge?ge:ge=function(t){e(he(t))}},ve=null,_e=function(e){return null!==ve?ve:ve=function(t){e(me(t))}},Se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"/chat/MESSAGES_RECEIVED":return Object(u.a)(Object(u.a)({},e),{},{messages:[].concat(Object(o.a)(e.messages),Object(o.a)(t.payload.messages.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{id:Object(pe.a)()})})))).filter((function(e,t,n){return t>=n.length-100}))});case"/chat/STATUS_CHANGED":return Object(u.a)(Object(u.a)({},e),{},{status:t.payload.status});default:return e}},we=Object(s.c)({profilePage:v,dialogsPage:w,sidebar:E,usersPage:M,auth:K,form:Q.a,app:te,chatPage:Se}),ye=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d,Ee=Object(s.e)(we,ye(Object(s.a)(X.a)));window.store=Ee;var Pe=Ee,Ne=n(0),Ce=n.n(Ne),Te=n(32),Ie=n.n(Te),ke=(n(361),n(135)),Ue=n(136),Ae=n(153),Le=n(151),De=(n(362),n(35)),Fe=n(31),Be=n(64),Re=n.p+"static/media/preloader.0c178750.svg",Me=n(239),He=n.n(Me),Ge=n(1),We=function(){return Object(Ge.jsxs)("div",{className:He.a.preloaderIMG,children:[Object(Ge.jsx)("img",{src:Re})," "]})},ze=n(56),Ve=n.n(ze),Je=n(117),Ye=n(231),Ze=n(121),qe=n.n(Ze),Ke=function(e){var t=e.meta,n=t.touched,r=t.error,s=e.children,a=n&&r;return Object(Ge.jsxs)("div",{className:qe.a.formControl+" "+(a?qe.a.error:""),children:[Object(Ge.jsx)("div",{children:s}),a?Object(Ge.jsx)("span",{children:r}):""]})},Xe=function(e){var t=e.input,n=(e.meta,Object(Je.a)(e,["input","meta"]));return Object(Ge.jsx)(Ke,Object(u.a)(Object(u.a)({},e),{},{children:Object(Ge.jsx)("textarea",Object(u.a)(Object(u.a)({className:qe.a.text},t),n))}))},Qe=function(e){var t=e.input,n=(e.meta,Object(Je.a)(e,["input","meta"]));return Object(Ge.jsx)(Ke,Object(u.a)(Object(u.a)({},e),{},{children:Object(Ge.jsx)("input",Object(u.a)(Object(u.a)({className:qe.a.text},t),n))}))};function $e(e,t,n,r){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return Object(Ge.jsx)("div",{children:Object(Ge.jsx)(Ye.a,{placeholder:e,validate:n,name:t,component:r,type:s})})}var et=n(232),tt=Object(et.a)({form:"edit-profile"})((function(e){var t=e.handleSubmit,n=e.profile,r=e.error;return Object(Ge.jsxs)("form",{onSubmit:t,children:[Object(Ge.jsxs)("div",{children:["Full Name: ",$e("Full name","fullName",[],Qe)]}),Object(Ge.jsxs)("div",{children:["Looking for a job: ",Object(Ge.jsx)("span",{className:Ve.a.lookingForAJob,children:$e("","lookingForAJob",[],Qe,"checkbox")})]}),Object(Ge.jsxs)("div",{children:["Looking for a job description: ",Object(Ge.jsx)("span",{children:$e("Description","lookingForAJobDescription",[],Xe)})]}),Object(Ge.jsxs)("div",{children:["About me: ",Object(Ge.jsx)("span",{children:$e("About me","aboutMe",[],Xe)})]}),Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("b",{children:"Contacts"}),": ",Object.keys(n.contacts).map((function(e){return Object(Ge.jsxs)("div",{className:Ve.a.contact,children:[e,":  ",$e(e,"contacts."+e,[],Qe)]},e)}))]}),r&&Object(Ge.jsx)("div",{className:Ve.a.formSummaryError,children:r}),Object(Ge.jsx)("button",{children:"Save"})]})})),nt=function(e){var t=Object(Ne.useState)(!1),n=Object(Be.a)(t,2),r=n[0],s=n[1],a=Object(Ne.useState)(e.status),c=Object(Be.a)(a,2),i=c[0],o=c[1];Object(Ne.useEffect)((function(){o(e.status)}),[e.status]);return Object(Ge.jsx)("div",{children:r?Object(Ge.jsx)("div",{children:Object(Ge.jsx)("input",{autoFocus:!0,onBlur:function(){s(!1),e.updateStatus(i)},onChange:function(e){o(e.currentTarget.value)},value:i})}):Object(Ge.jsx)("div",{children:Object(Ge.jsxs)("span",{onDoubleClick:function(){s(!0)},children:[Object(Ge.jsx)("b",{children:"Status:"})," ",e.status||"No status"]})})})},rt=n.p+"static/media/UserPhoto.fbfe03c2.png",st=function(e){var t=e.profile,n=e.isOwner,r=e.activateEditMode;return Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("p",{className:Ve.a.profileName,children:t.fullName}),Object(Ge.jsxs)("p",{children:[Object(Ge.jsx)("b",{children:"Looking for a job:"})," ",t.lookingForAJob?"yes":"no"]}),Object(Ge.jsx)("p",{children:t.lookingForAJobDescription}),Object(Ge.jsxs)("p",{children:[Object(Ge.jsx)("b",{children:"About me:"})," ",t.aboutMe]}),Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("b",{children:"Contacts:"})," ",Object.keys(t.contacts).map((function(e){return Object(Ge.jsx)(at,{Title:e,Value:t.contacts[e]},e)}))]}),n?Object(Ge.jsx)("div",{className:Ve.a.editBTN,children:Object(Ge.jsx)("button",{onClick:r,children:"Edit"})}):null]})},at=function(e){var t=e.Title,n=e.Value;return Object(Ge.jsxs)("div",{className:Ve.a.contact,children:[Object(Ge.jsxs)("b",{children:[t,":"]}),n]})},ct=function(e){var t=Object(Ne.useState)(!1),n=Object(Be.a)(t,2),r=n[0],s=n[1];return e.profile?Object(Ge.jsx)("div",{children:Object(Ge.jsxs)("div",{className:Ve.a.descriptionBlock,children:[Object(Ge.jsx)("img",{className:Ve.a.avatar,src:e.profile.photos.large||rt}),Object(Ge.jsx)("div",{children:e.isOwner?Object(Ge.jsx)("input",{type:"file",onChange:function(t){var n;if(null===(n=t.target.files)||void 0===n?void 0:n.length){var r=t.target.files[0];e.savePhoto(r)}}}):""}),Object(Ge.jsx)("div",{className:Ve.a.status,children:Object(Ge.jsx)(nt,{status:e.status,updateStatus:e.updateStatus})}),r?Object(Ge.jsx)(tt,{profile:e.profile,initialValues:e.profile,onSubmit:function(t){e.saveProfile(t).then((function(){s(!1)}))}}):Object(Ge.jsx)(st,{activateEditMode:function(){s(!0)},profile:e.profile,isOwner:e.isOwner})]})}):Object(Ge.jsx)(We,{})},it=n(122),ot=n.n(it),ut=n(101),lt=n.n(ut),dt=n.p+"static/media/36b78c8b7cd957e082f53148b74787ea.e911d43c.jpg",jt=function(e){var t=Ce.a.useState(e.likesCount),n=Object(Be.a)(t,2),r=n[0],s=n[1];return Object(Ge.jsxs)("div",{className:lt.a.item,children:[Object(Ge.jsx)("img",{className:lt.a.profilePH,src:dt}),Object(Ge.jsx)("span",{className:lt.a.postText,children:e.message}),Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("span",{onClick:function(){r==e.likesCount?s(r+1):r>e.likesCount&&s(r-1)},children:Object(Ge.jsx)("img",{className:lt.a.like,src:"https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png"})}),Object(Ge.jsx)("span",{className:lt.a.likesCount,children:r})]})]})},bt=function(e){return function(t){if(t.length>e)return"Max ".concat(e," symbols")}},ft=function(e){if(!e)return"Field is required"},pt=(bt(1e3),Ce.a.memo((function(e){var t=Object(o.a)(e.posts).reverse().map((function(e){return Object(Ge.jsx)(jt,{message:e.message,likesCount:e.likesCount},e.message)}));return Object(Ge.jsxs)("div",{className:ot.a.postsBlock,children:[Object(Ge.jsx)("h3",{children:"My posts"}),Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("p",{children:"Write down the post:"}),Object(Ge.jsx)(Ot,{onSubmit:function(t){e.addPost(t.newPostBody),t.newPostBody=""}})]}),Object(Ge.jsx)("div",{className:ot.a.posts,children:t})]})}))),Ot=Object(et.a)({form:"addPost"})((function(e){return Object(Ge.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(Ge.jsx)("div",{className:ot.a.addPostArea,children:$e("New Post","newPostBody",[],Xe)}),Object(Ge.jsx)("button",{className:ot.a.addPostBTN,children:"Add post"})]})})),ht=pt,mt=n(18),gt=Object(mt.b)((function(e){return{posts:e.profilePage.posts}}),{addPost:g.addPostActionCreator})(ht),xt=function(e){return Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)(ct,{isOwner:e.isOwner,profile:e.profile,status:e.status,updateStatus:e.updateStatus,savePhoto:e.savePhoto,saveProfile:e.saveProfile}),Object(Ge.jsx)(gt,{})]})},vt=function(e){return{isAuth:e.auth.isAuth}};function _t(e){return Object(mt.b)(vt)((function(t){t.isAuth;var n=Object(Je.a)(t,["isAuth"]);return t.isAuth?Object(Ge.jsx)(e,Object(u.a)({},n)):Object(Ge.jsx)(Fe.a,{to:"/login"})}))}var St=function(e){Object(Ae.a)(n,e);var t=Object(Le.a)(n);function n(){var e;Object(ke.a)(this,n);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).setUserProfile=function(){var t=+e.props.match.params.userID;t||(t=e.props.loginedUserId)||e.props.history.push("/login"),e.props.getUserProfile(t),e.props.getStatus(t)},e}return Object(Ue.a)(n,[{key:"componentDidMount",value:function(){this.setUserProfile()}},{key:"componentDidUpdate",value:function(e){this.props.match.params.userID!=e.match.params.userID&&this.setUserProfile()}},{key:"render",value:function(){return Object(Ge.jsx)(xt,Object(u.a)(Object(u.a)({},this.props),{},{isOwner:!this.props.match.params.userID,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile}))}}]),n}(Ce.a.Component),wt=Object(s.d)(Object(mt.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,loginedUserId:e.auth.userID,isAuth:e.auth.isAuth}}),{saveProfile:function(e){return function(){var t=Object(i.a)(c.a.mark((function t(n,r){var s,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O(e);case 2:if(s=t.sent,a=r().auth.userID,0!==s.resultCode){t.next=8;break}n(x(a)),t.next=10;break;case 8:return n(Object(h.a)("edit-profile",{_error:s.messages[0]})),t.abrupt("return",Promise.reject(s.messages[0]));case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},getUserProfile:x,getStatus:function(e){return function(){var t=Object(i.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b(e);case 2:r=t.sent,n(g.setUserStatusAC(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},updateStatus:function(e){return function(){var t=Object(i.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f(e);case 3:0===t.sent.resultCode&&n(g.setUserStatusAC(e)),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},savePhoto:function(e){return function(){var t=Object(i.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p(e);case 2:0===(r=t.sent).resultCode&&n(g.setUserPhoto(r.data.photos));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}),Fe.h,_t)(St),yt=n(156),Et=n.n(yt),Pt=n(102),Nt=n(57),Ct=function(){var e=Object(mt.d)((function(e){return e.auth.captchaURL})),t=Object(mt.d)((function(e){return e.auth.isAuth})),n=Object(mt.c)();return t?Object(Ge.jsx)(Fe.a,{to:"/profile"}):Object(Ge.jsx)("div",{children:Object(Ge.jsxs)(Pt.a,{style:{marginTop:"30px"},children:[Object(Ge.jsx)(Nt.a,{span:7,children:Object(Ge.jsx)("div",{})}),Object(Ge.jsxs)(Nt.a,{span:10,children:[Object(Ge.jsx)("h1",{children:"Login"}),Object(Ge.jsx)(Tt,{onSubmit:function(e){var t,s,a,o;n((t=e.email,s=e.password,a=e.rememberMe,o=e.captcha,function(){var e=Object(i.a)(c.a.mark((function e(n){var i,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W(t,s,a,o);case 2:(i=e.sent).resultCode===r.Success?n(Z()):(i.resultCode===r.CaptchRequired&&n(q()),u=i.messages.length>0?i.messages[0]:"Some error",n(Object(h.a)("Login",{_error:u})));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},captchaURL:e})]}),Object(Ge.jsx)(Nt.a,{span:7,children:Object(Ge.jsx)("div",{})})]})})},Tt=Object(et.a)({form:"Login"})((function(e){var t=e.handleSubmit,n=e.error,r=e.captchaURL;return Object(Ge.jsxs)("form",{onSubmit:t,children:[Object(Ge.jsx)("div",{children:$e("Email","email",[ft],Qe)}),Object(Ge.jsx)("div",{children:$e("Password","password",[ft],Qe,"password")}),Object(Ge.jsxs)("div",{children:[$e(void 0,"rememberMe",[],"input","checkbox"),Object(Ge.jsx)("span",{children:"  Remember me"})]}),r&&Object(Ge.jsx)("img",{className:Et.a.captcha,src:r}),r&&$e(void 0,"captcha",[ft],Qe),n&&Object(Ge.jsx)("div",{className:Et.a.formSummaryError,children:n}),Object(Ge.jsx)("div",{children:Object(Ge.jsx)("button",{className:Et.a.loginBTN,children:"Login"})})]})})),It=n(67),kt=n.n(It),Ut=function(e){var t="/dialogs/"+e.id;return Object(Ge.jsx)("div",{children:Object(Ge.jsx)(De.b,{activeClassName:kt.a.activeDialog,className:kt.a.person,to:t,children:e.name})})},At=function(e){return Object(Ge.jsx)("div",{className:kt.a.dialog,children:e.message})},Lt=(bt(1e3),Object(et.a)({form:"sendMessage"})((function(e){return Object(Ge.jsx)("div",{children:Object(Ge.jsxs)("form",{onSubmit:e.handleSubmit,className:kt.a.textButtonArea,children:[$e("Message","newMessageBody",[],Qe),Object(Ge.jsx)("div",{children:Object(Ge.jsx)("button",{children:"Send"})})]})})}))),Dt=function(e){var t=e.dialogsPage,n=t.dialogs.map((function(e){return Object(Ge.jsx)(Ut,{name:e.name,id:e.id},e.id)})),r=t.messages.map((function(e){return Object(Ge.jsx)(At,{message:e.message},e.id)}));return Object(Ge.jsxs)("div",{className:kt.a.dialogs,children:[Object(Ge.jsx)("div",{className:kt.a.dialogsItems,children:n}),Object(Ge.jsxs)("div",{className:kt.a.messages,children:[Object(Ge.jsx)("div",{children:r}),Object(Ge.jsx)(Lt,{onSubmit:function(t){e.sendMessage(t.newMessageBody),t.newMessageBody=""}})]})]})},Ft=Object(s.d)(Object(mt.b)((function(e){return{dialogsPage:e.dialogsPage}}),{sendMessage:function(e){return{type:_,newMessageBody:e}}}),_t)(Dt),Bt=n(80),Rt=n.n(Bt),Mt=function(e){var t=e.user,n=e.isFollowingInProgress,r=e.unfollow,s=e.follow;return Object(Ge.jsx)("div",{children:Object(Ge.jsxs)("div",{className:Rt.a.users,children:[Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("div",{children:Object(Ge.jsx)(De.b,{to:"/profile/"+t.id,children:Object(Ge.jsx)("img",{className:Rt.a.avatar,src:null!=t.photos.small?t.photos.small:rt})})}),Object(Ge.jsx)("div",{children:t.followed?Object(Ge.jsx)("button",{disabled:n.some((function(e){return e===t.id})),className:Rt.a.followBTN,onClick:function(){r(t.id)},children:"Unfollow"}):Object(Ge.jsx)("button",{disabled:n.some((function(e){return e===t.id})),className:Rt.a.followBTN,onClick:function(){s(t.id)},children:"Follow"})})]}),Object(Ge.jsxs)("div",{className:Rt.a.userInfo,children:[Object(Ge.jsxs)("span",{className:Rt.a.aboutUser,children:[Object(Ge.jsx)("div",{children:t.name}),Object(Ge.jsx)("div",{children:t.status})]}),Object(Ge.jsxs)("span",{className:Rt.a.location,children:[Object(Ge.jsx)("div",{children:"country"}),Object(Ge.jsx)("div",{children:"city"})]})]})]})})},Ht=n(474),Gt=n(124),Wt=n(243),zt=Object(Wt.a)((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return!0}))})),Vt=function(e){return e.auth.isAuth},Jt=function(e){return e.auth.login},Yt=function(e){return e.usersPage.pageSize},Zt=function(e){return e.usersPage.totalUsersCount},qt=function(e){return e.usersPage.currentPage},Kt=function(e){return e.usersPage.isFetching},Xt=function(e){return e.usersPage.isFollowingInProgress},Qt=function(e){return e.usersPage.filter},$t=function(e){return{}},en=Ce.a.memo((function(e){var t=Object(mt.d)(Qt);return Object(Ge.jsx)("div",{children:Object(Ge.jsx)(Gt.c,{enableReinitialize:!0,initialValues:{term:t.term,friend:String(t.friend)},validate:$t,onSubmit:function(t,n){n.setSubmitting;var r={term:t.term,friend:"null"===t.friend?null:"true"===t.friend};e.onFilterChanged(r)},children:function(){return Object(Ge.jsxs)(Gt.b,{children:[Object(Ge.jsx)(Gt.a,{type:"text",name:"term"}),Object(Ge.jsxs)(Gt.a,{name:"friend",as:"select",children:[Object(Ge.jsx)("option",{value:"null",children:"All"}),Object(Ge.jsx)("option",{value:"true",children:"Only folowed"}),Object(Ge.jsx)("option",{value:"false",children:"Only unfolowed"})]}),Object(Ge.jsx)("button",{type:"submit",children:"Search"})]})}})})})),tn=n(186),nn=Ce.a.memo((function(){var e=Object(mt.d)(Zt),t=Object(mt.d)(qt),n=Object(mt.d)(Yt),r=Object(mt.d)(Qt),s=Object(mt.d)(zt),a=Object(mt.d)(Xt),o=Object(mt.d)(Kt),l=Object(Fe.g)(),d=Object(mt.c)();Object(Ne.useEffect)((function(){var e=tn.parse(l.location.search.substr(1)),s=t,a=r;e.page&&(s=+e.page),e.term&&(a=Object(u.a)(Object(u.a)({},a),{},{term:e.term})),e.friend&&(a=Object(u.a)(Object(u.a)({},a),{},{friend:"null"===e.friend?null:"true"===e.friend})),d(B(s,n,a))}),[]),Object(Ne.useEffect)((function(){var e={};r.term&&(e.term=r.term),null!==!!r.friend&&(e.friend=String(r.friend)),1!==t&&(e.page=String(t)),l.push({pathname:"/users",search:tn.stringify(e)})}),[r,t]);var j=function(e){var t;d((t=e,function(){var e=Object(i.a)(c.a.mark((function e(n){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=P.Follow.bind(t),e.next=3,R(n,t,r,I);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},b=function(e){var t;d((t=e,function(){var e=Object(i.a)(c.a.mark((function e(n){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=P.unFollow.bind(t),e.next=3,R(n,t,r,k);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))};return Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)(Ht.a,{style:{margin:"20px"},showSizeChanger:!1,pageSize:n,current:t,responsive:!0,size:"default",onChange:function(e){d(B(e,n,r))},total:e}),Object(Ge.jsx)(en,{onFilterChanged:function(e){d(B(1,n,e))}}),o?Object(Ge.jsx)(We,{}):s.map((function(e){return Object(Ge.jsx)(Mt,{user:e,isFollowingInProgress:a,follow:j,unfollow:b},e.id)}))]})})),rn=function(e){Object(mt.d)(Kt);return Object(Ge.jsx)(Ge.Fragment,{children:Object(Ge.jsx)(nn,{})})},sn=n(473),an=n(479),cn=n(480),on=n(481),un=n(482),ln=n(483),dn=n(484),jn=n(123),bn=n.n(jn),fn=n(476),pn=n(248),On=function(e){var t=Object(mt.d)(Vt),n=Object(mt.d)(Jt),s=Object(mt.c)();return Object(Ge.jsxs)(pn.Header,{className:"site-layout-background",style:{padding:0},children:[Object(Ge.jsx)(De.b,{to:"/profile",activeClassName:bn.a.activeLink}),Object(Ge.jsx)("span",{className:bn.a.title,children:"FakeTelegram"}),Object(Ge.jsxs)("div",{className:bn.a.loginBlock,children:["  ",t?Object(Ge.jsxs)("div",{children:[" ",Object(Ge.jsx)(De.b,{to:"/login",children:Object(Ge.jsx)("span",{children:n})}),"  ",Object(Ge.jsx)(De.b,{to:"/login",children:Object(Ge.jsx)(fn.a,{onClick:function(){s(function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z();case 2:e.sent.resultCode===r.Success&&t(J(null,null,null,!1));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},danger:!0,type:"primary",children:"Log Out"})})]}):Object(Ge.jsx)("span",{className:bn.a.login,children:"Log In"})]})]})},hn=function(){return Object(Ge.jsx)("div",{children:Object(Ge.jsx)(mn,{})})},mn=function(){var e=Object(mt.c)(),t=Object(mt.d)((function(e){return e.chatPage.status}));return Object(Ne.useEffect)((function(){return e(function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ue(),de("message-received",xe(t)),de("status-changed",_e(t));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),function(){e(function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:je("message-received",xe(t)),je("status-changed",_e(t)),le();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}),[]),Object(Ge.jsxs)("div",{children:["error"==t&&Object(Ge.jsx)("div",{children:" Error "}),Object(Ge.jsxs)(Ge.Fragment,{children:[Object(Ge.jsx)(gn,{}),Object(Ge.jsx)(vn,{})]})]})},gn=Ce.a.memo((function(){var e=Object(mt.d)((function(e){return e.chatPage.messages})),t=Object(Ne.useRef)(null),n=Object(Ne.useState)(!1),r=Object(Be.a)(n,2),s=r[0],a=r[1];return Object(Ne.useEffect)((function(){var e;s&&(null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}))}),[e]),Object(Ge.jsxs)("div",{style:{height:"500px",overflow:"auto",marginTop:"30px",padding:"20px"},onScroll:function(e){var t=e.currentTarget;Math.abs(t.scrollHeight-t.scrollTop-t.clientHeight)<100?a(!0):a(!1)},children:[e.map((function(e,t){return Object(Ge.jsx)(xn,{message:e},t)})),Object(Ge.jsx)("div",{ref:t})]})})),xn=Ce.a.memo((function(e){var t=e.message;return console.log("message"),Object(Ge.jsxs)("div",{style:{border:"2px double black",background:"#DDD",margin:"10px"},children:[Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("img",{style:{width:"50px",borderRadius:"50%"},src:t.photo}),Object(Ge.jsx)("b",{style:{marginLeft:"10px"},children:t.userName})]}),Object(Ge.jsx)("div",{style:{marginLeft:"60px"},children:t.message})]})})),vn=function(){var e=Object(Ne.useState)(""),t=Object(Be.a)(e,2),n=t[0],r=t[1],s=Object(mt.d)((function(e){return e.chatPage.status})),a=Object(mt.c)();return Object(Ge.jsxs)("div",{children:[Object(Ge.jsx)("div",{children:Object(Ge.jsx)("textarea",{style:{width:"300px",marginLeft:"30px",resize:"none"},onChange:function(e){return r(e.currentTarget.value)},value:n})}),Object(Ge.jsx)("div",{children:Object(Ge.jsx)(fn.a,{disabled:"ready"!=s,style:{marginLeft:"30px"},danger:!0,onClick:function(){n&&(a(function(e){return Object(i.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:be(e);case 1:case"end":return t.stop()}}),t)})))}(n)),r(""))},children:"Send"})})]})},_n=n(475),Sn=n(477),wn=n(148),yn=n.n(wn),En=_n.a.Meta,Pn=function(){return Object(Ge.jsx)("div",{className:yn.a.card,children:Object(Ge.jsx)(_n.a,{hoverable:!0,style:{width:295},cover:Object(Ge.jsx)("img",{alt:"example",src:"https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/75713876/original/9a67eb27f72dd0e4a664bbf6aee708e0bcca7bf4/music-album-cover-designs.jpg"}),children:Object(Ge.jsx)(En,{avatar:Object(Ge.jsx)(Sn.a,{src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}),title:"Card title",description:"This is the description"})})})},Nn=function(){return Object(Ge.jsxs)("div",{className:yn.a.wrappedBlock,children:[Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{}),Object(Ge.jsx)(Pn,{})]})},Cn=sn.a.Content,Tn=sn.a.Footer,In=sn.a.Sider,kn=function(e){Object(Ae.a)(n,e);var t=Object(Le.a)(n);function n(){var e;Object(ke.a)(this,n);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).state={collapsed:!1},e.onCollapse=function(t){e.setState({collapsed:t})},e.catchAllUnhandledErrors=function(e){alert("Some error")},e}return Object(Ue.a)(n,[{key:"componentDidMount",value:function(){this.props.initilizeApp(),window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors)}},{key:"render",value:function(){var e=this.state.collapsed;return this.props.isInitialized?Object(Ge.jsxs)(sn.a,{style:{minHeight:"100vh"},children:[Object(Ge.jsxs)(In,{collapsible:!0,collapsed:e,onCollapse:this.onCollapse,children:[Object(Ge.jsx)("div",{children:Object(Ge.jsx)("img",{className:"logo",src:"https://www.vectorlogo.zone/logos/telegram/telegram-tile.svg"})}),Object(Ge.jsxs)(an.a,{theme:"dark",defaultSelectedKeys:["1"],mode:"inline",children:[Object(Ge.jsx)(an.a.Item,{icon:Object(Ge.jsx)(cn.a,{}),children:Object(Ge.jsx)(De.b,{to:"/profile",children:" My Profile"})},"1"),Object(Ge.jsx)(an.a.Item,{icon:Object(Ge.jsx)(on.a,{}),children:Object(Ge.jsx)(De.b,{to:"/dialogs",children:"Dialogs"})},"2"),Object(Ge.jsx)(an.a.Item,{icon:Object(Ge.jsx)(un.a,{}),children:Object(Ge.jsx)(De.b,{to:"/users",children:"Users"})},"3"),Object(Ge.jsx)(an.a.Item,{icon:Object(Ge.jsx)(ln.a,{}),children:Object(Ge.jsx)(De.b,{to:"/chat",children:"Chat"})},"4"),Object(Ge.jsx)(an.a.Item,{icon:Object(Ge.jsx)(dn.a,{}),children:Object(Ge.jsx)(De.b,{to:"/music",children:"Music"})},"5")]})]}),Object(Ge.jsxs)(sn.a,{className:"site-layout",children:[Object(Ge.jsx)(On,{}),Object(Ge.jsx)(Cn,{style:{margin:"0 16px"},children:Object(Ge.jsxs)(Fe.d,{children:[Object(Ge.jsx)(Fe.a,{exact:!0,from:"/",to:"/profile"}),Object(Ge.jsx)(Fe.b,{path:"/dialogs",render:function(){return Object(Ge.jsx)(Ft,{})}}),Object(Ge.jsx)(Fe.b,{path:"/profile/:userID?",render:function(){return Object(Ge.jsx)(wt,{})}}),Object(Ge.jsx)(Fe.b,{path:"/React-application",render:function(){return Object(Ge.jsx)(wt,{})}}),Object(Ge.jsx)(Fe.b,{path:"/users",render:function(){return Object(Ge.jsx)(rn,{})}}),Object(Ge.jsx)(Fe.b,{path:"/login",render:function(){return Object(Ge.jsx)(Ct,{})}}),Object(Ge.jsx)(Fe.b,{path:"/chat",render:function(){return Object(Ge.jsx)(hn,{})}}),Object(Ge.jsx)(Fe.b,{path:"/music",render:function(){return Object(Ge.jsx)(Nn,{})}})]})}),Object(Ge.jsx)(Tn,{style:{textAlign:"center"},children:"Fake Telegram 2021 created by Dmitriy Danilin"})]})]}):Object(Ge.jsx)(We,{})}}]),n}(Ce.a.Component),Un=Object(s.d)(Fe.h,Object(mt.b)((function(e){return{isInitialized:e.app.isInitialized}}),{initilizeApp:function(){return function(e){var t=e(Z());Promise.all([t]).then((function(){e(ee())}))}}}))(kn);Ie.a.render(Object(Ge.jsx)(De.a,{children:Object(Ge.jsx)(mt.a,{store:Pe,children:Object(Ge.jsx)(Un,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,t,n){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__3dCa2",avatar:"ProfileInfo_avatar__2yRcv",profileName:"ProfileInfo_profileName__1RgKY",status:"ProfileInfo_status__2Y-B-",contact:"ProfileInfo_contact__3WOyp",editBTN:"ProfileInfo_editBTN__3LuNZ",formSummaryError:"ProfileInfo_formSummaryError__3pb_T"}},67:function(e,t,n){e.exports={dialogs:"Dialogs_dialogs__2E1W7",dialogsItems:"Dialogs_dialogsItems__3e3N-",messages:"Dialogs_messages__3hRA5",message:"Dialogs_message__34Skv",person:"Dialogs_person__MY6F1",activeDialog:"Dialogs_activeDialog__1V244",text:"Dialogs_text__3gLYe",textButtonArea:"Dialogs_textButtonArea__3bwXc"}},80:function(e,t,n){e.exports={pageBTN:"Users_pageBTN__3jsUH",followBTN:"Users_followBTN__3wR1w",getUsersBTN:"Users_getUsersBTN__21NM3",userInfo:"Users_userInfo__2H1Nn",users:"Users_users__36A9F",avatar:"Users_avatar__n4B1c",aboutUser:"Users_aboutUser__3ZqWS",location:"Users_location__3WQI5",selectedPage:"Users_selectedPage__1AQX8",page:"Users_page__1QsaK",preloader:"Users_preloader__1BDAh"}}},[[468,1,2]]]);
//# sourceMappingURL=main.d0559f38.chunk.js.map