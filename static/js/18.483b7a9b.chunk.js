(this["webpackJsonpreact-ant-admin"]=this["webpackJsonpreact-ant-admin"]||[]).push([[18],{1363:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return N}));n(901);var a=n(902),c=n.n(a),r=(n(927),n(934)),i=n.n(r),s=(n(852),n(853)),o=n.n(s),l=(n(169),n(64)),u=n.n(l),j=(n(168),n(84)),d=n.n(j),b=(n(250),n(95)),O=n.n(b),f=(n(129),n(44)),h=n.n(f),m=n(2),p=(n(880),n(881)),x=n.n(p),g=n(18),v=n(0),y=n(903),w=n(862),S=n(253),I=(n(980),n(9));function N(){var e=x.a.useForm(),t=Object(g.a)(e,1)[0],n=x.a.useForm(),a=Object(g.a)(n,1)[0],r=Object(v.useState)(void 0),s=Object(g.a)(r,2),l=s[0],j=s[1],b=Object(v.useState)([]),f=Object(g.a)(b,2),p=f[0],N=f[1],C=Object(v.useState)([]),k=Object(g.a)(C,2),F=k[0],D=k[1],T=Object(v.useState)(!0),K=Object(g.a)(T,2),A=K[0],E=K[1],z=Object(v.useState)(0),P=Object(g.a)(z,2),B=P[0],_=P[1],q=Object(v.useState)(!1),H=Object(g.a)(q,2),J=H[0],R=H[1],V=function(e){Object(S.l)(e).then((function(e){var t=e.data;if(0===e.status){var n=t.list,a=t.total,c=t.mapKey;return c=c.map((function(e){return"description"===e.key&&(e.width=500),e})),D(c),_(a),N(n.map((function(e){return Object(m.a)(Object(m.a)({},e),{},{key:e.m_id})}))),void E(!1)}}))},G=function(){var e=a.getFieldsValue();V(Object(m.a)(Object(m.a)({},l),e))},L=Object(I.jsxs)(u.a,{justify:"space-between",align:"center",gutter:80,children:[Object(I.jsx)(O.a,{style:{lineHeight:"32px"},children:"\u8868\u683c\u67e5\u8be2"}),Object(I.jsx)(O.a,{children:Object(I.jsx)(d.a,{type:"primary",onClick:function(){return R(!0)},children:"\u6dfb\u52a0\u6d88\u606f"})})]});return Object(I.jsxs)("div",{className:"search-container",children:[Object(I.jsxs)(i.a,{spinning:A,children:[Object(I.jsx)("div",{className:"top-form",children:Object(I.jsxs)(x.a,{layout:"inline",form:a,children:[Object(I.jsx)(x.a.Item,{name:"name",children:Object(I.jsx)(o.a,{placeholder:"\u8f93\u5165\u6d88\u606f\u540d\u79f0"})}),Object(I.jsx)(x.a.Item,{name:"description",children:Object(I.jsx)(o.a,{placeholder:"\u8f93\u5165\u6d88\u606f\u63cf\u8ff0\u8bcd"})}),Object(I.jsx)(d.a,{onClick:G,type:"primary",className:"submit-btn",children:"\u641c\u7d22"}),Object(I.jsx)(d.a,{onClick:function(){a.resetFields(),G()},children:"\u6e05\u7a7a"})]})}),Object(I.jsx)(w.a,{title:function(){return L},dataSource:p,columns:F,pagination:!1,saveKey:"listForm"}),Object(I.jsx)(y.a,{immediately:V,change:function(e){var t=a.getFieldsValue();V(Object(m.a)(Object(m.a)({},e),t)),j(e)},total:B})]}),Object(I.jsx)(c.a,{title:"\u6dfb\u52a0\u4e00\u6761\u8bb0\u5f55",visible:J,cancelText:"\u53d6\u6d88",okText:"\u6dfb\u52a0",onOk:function(){t.validateFields().then((function(e){Object(S.b)(e).then((function(e){0===e.status&&(t.resetFields(),h.a.success(e.msg),R(!1),G())}))}))},onCancel:function(){return R(!1)},children:Object(I.jsxs)(x.a,{form:t,children:[Object(I.jsx)(x.a.Item,{label:"\u6d88\u606f\u540d\u79f0",name:"name",rules:[{required:!0,message:"Please input your name!"}],children:Object(I.jsx)(o.a,{})}),Object(I.jsx)(x.a.Item,{label:"\u6d88\u606f\u63cf\u8ff0",name:"description",rules:[{required:!0,message:"Please input your description!"},{min:10,message:"The description must be more than 10 words!"}],children:Object(I.jsx)(o.a,{})})]})})]})}N.route={path:"/list/search"}},862:function(e,t,n){"use strict";n(261);var a=n(135),c=n.n(a),r=(n(168),n(84)),i=n.n(r),s=(n(905),n(907)),o=n.n(s),l=(n(129),n(44)),u=n.n(l),j=(n(540),n(134)),d=n.n(j),b=(n(870),n(871)),O=n.n(b),f=(n(169),n(64)),h=n.n(f),m=(n(858),n(851)),p=n.n(m),x=(n(251),n(104)),g=n.n(x),v=n(24),y=n(18),w=n(2),S=n(0),I=n(924),N=n(128),C=n(906),k=n.n(C),F=n(27),D=(n(863),n(9)),T=["className","style"],K=["columns","dataSource","className","children","saveKey"],A=Object(I.c)((function(){return Object(D.jsx)(N.a,{type:"icon_mirrorlightctrl",className:"drag-sort"})})),E=Object(I.b)((function(e){return Object(D.jsx)("tr",Object(w.a)({},e))})),z=Object(I.a)((function(e){return Object(D.jsx)("tbody",Object(w.a)({},e))})),P=[{title:"\u5217\u6392\u5e8f",dataIndex:"sort",className:"drag-visible",render:function(){return Object(D.jsx)(A,{})}},{title:"\u5217\u540d",dataIndex:"title",className:"drag-visible",align:"center"},{title:"\u5bbd\u5ea6",dataIndex:"width",type:"inputNumber"},{title:"\u56fa\u5b9a",dataIndex:"fixed",width:120,type:"switch",align:"center",range:[{v:!1,t:"\u5173"},{v:"left",t:"\u5de6\u56fa\u5b9a"},{v:"right",t:"\u53f3\u56fa\u5b9a"}]},{title:"\u8d85\u51fa\u5bbd\u5ea6\u9690\u85cf",dataIndex:"ellipsis",type:"switch",align:"center",range:[{v:!1,t:"\u5426"},{v:!0,t:"\u662f"}]},{title:"\u5bf9\u9f50",dataIndex:"align",type:"switch",align:"center",range:[{v:"left",t:"\u5de6"},{v:"center",t:"\u5c45\u4e2d"},{v:"right",t:"\u53f3"}]},{title:"\u9690\u85cf",dataIndex:"hidden",type:"switch",align:"center",range:[{v:"hidden",t:"\u9690\u85cf"},{v:"auto",t:"\u663e\u793a"}]}],B={width:80,fixed:!1,ellipsis:!1,align:"left",hidden:"auto"};t.a=function(e){var t=e.columns,n=e.dataSource,a=e.className,r=e.children,s=e.saveKey,l=Object(v.a)(e,K),j=function(e,t){var n=Object(S.useState)(!1),a=Object(y.a)(n,2),c=a[0],r=a[1],i=Object(S.useState)([]),s=Object(y.a)(i,2),o=s[0],l=s[1],j=Object(S.useState)([]),b=Object(y.a)(j,2),f=b[0],m=b[1];function x(e,t,n){return Object(D.jsx)(g.a.Group,{buttonStyle:"solid",value:t,onChange:function(t){return I(e.dataIndex,t.target.value,n)},children:e.range&&e.range.map((function(e){return Object(D.jsx)(h.a,{className:"mt10",justify:"center",children:Object(D.jsx)(p.a,{title:e.t,arrowPointAtCenter:!0,children:Object(D.jsx)(g.a,{value:e.v,children:e.t})})},e.t)}))})}function I(e,t,n){var a=n.dataIndex,c=o.map((function(n){return n.dataIndex===a&&(n[e]=t),n}));l(c)}function N(e,t,n){return Object(D.jsx)(p.a,{title:"\u5931\u53bb\u7126\u70b9\u89e6\u53d1",arrowPointAtCenter:!0,children:Object(D.jsx)(O.a,{min:0,max:800,onStep:function(t){return I(e,t,n)},onBlur:function(t){return I(e,Number(t.target.value),n)},value:t})})}function C(e){var t=e.oldIndex,n=e.newIndex;if(t!==n){var a=k()([].concat(o),t,n).filter((function(e){return!!e}));l(a)}}return Object(S.useEffect)((function(){var n=Object(F.h)(!0,t);if(t&&n&&e&&e.length===n.length){var a=n.map((function(t){return Object(w.a)(Object(w.a)({},e.find((function(e){return e.dataIndex===t.dataIndex}))),t)}));l(a)}}),[t,e]),Object(S.useEffect)((function(){if(!Object(F.h)(!0,t)&&e&&e.length!==o.length){var n=e.map((function(e,t){return Object(w.a)(Object(w.a)(Object(w.a)({},B),e),{},{index:t})}));l(n)}}),[t,e]),Object(S.useEffect)((function(){if(0!==o.length){var e=P.map((function(e){return"switch"===e.type&&(e.render=function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return x.apply(void 0,[e].concat(n))}),"inputNumber"===e.type&&(e.render=function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return N.apply(void 0,[e.dataIndex].concat(n))}),e}));m(e)}}),[o]),{col:o,showDrawer:c,show:function(){r(!0)},hiddin:function(){r(!1)},tbTitle:f,DraggableContainer:function(e){return Object(D.jsx)(z,Object(w.a)({useDragHandle:!0,disableAutoscroll:!0,helperClass:"row-dragging",onSortEnd:C},e))},DraggableBodyRow:function(e){e.className,e.style;var t=Object(v.a)(e,T),n=o.findIndex((function(e){return e.index===t["data-row-key"]}));return Object(D.jsx)(E,Object(w.a)({index:n},t))},saveTbSet:function(){if(!t)return d.a.error({type:"error",description:"\u4f60\u672a\u5b9a\u4e49\u8868\u683c\u7684savaKey\u5c5e\u6027\uff0c\u8bf7\u5b9a\u4e49\u540e\u4fdd\u5b58",message:"\u4fdd\u5b58\u5931\u8d25"});Object(F.t)(!0,t,o),u.a.success("\u4fdd\u5b58\u8bbe\u7f6e\u6210\u529f!")}}}(t,s),b=j.showDrawer,f=j.show,m=j.hiddin,x=j.col,I=j.tbTitle,C=j.DraggableContainer,A=j.DraggableBodyRow,_=j.saveTbSet;return Object(D.jsxs)("div",{className:"react-ant-table",children:[Object(D.jsx)(h.a,{className:"set",justify:"end",children:Object(D.jsx)(N.a,{type:"icon_edit",onClick:f})}),Object(D.jsx)(o.a,Object(w.a)(Object(w.a)({columns:x.filter((function(e){return"hidden"!==e.hidden})),dataSource:n,className:a?"table-show-container ".concat(a):"table-show-container"},l),{},{children:r})),Object(D.jsxs)(c.a,{className:"table-drawer",width:1e3,onClose:m,maskClosable:!0,visible:b,title:"\u8868\u683c\u663e\u793a\u8bbe\u7f6e",children:[Object(D.jsx)(o.a,{columns:I,dataSource:x,rowKey:"index",components:{body:{wrapper:C,row:A}},pagination:!1}),Object(D.jsx)(h.a,{justify:"center",className:"mt20",children:Object(D.jsx)(i.a,{type:"primary",onClick:_,children:"\u4fdd\u5b58\u6b64\u8868\u683c\u8bbe\u7f6e\uff0c\u4e0b\u6b21\u6253\u5f00\u9ed8\u8ba4\u542f\u7528"})})]})]})}},863:function(e,t,n){},903:function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));n(169);var a=n(64),c=n.n(a),r=(n(899),n(900)),i=n.n(r),s=n(18),o=n(0),l=(n(904),n(9)),u=[10,20,50,100];function j(e){var t=e.total,n=e.change,a=e.immediately,r=Object(o.useState)(1),j=Object(s.a)(r,2),d=j[0],b=j[1],O=Object(o.useState)(u[0]),f=Object(s.a)(O,2),h=f[0],m=f[1];Object(o.useEffect)((function(){"function"===typeof a&&a({page:d,pagesize:h})}),[]);return Object(l.jsx)(c.a,{justify:"end",className:"pagination-wapper",children:Object(l.jsx)(i.a,{showSizeChanger:!0,onChange:function(e,t){b(e),m(t),"function"===typeof n&&n({page:e,pagesize:t})},current:d,total:t,pageSizeOptions:u})})}},904:function(e,t,n){},980:function(e,t,n){}}]);