(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{69:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var a=n(2),r=n(6),l=(n(0),n(96)),o={title:"Multiple clients"},i={unversionedId:"features/multiple-clients",id:"features/multiple-clients",isDocsHomePage:!1,title:"Multiple clients",description:"With apollo-angular it is possible to use multiple Apollo Clients in your application.",source:"@site/docs/features/multiple-clients.md",permalink:"/docs/features/multiple-clients",editUrl:"https://github.com/kamilkisiela/apollo-angular/edit/master/website/docs/features/multiple-clients.md",version:"next",sidebar:"docs",previous:{title:"Integrating with NativeScript",permalink:"/docs/features/nativescript"},next:{title:"Static Typing",permalink:"/docs/features/static-typing"}},c=[{value:"Creating clients",id:"creating-clients",children:[]},{value:"Using Apollo",id:"using-apollo",children:[]}],p={rightToc:c};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"With ",Object(l.b)("inlineCode",{parentName:"p"},"apollo-angular")," it is possible to use multiple Apollo Clients in your application."),Object(l.b)("h2",{id:"creating-clients"},"Creating clients"),Object(l.b)("p",null,"You are already familiar with how to create a single client so it should be easy to understand it."),Object(l.b)("p",null,"There are few ways of creating named clients."),Object(l.b)("p",null,"One way is to use ",Object(l.b)("inlineCode",{parentName:"p"},"Apollo.create"),". Normally, you would use it like this:"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"apollo.create(options)\n")),Object(l.b)("p",null,"This will define a default client but there is one optional argument."),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"apollo.create(options, name?)\n")),Object(l.b)("p",null,"An example:"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"apollo.create(defaultOptions)\napollo.create(extraOptions, 'extra')\n")),Object(l.b)("p",null,"Now you have the default client and one called ",Object(l.b)("inlineCode",{parentName:"p"},"extra"),"."),Object(l.b)("blockquote",null,Object(l.b)("p",{parentName:"blockquote"},"Important thing to know is if you want to define a default client, simply do not use any ",Object(l.b)("inlineCode",{parentName:"p"},"name")," argument or set it to ",Object(l.b)("inlineCode",{parentName:"p"},"default"),".")),Object(l.b)("p",null,"The other way is to use helper methods."),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"apollo.createDefault(options)\n// and\napollo.createNamed(name, options);\n")),Object(l.b)("h2",{id:"using-apollo"},"Using Apollo"),Object(l.b)("p",null,"Since we have our clients available in an app, now is the time to see how to use them."),Object(l.b)("p",null,"If a client is defined as the default, you can directly use all methods of the ",Object(l.b)("inlineCode",{parentName:"p"},"Apollo")," service."),Object(l.b)("p",null,"About named clients, simply use the method called ",Object(l.b)("inlineCode",{parentName:"p"},"use(name: string)"),"."),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { Component, OnInit } from '@angular/core';\nimport { Apollo, QueryRef } from 'apollo-angular';\n\n@Component({...})\nexport class AppComponent {\n  feedQuery: QueryRef<any>;\n\n  constructor(apollo: Apollo) {\n    // use default\n    this.feedQuery = apollo.watchQuery({...});\n\n    // use extra client\n    this.feedQuery = apollo.use('extra').watchQuery({...});\n  }\n}\n")))}u.isMDXComponent=!0},96:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),u=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=u(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=u(n),m=a,d=s["".concat(o,".").concat(m)]||s[m]||b[m]||l;return n?r.a.createElement(d,i(i({ref:t},p),{},{components:n})):r.a.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);