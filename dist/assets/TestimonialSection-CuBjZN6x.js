import{j as e,m as l}from"./index-BlMCTi9B.js";import{C as c}from"./CommonSlider-DtR0XKBs.js";const i=({backgroundImage:a,Testimonials:t})=>{const o=r=>e.jsxs(l.div,{id:"reviews",className:"bg-primary-white rounded-[32px] p-6 shadow-xl md:text-left flex flex-col h-full hover:shadow-2xl transition-shadow duration-300",initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.5,ease:"easeOut"},viewport:{once:!0,amount:.5},children:[e.jsx("h3",{className:"text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-4",children:r.heading}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 text-gray-600 flex-grow",children:r.description}),e.jsxs("div",{className:"flex items-center justify-between mt-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs("div",{className:"text-left",children:[e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/2 font-semibold text-gray-800",children:r.name}),e.jsx("p",{className:"text-mobile/caption md:text-desktop/caption text-gray-500",children:r.location})]})}),e.jsx("div",{className:"flex mt-6",children:Array.from({length:r.rating}).map((n,d)=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"#FDC114",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"#FDC114",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.48 3.499a.75.75 0 011.04 0l2.208 2.244 3.094.428a.75.75 0 01.416 1.306l-2.208 2.244.56 3.314a.75.75 0 01-1.078.79l-2.808-1.53-2.808 1.53a.75.75 0 01-1.078-.79l.56-3.314-2.208-2.244a.75.75 0 01.416-1.306l3.094-.428L11.48 3.5z"})},d))})]})]});return e.jsx("div",{className:"w-full py-16",style:{backgroundImage:a?`url(${a})`:"none",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"},children:e.jsxs("div",{className:"content flex flex-col gap-6 relative overflow-hidden container mx-auto",children:[e.jsx("h2",{className:"text-mobile/h4 md:text-desktop/h2 md:text-[40px] text-gray-900 mb-8 text-center",children:t!=null&&t.clientHeading?t==null?void 0:t.clientHeading:"Testimonials"}),e.jsx(c,{items:t!=null&&t.clients?t==null?void 0:t.clients:t,renderItem:o,spaceBetween:30,loop:!1,className:"relative z-10 testiM mySwiper",slidesPerViewDesktop:3,arrow:"pt-6"})]})})};export{i as T};
