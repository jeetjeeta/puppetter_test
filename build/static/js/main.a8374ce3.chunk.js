(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{23:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var s=n(3),a=n(15),c=n.n(a),i=(n(23),n(5)),o=(n(24),n(7)),r=n.n(o),l=n(8),u=(n(26),"https://puppeteer-test-zoqc.onrender.com"),d=n(61),p=function(e){return new Promise((function(t){setTimeout((function(){t()}),e)}))},b=n(1),j=function(e){d.a.create({baseURL:u,timeout:36e5,headers:{Accept:"application/json","content-type":"application/json"}});var t=e.quality,n=e.type,a=e.setIsLoading,c=e.setIsDownloadLinkAvailable,o=e.setDownloadLinks,j=e.setPlaylistName,h=e.setPlaylistLength,v=e.setIsResultVisible,y=Object(s.useState)(""),f=Object(i.a)(y,2),x=f[0],m=f[1],O=function(){return!(x.length>=4&&"http"===x.substr(0,4))};return Object(b.jsx)("div",{className:"Playlist",children:Object(b.jsxs)("div",{className:"playlistInput",children:[Object(b.jsx)("input",{onChange:function(e){m(e.target.value)},className:"inputLink",type:"text",placeholder:"Insert the url of youtube playlist"}),Object(b.jsx)("button",{className:"".concat(O()?"disabled":""),onClick:O()?function(){}:function(){var e=/http[s]?[:]\/\/m\.youtube\.com\/playlist[?]list[=].+/;if(/http[s]?[:]\/\/www\.youtube\.com\/playlist[?]list[=].+/.test(x)||e.test(x)){var s=x;e.test(x)&&(s=x.replace("m","www")),a(!0),v(!1),c(!1),fetch("".concat(u,"/getList"),{method:"post",mode:"cors",headers:{"content-type":"application/json"},body:JSON.stringify({playlistURL:s,quality:t,type:n})}).then((function(e){return e.json()})).then(function(){var e=Object(l.a)(r.a.mark((function e(t){var n,s,i,l,d,b,y;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t);case 1:return e.next=4,p(6e4);case 4:return e.next=6,fetch("".concat(u,"/getResponseState"));case 6:return s=e.sent,e.next=9,s.json();case 9:if(i=e.sent,console.log("mainData ",i),!1!==i.state){e.next=15;break}return e.next=14,p(1e4);case 14:return e.abrupt("continue",1);case 15:return v(!0),console.log(i),a(!1),l=null===(n=i.data)||void 0===n?void 0:n[0],d=l.videoList,b=l.playListName,y=l.audioList,d?(o(d),h(d.length),j(b),c(!0)):y&&(o(y),h(y.length),j(b),c(!0)),e.abrupt("break",23);case 23:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){o([]),j(""),h(0),console.log(e),v(!1),a(!1),alert("some error")}))}else alert("Invalid playlist link")},children:"Generate Link"})]})})},h=(n(32),function(e){var t=e.quality,n=e.type,a=e.setIsLoading,c=e.setIsDownloadLinkAvailable,o=e.setDownloadLinks,r=e.setPlaylistName,l=e.setIsResultVisible,d=Object(s.useState)(""),p=Object(i.a)(d,2),j=p[0],h=p[1],v=function(){return!(j.length>=4&&"http"===j.substr(0,4))};return Object(b.jsx)("div",{className:"IndividualVideos",children:Object(b.jsxs)("div",{className:"videosInput",children:[Object(b.jsx)("input",{onChange:function(e){h(e.target.value)},className:"inputLink",type:"text",placeholder:"Insert video links separated by commas"}),Object(b.jsx)("button",{className:"".concat(v()?"disabled":""),onClick:v()?function(){}:function(){var e=/http[s]?[:]\/\/m\.youtube\.com\/watch[?]v[=].+/;if(/http[s]?[:]\/\/www\.youtube\.com\/watch[?]v[=].+/.test(j)||e.test(j)){var s=j;e.test(j)&&(s=j.replace("m","www")),a(!0),l(!1),c(!1),fetch("".concat(u,"/getIndividualList"),{method:"post",mode:"cors",headers:{"content-type":"application/json"},body:JSON.stringify({urls:s,quality:t,type:n})}).then((function(e){return e.json()})).then((function(e){console.log(e),a(!1),e.length>0&&(o(e),r(e[0].playListName),c(!0))})).catch((function(e){console.log(e),o([]),r(""),a(!1),alert("some error")}))}else alert("Invalid video link")},children:"Generate Link"})]})})}),v=(n(33),n(18)),y=n.n(v);var f=function(e){var t=e.visible,n=e.text,s=e.type,a=e.classes||"",c=e.color||"#fff",i=e.color;return Object(b.jsxs)("div",{className:"Spinner ".concat(a," ").concat(t?"":"none"),children:[Object(b.jsx)(y.a,{type:s,color:c,height:50,width:50,timeout:0}),Object(b.jsx)("span",{style:i?{color:c}:{},class:"Loading_Text",children:n})]})},x=n(12),m=(n(54),function(e){var t=e.downloadLinks,n=e.playlistName,s=e.type,a=function(e){return new Promise((function(t){setTimeout((function(){t()}),e)}))},c=function(){var e=Object(l.a)(r.a.mark((function e(t,n,c,i){var o,l,u,d,p;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("qualityN: ",Number(i)),console.log("qualityS: ",i),!("mp4"==c&&"360"===i||"mp3"===c&&"128"===i)){e.next=23;break}return e.prev=3,e.next=6,fetch("".concat("http://localhost:8082","/sendMedia"),{method:"post",cors:"cors",headers:{"content-type":"application/json"},body:JSON.stringify({url:t})});case 6:return o=e.sent,e.next=9,o.blob();case 9:l=e.sent,console.log("blob: ",l),u=URL.createObjectURL(l),(d=document.createElement("a")).download="".concat(n,".").concat(c),d.href=u,console.log(d),d.click(),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(3),console.log("err: ",e.t0);case 22:return e.abrupt("return");case 23:if((p=document.createElement("a")).setAttribute("href",t),p.setAttribute("target","_blank"),p.setAttribute("rel","noopener noreferrer"),p.dispatchEvent(new MouseEvent("click",{ctrlKey:!0})),"audio"!==s){e.next=34;break}return e.next=32,a(3e3);case 32:e.next=36;break;case 34:return e.next=36,a(1e4);case 36:case"end":return e.stop()}}),e,null,[[3,19]])})));return function(t,n,s,a){return e.apply(this,arguments)}}(),i=function(){var e=Object(l.a)(r.a.mark((function e(){var s,a,i,o,l,u,d,p,b;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("videos"!==n){e.next=20;break}s=Object(x.a)(t),e.prev=2,s.s();case 4:if((a=s.n()).done){e.next=10;break}return i=a.value,e.next=8,c(i.videoURL,i.title,"mp4",i.quality);case 8:e.next=4;break;case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),s.e(e.t0);case 15:return e.prev=15,s.f(),e.finish(15);case 18:e.next=57;break;case 20:if("audios"!==n){e.next=40;break}o=Object(x.a)(t),e.prev=22,o.s();case 24:if((l=o.n()).done){e.next=30;break}return u=l.value,e.next=28,c(u.audioURL,u.title,"mp3",u.quality);case 28:e.next=24;break;case 30:e.next=35;break;case 32:e.prev=32,e.t1=e.catch(22),o.e(e.t1);case 35:return e.prev=35,o.f(),e.finish(35);case 38:e.next=57;break;case 40:d=Object(x.a)(t),e.prev=41,d.s();case 43:if((p=d.n()).done){e.next=49;break}return b=p.value,e.next=47,c(b.downURL,b.title,b.type,b.quality);case 47:e.next=43;break;case 49:e.next=54;break;case 51:e.prev=51,e.t2=e.catch(41),d.e(e.t2);case 54:return e.prev=54,d.f(),e.finish(54);case 57:case"end":return e.stop()}}),e,null,[[2,12,15,18],[22,32,35,38],[41,51,54,57]])})));return function(){return e.apply(this,arguments)}}();return Object(b.jsx)("div",{className:"Download",children:Object(b.jsx)("button",{onClick:i,children:"Download"})})}),O=(n(55),function(e){var t=e.setQuality,n=e.setType,s=e.setSide;return Object(b.jsxs)("div",{className:"Format",children:[Object(b.jsx)("label",{htmlFor:"",children:"Format: "}),Object(b.jsxs)("select",{onChange:function(e){s("left");var a=e.target.value;e.target.selectedIndex<3?(n("video"),t(a)):(n("audio"),t("128"))},name:"Format",id:"",children:[Object(b.jsxs)("optgroup",{label:"Video",children:[Object(b.jsx)("option",{selected:!0,value:"360",children:"360p"}),Object(b.jsx)("option",{value:"720",children:"720p(recommended)"}),Object(b.jsx)("option",{value:"720c",children:"720p(for copyright)"})]}),Object(b.jsx)("optgroup",{label:"Audio",children:Object(b.jsx)("option",{value:"mp3",children:"128kbps"})})]})]})}),g=(n(56),function(e){var t=e.setQuality,n=e.setType,s=e.setSide;return Object(b.jsxs)("div",{className:"FormatY2",children:[Object(b.jsx)("label",{htmlFor:"",children:"Format: "}),Object(b.jsxs)("select",{onChange:function(e){s("right");var a=e.target.value;e.target.selectedIndex<6?(n("video"),t(a)):(n("audio"),t("128y"))},name:"Format",id:"",children:[Object(b.jsxs)("optgroup",{label:"Video(y2mate)",children:[Object(b.jsx)("option",{value:"144y",children:"144p"}),Object(b.jsx)("option",{value:"240y",children:"240p"}),Object(b.jsx)("option",{selected:!0,value:"360y",children:"360p"}),Object(b.jsx)("option",{value:"480y",children:"480p"}),Object(b.jsx)("option",{value:"720y",children:"720p"}),Object(b.jsx)("option",{value:"1080y",children:"1080p"})]}),Object(b.jsx)("optgroup",{label:"Audio(y2mate)",children:Object(b.jsx)("option",{value:"mp3",children:"128kbps"})})]}),Object(b.jsx)("div",{style:{"font-size":"0.5rem","text-align":"center"},children:"From other sources"})]})}),k=(n(57),function(e){var t=e.side,n=e.setQuality,s=e.setType,a=e.setSide;return Object(b.jsxs)("div",{className:"Header",children:[Object(b.jsx)("div",{className:"left ".concat("left"===t?"active":""),children:Object(b.jsx)(O,{setQuality:n,setType:s,setSide:a})}),Object(b.jsx)("div",{className:"right ".concat("right"===t?"active":""),children:Object(b.jsx)(g,{setQuality:n,setType:s,setSide:a})})]})}),w=(n(58),function(e){return Object(b.jsxs)("div",{className:"Result",children:[Object(b.jsx)("h3",{children:e.playlistName}),Object(b.jsxs)("p",{children:[e.playlistLength?e.playlistLength:0," videos found in playlist"]})]})});var L=function(){var e=Object(s.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(s.useState)(!1),o=Object(i.a)(c,2),r=o[0],l=o[1],u=Object(s.useState)("360"),d=Object(i.a)(u,2),p=d[0],v=d[1],y=Object(s.useState)("video"),x=Object(i.a)(y,2),O=x[0],g=x[1],L=Object(s.useState)("left"),N=Object(i.a)(L,2),I=N[0],S=N[1],R=Object(s.useState)([]),q=Object(i.a)(R,2),A=q[0],D=q[1],F=Object(s.useState)(""),P=Object(i.a)(F,2),T=P[0],C=P[1],V=Object(s.useState)(0),U=Object(i.a)(V,2),Q=U[0],E=U[1],J=Object(s.useState)(!1),z=Object(i.a)(J,2),G=z[0],M=z[1];return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(k,{side:I,setQuality:v,setType:g,setSide:S}),Object(b.jsx)(j,{quality:p,type:O,setIsLoading:l,setIsDownloadLinkAvailable:a,setDownloadLinks:D,setPlaylistName:C,setPlaylistLength:E,setIsResultVisible:M}),Object(b.jsx)("div",{className:"OR",children:"OR"}),Object(b.jsx)("div",{className:"labelIndividualVideos",children:"For downloading videos separately"}),Object(b.jsx)(h,{quality:p,type:O,setIsLoading:l,setIsDownloadLinkAvailable:a,setDownloadLinks:D,setPlaylistName:C,setIsResultVisible:M}),Object(b.jsx)(f,{classes:"center mgtop",visible:r,text:"Loading",type:"Circles",color:"black"}),n?Object(b.jsx)(m,{type:O,downloadLinks:A,playlistName:T}):"",0!=Q&&G?Object(b.jsx)(w,{playlistName:T,playlistLength:Q}):""]})};c.a.render(Object(b.jsx)(L,{}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.a8374ce3.chunk.js.map