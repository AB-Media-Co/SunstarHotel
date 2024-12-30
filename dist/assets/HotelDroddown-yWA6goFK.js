import{r as o,j as e}from"./index-CEKrv-KS.js";import{a as h}from"./axios-upsvKRUO.js";import{C as K}from"./Calendar-Cv6n1v6a.js";import"./index-DjKJqAo0.js";import"./Icons-5FvLXtNf.js";const p=[{name:"Hotel Sunstar Residency",id:"14494",apiKey:"164638176786a1a258-c6ea-11ec-9"},{name:"Hotel Sunstar Grand",id:"14492",apiKey:"431032638481c78c0e-cd20-11ec-9"},{name:"Hotel Sunstar Heights",id:"15282",apiKey:"520246986786a91364-c6ea-11ec-9"},{name:"Hotel Sunstar Heritage",id:"14493",apiKey:"107320434586afe643-c6ea-11ec-9"},{name:"Hotel Sunshine",id:"14495",apiKey:"77963264823686bfcb-d038-11ec-9"},{name:"The Suncourt Hotel Yatri",id:"14496",apiKey:"43431464258699abee-c6ea-11ec-9"}],O=()=>{var b,N;const[d,f]=o.useState(""),[r,R]=o.useState(null),[x,v]=o.useState(null),[g,w]=o.useState(null),[u,H]=o.useState(null),[i,S]=o.useState(null),[c,I]=o.useState(null),[m,C]=o.useState(null),[D,y]=o.useState(!1),k=async(s,t)=>{try{const a=await h.get("https://cors-anywhere.herokuapp.com/https://live.ipms247.com/booking/reservation_api/listing.php",{params:{request_type:"HotelList",HotelCode:s,APIKey:t,language:"en"}});R(a.data[0])}catch(a){console.error("Error fetching hotel data:",a.message)}},T=async(s,t)=>{var a,n;try{const l=await h.post("https://cors-anywhere.herokuapp.com/https://live.ipms247.com/pmsinterface/pms_connectivity.php",{RES_Request:{Request_Type:"RoomInfo",NeedPhysicalRooms:1,Authentication:{HotelCode:s,AuthCode:t}}},{headers:{"Content-Type":"application/json"}});v(l.data.RoomInfo.RoomTypes.RoomType||[]),H(l.data.RoomInfo.RatePlans.RatePlan||[]),w(((n=(a=l.data)==null?void 0:a.RoomInfo)==null?void 0:n.RateTypes.RateType)||[])}catch(l){console.error("Error fetching room data:",l.message)}},j=async(s,t)=>{var a;if(!(!c||!m))try{const n=await h.post("https://cors-anywhere.herokuapp.com/https://live.ipms247.com/index.php/page/service.kioskconnectivity",{RES_Request:{Request_Type:"RoomAvailability",Authentication:{HotelCode:s,AuthCode:t},RoomData:{from_date:c,to_date:m}}},{headers:{"Content-Type":"application/json"}});S((a=n.data)==null?void 0:a.Success)}catch(n){console.error("Error fetching room availability:",n.message)}},_=s=>{const t=s.target.value,a=p.find(n=>n.id===t);f(t),a&&(k(a.id,a.apiKey),T(a.id,a.apiKey),j(a.id,a.apiKey))};return o.useEffect(()=>{if(d&&c&&m){const s=p.find(t=>t.id===d);s&&j(s.id,s.apiKey)}},[c,m,d]),e.jsx("div",{className:"min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-10",children:e.jsxs("div",{className:"max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden",children:[e.jsxs("div",{className:"p-6",children:[e.jsx("label",{htmlFor:"hotelDropdown",className:"block text-xl font-semibold text-gray-700 mb-4",children:"Select a Hotel:"}),e.jsxs("select",{id:"hotelDropdown",value:d,onChange:_,className:"w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700",children:[e.jsx("option",{value:"",disabled:!0,children:"-- Choose a Hotel --"}),p.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),e.jsx("button",{onClick:()=>y(!0),children:"SelectDate"}),D&&e.jsx(K,{setCheckInDate:I,setCheckOutDate:C,setOpenCalender:y})]}),r&&e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-800 mb-6",children:r.Hotel_Name}),e.jsxs("p",{className:"text-gray-700 mb-2",children:[e.jsx("strong",{children:"City:"})," ",r.City]}),e.jsxs("p",{className:"text-gray-700 mb-2",children:[e.jsx("strong",{children:"State:"})," ",r.State]}),e.jsxs("p",{className:"text-gray-700 mb-2",children:[e.jsx("strong",{children:"Country:"})," ",r.Country]}),e.jsx("p",{className:"text-gray-700 mb-4",children:e.jsx("strong",{children:"Description:"})}),e.jsx("div",{className:"text-gray-700 mb-4",dangerouslySetInnerHTML:{__html:r.Hotel_Description}}),e.jsx("p",{className:"text-gray-700 mb-4",children:e.jsx("strong",{children:"Facilities:"})}),e.jsx("div",{className:"text-gray-700 mb-6",dangerouslySetInnerHTML:{__html:r.Facilities_Attractions}}),e.jsxs("p",{className:"text-gray-700 mb-6",children:[e.jsx("strong",{children:"Booking Link:"})," ",e.jsx("a",{href:r.BookingEngineURL,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 underline hover:text-blue-800",children:"Book Now"})]}),e.jsx("h4",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Images:"}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-6",children:(b=r.HotelImages)==null?void 0:b.map((s,t)=>e.jsx("img",{src:s,alt:`Hotel Image ${t+1}`,className:"rounded-lg shadow-md hover:shadow-xl"},t))})]}),i?e.jsx("div",{children:(N=i==null?void 0:i.RoomList)==null?void 0:N.map(s=>{var t;return e.jsxs("div",{className:"p-6",children:[e.jsx("div",{className:"border p-4 rounded-lg shadow-md bg-white hover:shadow-lg",children:s.RoomtypeName}),e.jsx("h1",{className:"text-[28px] py-8",children:"Inside Rooms"}),(t=s==null?void 0:s.RoomData)==null?void 0:t.map(a=>e.jsx("div",{className:"border p-4 rounded-lg shadow-md bg-white hover:shadow-lg",children:e.jsx("span",{children:a.RoomName})},a.RoomID))]},s.RoomtypeID)})}):x&&e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-6",children:"Room Information"}),e.jsxs("div",{className:"mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md",children:[e.jsx("h5",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Room Types"}),e.jsx("div",{className:"mt-6",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:x.map(s=>{var t;return e.jsxs("div",{children:[e.jsxs("div",{className:"border p-4 rounded-lg shadow-md bg-white hover:shadow-lg",children:[e.jsx("span",{children:s.Name})," - Rate Type: ",s.RateType]}),e.jsx("h1",{className:"text-[28px] py-8",children:"Inside Rooms"}),(t=s==null?void 0:s.Rooms)==null?void 0:t.map(a=>e.jsx("div",{className:"border p-4 rounded-lg shadow-md bg-white hover:shadow-lg",children:e.jsx("span",{children:a.RoomName})},a.RoomID))]},s.RatePlanID)})})}),g&&u&&e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-6",children:"Rate Types and Plans"}),g.map(s=>e.jsxs("div",{className:"mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md",children:[e.jsx("h4",{className:"text-xl font-semibold text-gray-800 mb-4",children:s.Name}),e.jsx("div",{className:"",children:u.filter(t=>t.RateType===s.Name).map(t=>e.jsxs("div",{className:"border p-4 rounded-lg shadow-md bg-white hover:shadow-lg",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Plan Name:"})," ",t.Name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Rate Type:"})," ",t.RateType]})]},t.RatePlanID))})]},s.RateTypeID))]})]})]})]})})};export{O as default};