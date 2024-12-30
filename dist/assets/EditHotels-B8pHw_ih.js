import{e as ee,r as t,j as e,_ as n}from"./index-T_zaNhwb.js";import{R as se,S as M,A as ae,M as le,T as te,a as oe}from"./AmenitiesData-zsJYzfvJ.js";import{b as ie,c as ne,d as ce,e as re}from"./useHotelHook-DDBNvAaK.js";import"./index-DjKJqAo0.js";import"./index-OLxVi2Fr.js";import"./axiosInstance-DZzLN3Iq.js";import"./axios-upsvKRUO.js";const fe=()=>{var A;const{hotelId:u}=ee(),{data:r,isLoading:$}=ie(u),{data:p}=ne(),{mutate:B,isLoading:w}=ce(),{mutate:F}=re(),[g,S]=t.useState(""),[x,C]=t.useState(""),[b,y]=t.useState(""),[f,R]=t.useState(0),[h,U]=t.useState(0),[k,I]=t.useState([]),[D,E]=t.useState(0),[H,v]=t.useState([]),[P,T]=t.useState([]),[d,m]=t.useState([{name:"",description:"",rating:0}]),L=((A=p==null?void 0:p.rooms)==null?void 0:A.map(s=>({value:s._id,label:`${s.roomType} ${s.roomNumber}`})))||[];t.useEffect(()=>{if(r!=null&&r.hotel){const{name:s,description:a,location:l,price:o,discountedPrice:c,amenities:j,rating:Q,images:V,rooms:W,testimonials:X}=r.hotel;S(s),C(a),y(l),R(o),U(c),I(j.map(i=>({value:i,label:i}))),E(Q),v(V),T(W.map(i=>({value:i._id,label:`${i.roomType} ${i.roomNumber}`}))),m(X.map(({name:i,description:Y,rating:Z})=>({name:i,description:Y,rating:Z})))}},[r]);const _=()=>{if(!g||!x||!b||f<=0||h<=0){n.error("Please fill in all required fields.");return}const s={name:g,description:x,location:b,price:Number(f),discountedPrice:Number(h),amenities:k.map(a=>a.value),rating:Number(D),images:H,rooms:P.map(a=>a.value),testimonials:d.map(a=>({...a,rating:Number(a.rating)}))};console.log(u,s),F({id:u,data:s},{onSuccess:()=>{n.success("Hotel updated successfully")},onError:a=>{console.error("Update Error:",a),n.error("Error: "+((a==null?void 0:a.message)||"Failed to update room."))}})},N=(s,a,l)=>{const o=d.map((c,j)=>j===s?{...c,[a]:l}:c);m(o)},G=s=>{m(d.filter((a,l)=>l!==s))},q=()=>{m([...d,{name:"",description:"",rating:0}])},z=s=>{v(a=>a.filter(l=>l!==s)),n.success("Image removed successfully!")},O=s=>{const a=new FormData;s.forEach(o=>a.append("images",o));const l=n.loading("Uploading images...");B(a,{onSuccess:o=>{v(c=>[...c,...o.imageUrls]),n.success("Images uploaded successfully!",{id:l})},onError:o=>{n.error(`Error uploading images: ${o.message}`,{id:l})}})},J=["Add Hotel","Gallery","Customer Reviews"],K={"Add Hotel":e.jsxs("div",{className:"space-y-6 p-6 bg-white",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Rating:  "}),e.jsx(se,{seiInitialRating:E,initialRating:D})]}),e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Hotel Name"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",value:g,onChange:s=>S(s.target.value)}),e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Description"}),e.jsx("textarea",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",value:x,onChange:s=>C(s.target.value)}),e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Location"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",value:b,onChange:s=>y(s.target.value)}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Amenities"}),e.jsx(M,{isMulti:!0,options:ae,value:k,onChange:I,classNamePrefix:"select"})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Select Rooms"}),e.jsx(M,{isMulti:!0,options:L,value:P,onChange:T,classNamePrefix:"select"})]})]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Price"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",type:"number",value:f,onChange:s=>R(parseFloat(s.target.value))})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Discounted Price"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",type:"number",value:h,onChange:s=>U(parseFloat(s.target.value))})]})]})]}),Gallery:e.jsx("div",{className:"p-6",children:e.jsx(le,{onUploadSuccess:O,imagesUrls:H,isUploading:w,disabled:w,onRemoveImageUrl:z})}),"Customer Reviews":e.jsxs("div",{className:"p-6 space-y-4",children:[e.jsx("div",{className:"flex justify-between flex-wrap",children:e.jsx("h2",{className:"text-2xl font-semibold",children:"Customer Reviews"})}),e.jsx("div",{className:"flex flex-wrap gap-6 w-full ",children:d.map((s,a)=>e.jsxs("div",{className:"p-4 border rounded-lg space-y-2",children:[e.jsx("input",{className:"w-full p-2 border rounded-lg",value:s.name,onChange:l=>N(a,"name",l.target.value),placeholder:"Customer Name"}),e.jsx("textarea",{className:"w-full p-2 border rounded-lg",value:s.description,onChange:l=>N(a,"description",l.target.value),placeholder:"Review Description"}),e.jsx("div",{className:"flex items-center",children:[1,2,3,4,5].map(l=>e.jsx("svg",{onClick:()=>N(a,"rating",l),xmlns:"http://www.w3.org/2000/svg",fill:l<=s.rating?"#F59E0B":"#D1D5DB",viewBox:"0 0 24 24",className:"w-6 h-6 cursor-pointer",children:e.jsx("path",{d:"M11.999 1.49l2.93 5.93 6.54.953-4.735 4.62 1.117 6.516-5.852-3.076-5.852 3.076 1.117-6.516-4.735-4.62 6.54-.953 2.93-5.93z"})},l))}),e.jsx("button",{onClick:()=>G(a),className:"text-red-500 py-1 px-3 rounded-lg",children:e.jsx(te,{})})]},a))}),e.jsx("button",{onClick:q,className:"bg-blue-500 text-white py-2 px-4 rounded-lg",children:"Add More"})]})};return $?e.jsx("div",{children:"Loading..."}):e.jsxs("div",{className:"bg-gray-50 min-h-screen py-4 flex flex-col pb-5",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h1",{className:"text-[32px] font-bold pb-8 px-10",children:"Edit Hotel"}),e.jsx("button",{className:"bg-gradient-to-r h-[60px] w-[150px]  from-blue-500 to-indigo-600 text-white px-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all",onClick:_,children:"Update"})]}),e.jsx(oe,{tabNames:J,tabContent:K})]})};export{fe as default};
