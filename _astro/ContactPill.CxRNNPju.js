import{c as a,j as e}from"./createLucideIcon.BKbDvfBK.js";import{r as d}from"./index.DLkBFFtG.js";import{A as m,m as s}from"./proxy.20ddzwM7.js";/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};o.node;const p=a(o);/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};n.node;const x=a(n);/**
 * @license lucide-react v1.67.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c={name:"mail",size:24,node:[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]};c.node;const h=a(c);function g(){const[l,i]=d.useState(!1),t="amalMraj@proton.me",r=async()=>{try{await navigator.clipboard.writeText(t),i(!0),setTimeout(()=>i(!1),2200)}catch{window.location.href=`mailto:${t}`}};return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("a",{href:`mailto:${t}`,className:"inline-flex items-center gap-2 h-11 px-5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold tracking-tight shadow-[0_4px_16px_rgba(14,165,233,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]",children:[e.jsx(h,{size:16}),e.jsx("span",{children:"Contact Me"})]}),e.jsx("button",{onClick:r,"aria-label":"Copy email address to clipboard",title:"Copy email to clipboard",className:"inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-all duration-200 active:scale-[0.98]",children:e.jsx(m,{mode:"wait",initial:!1,children:l?e.jsxs(s.span,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},className:"flex items-center gap-1.5 text-emerald-400 font-sans font-medium",children:[e.jsx(p,{size:14}),e.jsx("span",{children:"Copied!"})]},"check"):e.jsxs(s.span,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},className:"flex items-center gap-1.5",children:[e.jsx(x,{size:13,className:"text-neutral-400"}),e.jsx("span",{children:t})]},"copy")})})]})}export{g as default};
