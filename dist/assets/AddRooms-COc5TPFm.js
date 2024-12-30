import{r as t,j as e,_ as o}from"./index-CEKrv-KS.js";import{R as V,S as f,A as X,M as Z,T as ee,a as se}from"./AmenitiesData-paYglY4c.js";import{d as le,h as ae,u as te}from"./useHotelHook-3KAKPtEF.js";import"./index-DjKJqAo0.js";import"./index-D6nKI7Uv.js";import"./axiosInstance-2_WqCtWF.js";import"./axios-upsvKRUO.js";const ue=()=>{var L;const[r,g]=t.useState(""),[j,N]=t.useState([]),[F,v]=t.useState(0),[w,S]=t.useState([]),[y,R]=t.useState(!1),[u,C]=t.useState(""),[x,k]=t.useState(""),[c,D]=t.useState(0),[i,A]=t.useState(0),[p,T]=t.useState();console.log(p);const[h,E]=t.useState(0),[I,M]=t.useState(!0),[U,P]=t.useState(!1),[n,d]=t.useState([{name:"",description:"",rating:0}]),{mutate:O}=le(),{mutate:_}=ae(),{data:m}=te();console.log(m);const B=((L=m==null?void 0:m.hotels)==null?void 0:L.map(s=>({value:s._id,label:s.name})))||[],G=s=>{R(!0),O(s,{onSuccess:a=>{S(l=>[...l,...a.imageUrls]),o.success("Images uploaded successfully")},onError:a=>o.error("Error uploading images: "+a.message),onSettled:()=>R(!1)})},q=()=>{if(!u||!x||c<=0||i<=0||h<0||!r){o.error("Please fill in all required fields.");return}if(i>c){o.error("Discounted price cannot exceed the original price.");return}const s={roomType:r,roomNumber:u,description:x.trim(),roomLeft:Number(h),amenities:j.map(l=>l.value),rating:Math.min(5,Math.max(0,Number(F))),images:w,available:I,soldOut:U,price:Number(c),discountedPrice:Number(i),testimonials:n.map(l=>({...l,rating:Math.min(5,Math.max(0,Number(l.rating)))}))},a={hotelId:p.value,roomDetails:[s]};console.log("Submitting room Data:",a),_(a,{onSuccess:()=>{o.success("Room added successfully"),z()},onError:l=>o.error("Error: "+l.message)})},z=()=>{C(""),k(""),D(0),A(0),N([]),v(0),S([]),T([]),E(0),M(!0),P(!1),g(""),d([{name:"",description:"",rating:0}])},W=()=>{d([...n,{name:"",description:"",rating:0}])},b=(s,a,l)=>{const K=n.map((H,Q)=>Q===s?{...H,[a]:l}:H);d(K)},Y=s=>{d(n.filter((a,l)=>l!==s))},$=["Add Room","Gallery","Customer Reviews"],J={"Add Room":e.jsxs("div",{className:"space-y-6 p-6 bg-white ",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("label",{className:"flex items-center space-x-3",children:[e.jsx("span",{className:"text-2xl font-semibold",children:"Rating:"}),e.jsx(V,{seiInitialRating:v})]}),"Step1"]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Room Name"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter room name",value:u,onChange:s=>C(s.target.value)})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Room Type"}),e.jsx(f,{options:[{value:"single",label:"Single"},{value:"double",label:"Double"},{value:"suite",label:"Suite"},{value:"deluxe",label:"Deluxe"}],value:{value:r,label:r},onChange:s=>g((s==null?void 0:s.value)||""),placeholder:"Select Room Type"})]})]}),e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Description"}),e.jsx("textarea",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Enter description",value:x,onChange:s=>k(s.target.value)}),e.jsxs("div",{className:"flex justify-between gap-6",children:[e.jsxs("div",{className:"w-full",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Select Hotels"}),e.jsx(f,{options:B,value:p,onChange:T,className:"basic-multi-select",classNamePrefix:"select",placeholder:"Select Hotels"})]}),e.jsxs("label",{className:"flex w-full flex-col gap-6",children:[e.jsx("span",{className:"text-2xl font-semibold",children:"Ammenities"}),e.jsx(f,{isMulti:!0,options:X,value:j,onChange:N,className:"basic-multi-select",classNamePrefix:"select",placeholder:"Select Amenities"})]})]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Price"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",type:"number",placeholder:"Enter price",value:c,onChange:s=>D(parseFloat(s.target.value))})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Discounted Price"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",type:"number",placeholder:"Enter discounted price",value:i,onChange:s=>A(parseFloat(s.target.value))})]})]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Rooms Left"}),e.jsx("input",{className:"w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",type:"number",placeholder:"Enter rooms left",value:h,onChange:s=>E(parseInt(s.target.value))})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Available"}),e.jsx("input",{type:"checkbox",checked:I,onChange:s=>M(s.target.checked),className:"w-6 h-6 mt-2 border rounded"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-2xl font-semibold mb-2",children:"Sold Out"}),e.jsx("input",{type:"checkbox",checked:U,onChange:s=>P(s.target.checked),className:"w-6 h-6 mt-2 border rounded"})]})]})]}),Gallery:e.jsxs("div",{className:"p-6 ",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-800 mb-6 ",children:"Upload Your Images"}),"Step2"]}),e.jsx(Z,{onUploadSuccess:G,imagesUrls:w,isUploading:y})]}),"Customer Reviews":e.jsxs("div",{className:"p-6 space-y-4",children:[e.jsxs("div",{className:"flex justify-between flex-wrap",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Customer Reviews"}),e.jsx("button",{className:"bg-gradient-to-r w-[150px]  from-blue-500 to-indigo-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all",onClick:q,children:"Submit"})]}),e.jsx("div",{className:"flex flex-wrap gap-6 w-full ",children:n.map((s,a)=>e.jsxs("div",{className:"p-4 border flex flex-col rounded-lg space-y-2 w-full sm:w-96 md:w-[47%] ",children:[e.jsxs("div",{className:"flex gap-4 flex-wrap justify-between",children:[e.jsxs("div",{className:"flex gap-4 flex-wrap",children:[e.jsx("input",{type:"text",placeholder:"Customer Name",value:s.name,onChange:l=>b(a,"name",l.target.value),className:"w-full sm:w-40 p-2 border rounded-lg"}),e.jsx("div",{className:"flex items-center gap-1",children:[1,2,3,4,5].map(l=>e.jsx("svg",{onClick:()=>b(a,"rating",l),xmlns:"http://www.w3.org/2000/svg",fill:l<=s.rating?"#F59E0B":"#D1D5DB",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-6 h-6 cursor-pointer",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.999 1.49l2.93 5.93 6.54.953-4.735 4.62 1.117 6.516-5.852-3.076-5.852 3.076 1.117-6.516-4.735-4.62 6.54-.953 2.93-5.93z"})},l))})]}),e.jsx("button",{onClick:()=>Y(a),className:"text-red-500 py-1 px-3 rounded-lg",children:e.jsx(ee,{})})]}),e.jsx("textarea",{placeholder:"Review Description",value:s.description,onChange:l=>b(a,"description",l.target.value),className:"w-full p-2 h-36 border rounded-lg"})]},a))}),e.jsx("button",{onClick:W,className:"mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg",children:"Add More"})]})};return e.jsxs("div",{className:"bg-gray-50 min-h-screen py-4 flex flex-col pb-5",children:[e.jsx("h1",{className:"text-[32px] font-bold pb-8 px-10",children:"Add Room"}),e.jsx(se,{tabNames:$,tabContent:J,isUploading:y})]})};export{ue as default};