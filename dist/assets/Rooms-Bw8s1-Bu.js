import{a as x,r as a,j as e,_ as i}from"./index-CEKrv-KS.js";import{c as D,g as E}from"./useHotelHook-3KAKPtEF.js";import{S as j,D as S}from"./DeletePopup-Co0xOzVI.js";import"./axiosInstance-2_WqCtWF.js";import"./axios-upsvKRUO.js";import"./Add-DzJWDV7D.js";import"./index-DjKJqAo0.js";const M=()=>{const{data:s,isLoading:m,isError:c,error:u}=D(),{mutate:f}=E(),p=o=>{d(`/admin/editRooms/${o}`)},d=x(),R=()=>{d("/admin/addRooms")},[n,t]=a.useState(!1),[r,l]=a.useState(null);console.log(r),a.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>document.body.style.overflow="auto"),[n]);const y=o=>{l(o),t(!0)},g=()=>{r&&f(r,{onSuccess:()=>{i.success("Room Deeleted Successfully"),t(!1),l(null)},onError:o=>{i.error(`Failed to delete Room: ${o.message}`),t(!1)}})},h=()=>{t(!1),l(null)};return m?e.jsx("p",{children:"Loading..."}):c?e.jsxs("p",{children:["Error: ",u.message]}):e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"Our Premium Rooms",data:s==null?void 0:s.rooms,type:"room",onEdit:p,onDelete:y,onAdd:R}),";",e.jsx(S,{isOpen:n,onConfirm:g,onCancel:h})]})};export{M as Rooms};