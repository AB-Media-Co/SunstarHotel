var pe=e=>{throw TypeError(e)};var Z=(e,t,s)=>t.has(e)||pe("Cannot "+s);var r=(e,t,s)=>(Z(e,t,"read from private field"),s?s.call(e):t.get(e)),f=(e,t,s)=>t.has(e)?pe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),h=(e,t,s,a)=>(Z(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),l=(e,t,s)=>(Z(e,t,"access private method"),s);import{S as Qe,p as me,l as w,m as ee,n as V,o as Oe,q as te,t as ye,v as Fe,w as Ae,x as Be,y as ge,z as Se,r as O,A as x}from"./index-CEKrv-KS.js";import{s as xe,n as Re,a as I,u as D}from"./axiosInstance-2_WqCtWF.js";var R,i,K,y,P,$,A,S,G,M,_,U,k,B,z,n,j,se,re,ae,ie,ne,oe,he,we,Ce,Te=(Ce=class extends Qe{constructor(t,s){super();f(this,n);f(this,R);f(this,i);f(this,K);f(this,y);f(this,P);f(this,$);f(this,A);f(this,S);f(this,G);f(this,M);f(this,_);f(this,U);f(this,k);f(this,B);f(this,z,new Set);this.options=s,h(this,R,t),h(this,S,null),h(this,A,me()),this.options.experimental_prefetchInRender||r(this,A).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,i).addObserver(this),be(r(this,i),this.options)?l(this,n,j).call(this):this.updateResult(),l(this,n,ie).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ce(r(this,i),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ce(r(this,i),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,n,ne).call(this),l(this,n,oe).call(this),r(this,i).removeObserver(this)}setOptions(t,s){const a=this.options,d=r(this,i);if(this.options=r(this,R).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof w(this.options.enabled,r(this,i))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");l(this,n,he).call(this),r(this,i).setOptions(this.options),a._defaulted&&!ee(this.options,a)&&r(this,R).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,i),observer:this});const c=this.hasListeners();c&&ve(r(this,i),d,this.options,a)&&l(this,n,j).call(this),this.updateResult(s),c&&(r(this,i)!==d||w(this.options.enabled,r(this,i))!==w(a.enabled,r(this,i))||V(this.options.staleTime,r(this,i))!==V(a.staleTime,r(this,i)))&&l(this,n,se).call(this);const o=l(this,n,re).call(this);c&&(r(this,i)!==d||w(this.options.enabled,r(this,i))!==w(a.enabled,r(this,i))||o!==r(this,B))&&l(this,n,ae).call(this,o)}getOptimisticResult(t){const s=r(this,R).getQueryCache().build(r(this,R),t),a=this.createResult(s,t);return Ue(this,a)&&(h(this,y,a),h(this,$,this.options),h(this,P,r(this,i).state)),a}getCurrentResult(){return r(this,y)}trackResult(t,s){const a={};return Object.keys(t).forEach(d=>{Object.defineProperty(a,d,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(d),s==null||s(d),t[d])})}),a}trackProp(t){r(this,z).add(t)}getCurrentQuery(){return r(this,i)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=r(this,R).defaultQueryOptions(t),a=r(this,R).getQueryCache().build(r(this,R),s);return a.fetch().then(()=>this.createResult(a,s))}fetch(t){return l(this,n,j).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,y)))}createResult(t,s){var fe;const a=r(this,i),d=this.options,c=r(this,y),o=r(this,P),E=r(this,$),b=t!==a?t.state:r(this,K),{state:v}=t;let u={...v},T=!1,g;if(s._optimisticResults){const m=this.hasListeners(),H=!m&&be(t,s),q=m&&ve(t,a,s,d);(H||q)&&(u={...u,...Be(v.data,t.options)}),s._optimisticResults==="isRestoring"&&(u.fetchStatus="idle")}let{error:L,errorUpdatedAt:F,status:Q}=u;if(s.select&&u.data!==void 0)if(c&&u.data===(o==null?void 0:o.data)&&s.select===r(this,G))g=r(this,M);else try{h(this,G,s.select),g=s.select(u.data),g=ge(c==null?void 0:c.data,g,s),h(this,M,g),h(this,S,null)}catch(m){h(this,S,m)}else g=u.data;if(s.placeholderData!==void 0&&g===void 0&&Q==="pending"){let m;if(c!=null&&c.isPlaceholderData&&s.placeholderData===(E==null?void 0:E.placeholderData))m=c.data;else if(m=typeof s.placeholderData=="function"?s.placeholderData((fe=r(this,_))==null?void 0:fe.state.data,r(this,_)):s.placeholderData,s.select&&m!==void 0)try{m=s.select(m),h(this,S,null)}catch(H){h(this,S,H)}m!==void 0&&(Q="success",g=ge(c==null?void 0:c.data,m,s),T=!0)}r(this,S)&&(L=r(this,S),g=r(this,M),F=Date.now(),Q="error");const J=u.fetchStatus==="fetching",X=Q==="pending",Y=Q==="error",le=X&&J,de=g!==void 0,C={status:Q,fetchStatus:u.fetchStatus,isPending:X,isSuccess:Q==="success",isError:Y,isInitialLoading:le,isLoading:le,data:g,dataUpdatedAt:u.dataUpdatedAt,error:L,errorUpdatedAt:F,failureCount:u.fetchFailureCount,failureReason:u.fetchFailureReason,errorUpdateCount:u.errorUpdateCount,isFetched:u.dataUpdateCount>0||u.errorUpdateCount>0,isFetchedAfterMount:u.dataUpdateCount>b.dataUpdateCount||u.errorUpdateCount>b.errorUpdateCount,isFetching:J,isRefetching:J&&!X,isLoadingError:Y&&!de,isPaused:u.fetchStatus==="paused",isPlaceholderData:T,isRefetchError:Y&&de,isStale:ue(t,s),refetch:this.refetch,promise:r(this,A)};if(this.options.experimental_prefetchInRender){const m=N=>{C.status==="error"?N.reject(C.error):C.data!==void 0&&N.resolve(C.data)},H=()=>{const N=h(this,A,C.promise=me());m(N)},q=r(this,A);switch(q.status){case"pending":t.queryHash===a.queryHash&&m(q);break;case"fulfilled":(C.status==="error"||C.data!==q.value)&&H();break;case"rejected":(C.status!=="error"||C.error!==q.reason)&&H();break}}return C}updateResult(t){const s=r(this,y),a=this.createResult(r(this,i),this.options);if(h(this,P,r(this,i).state),h(this,$,this.options),r(this,P).data!==void 0&&h(this,_,r(this,i)),ee(a,s))return;h(this,y,a);const d={},c=()=>{if(!s)return!0;const{notifyOnChangeProps:o}=this.options,E=typeof o=="function"?o():o;if(E==="all"||!E&&!r(this,z).size)return!0;const p=new Set(E??r(this,z));return this.options.throwOnError&&p.add("error"),Object.keys(r(this,y)).some(b=>{const v=b;return r(this,y)[v]!==s[v]&&p.has(v)})};(t==null?void 0:t.listeners)!==!1&&c()&&(d.listeners=!0),l(this,n,we).call(this,{...d,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,n,ie).call(this)}},R=new WeakMap,i=new WeakMap,K=new WeakMap,y=new WeakMap,P=new WeakMap,$=new WeakMap,A=new WeakMap,S=new WeakMap,G=new WeakMap,M=new WeakMap,_=new WeakMap,U=new WeakMap,k=new WeakMap,B=new WeakMap,z=new WeakMap,n=new WeakSet,j=function(t){l(this,n,he).call(this);let s=r(this,i).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(Oe)),s},se=function(){l(this,n,ne).call(this);const t=V(this.options.staleTime,r(this,i));if(te||r(this,y).isStale||!ye(t))return;const a=Fe(r(this,y).dataUpdatedAt,t)+1;h(this,U,setTimeout(()=>{r(this,y).isStale||this.updateResult()},a))},re=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,i)):this.options.refetchInterval)??!1},ae=function(t){l(this,n,oe).call(this),h(this,B,t),!(te||w(this.options.enabled,r(this,i))===!1||!ye(r(this,B))||r(this,B)===0)&&h(this,k,setInterval(()=>{(this.options.refetchIntervalInBackground||Ae.isFocused())&&l(this,n,j).call(this)},r(this,B)))},ie=function(){l(this,n,se).call(this),l(this,n,ae).call(this,l(this,n,re).call(this))},ne=function(){r(this,U)&&(clearTimeout(r(this,U)),h(this,U,void 0))},oe=function(){r(this,k)&&(clearInterval(r(this,k)),h(this,k,void 0))},he=function(){const t=r(this,R).getQueryCache().build(r(this,R),this.options);if(t===r(this,i))return;const s=r(this,i);h(this,i,t),h(this,K,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},we=function(t){Se.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(r(this,y))}),r(this,R).getQueryCache().notify({query:r(this,i),type:"observerResultsUpdated"})})},Ce);function Pe(e,t){return w(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function be(e,t){return Pe(e,t)||e.state.data!==void 0&&ce(e,t,t.refetchOnMount)}function ce(e,t,s){if(w(t.enabled,e)!==!1){const a=typeof s=="function"?s(e):s;return a==="always"||a!==!1&&ue(e,t)}return!1}function ve(e,t,s,a){return(e!==t||w(a.enabled,e)===!1)&&(!s.suspense||e.state.status!=="error")&&ue(e,s)}function ue(e,t){return w(t.enabled,e)!==!1&&e.isStaleByTime(V(t.staleTime,e))}function Ue(e,t){return!ee(e.getCurrentResult(),t)}var Ee=O.createContext(!1),ke=()=>O.useContext(Ee);Ee.Provider;function De(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var He=O.createContext(De()),qe=()=>O.useContext(He),$e=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(t.isReset()||(e.retryOnMount=!1))},Me=e=>{O.useEffect(()=>{e.clearReset()},[e])},_e=({result:e,errorResetBoundary:t,throwOnError:s,query:a})=>e.isError&&!t.isReset()&&!e.isFetching&&a&&xe(s,[e.error,a]),ze=e=>{e.suspense&&(e.staleTime===void 0&&(e.staleTime=1e3),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3)))},Le=(e,t)=>e.isLoading&&e.isFetching&&!t,je=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Ie=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function Ke(e,t,s){var v,u,T,g,L;const a=x(),d=ke(),c=qe(),o=a.defaultQueryOptions(e);(u=(v=a.getDefaultOptions().queries)==null?void 0:v._experimental_beforeQuery)==null||u.call(v,o),o._optimisticResults=d?"isRestoring":"optimistic",ze(o),$e(o,c),Me(c);const E=!a.getQueryCache().get(o.queryHash),[p]=O.useState(()=>new t(a,o)),b=p.getOptimisticResult(o);if(O.useSyncExternalStore(O.useCallback(F=>{const Q=d?Re:p.subscribe(Se.batchCalls(F));return p.updateResult(),Q},[p,d]),()=>p.getCurrentResult(),()=>p.getCurrentResult()),O.useEffect(()=>{p.setOptions(o,{listeners:!1})},[o,p]),je(o,b))throw Ie(o,p,c);if(_e({result:b,errorResetBoundary:c,throwOnError:o.throwOnError,query:a.getQueryCache().get(o.queryHash)}))throw b.error;if((g=(T=a.getDefaultOptions().queries)==null?void 0:T._experimental_afterQuery)==null||g.call(T,o,b),o.experimental_prefetchInRender&&!te&&Le(b,d)){const F=E?Ie(o,p,c):(L=a.getQueryCache().get(o.queryHash))==null?void 0:L.promise;F==null||F.catch(Re).finally(()=>{p.updateResult()})}return o.notifyOnChangeProps?b:p.trackResult(b)}function W(e,t){return Ke(e,Te)}const Ge=async e=>{const t=localStorage.getItem("token");return(await I.post("/api/hotels/add",e,{headers:{Authorization:`Bearer ${t}`}})).data},Ne=async()=>(await I.get("/api/hotels")).data,Ve=async({id:e,data:t})=>{const s=localStorage.getItem("token");return(await I.put(`/api/hotels/${e}`,t,{headers:{Authorization:`Bearer ${s}`}})).data},We=async e=>{const t=localStorage.getItem("token");return(await I.delete(`/api/hotels/${e}`,{headers:{Authorization:`Bearer ${t}`}})).data},Je=async e=>{const t=localStorage.getItem("token");return(await I.post("/api/hotels/rooms/add",e,{headers:{Authorization:`Bearer ${t}`}})).data},Xe=async e=>{const t=localStorage.getItem("token");return(await I.get(`/api/hotels/rooms/${e}`,{headers:{Authorization:`Bearer ${t}`}})).data},Ye=async({id:e,data:t})=>{const s=localStorage.getItem("token");return(await I.put(`/api/hotels/rooms/${e}`,t,{headers:{Authorization:`Bearer ${s}`}})).data},Ze=async e=>{const t=localStorage.getItem("token");return(await I.delete(`/api/hotels/rooms/${e}`,{headers:{Authorization:`Bearer ${t}`}})).data},et=async()=>(await I.get("/api/hotels/getAllRooms")).data,tt=async e=>(await I.get(`/api/hotels/${e}`)).data,st=async e=>{const t=new FormData;return e.forEach(a=>t.append("images",a)),(await I.post("/api/images/upload",t,{headers:{"Content-Type":"multipart/form-data"}})).data},ot=()=>W({queryKey:["hotels"],queryFn:Ne}),ht=()=>{const e=x();return D({mutationFn:Ge,onSuccess:()=>{e.invalidateQueries(["hotels"])}})},ct=()=>{const e=x();return D({mutationFn:Ve,onSuccess:()=>{e.invalidateQueries(["hotels"])}})},ut=()=>{const e=x();return D({mutationFn:We,onSuccess:()=>{e.invalidateQueries(["hotels"])}})},lt=()=>{const e=x();return D({mutationFn:Je,onSuccess:()=>{e.invalidateQueries(["rooms"])}})},dt=e=>W({queryKey:["room",e],queryFn:()=>Xe(e)}),ft=()=>{const e=x();return D({mutationFn:Ye,onSuccess:(t,s)=>{e.invalidateQueries(["room",s.roomId]),e.invalidateQueries(["rooms"])},onError:t=>{console.error("Room Update Error:",t)}})},pt=()=>{const e=x();return D({mutationFn:Ze,onSuccess:()=>{e.invalidateQueries(["rooms"])}})},mt=()=>W({queryKey:["rooms"],queryFn:et}),yt=e=>W({queryKey:["hotels",e],queryFn:()=>tt(e)}),gt=()=>{const e=x();return D({mutationFn:st,onSuccess:()=>{e.invalidateQueries(["hotels"])},onError:t=>{console.error("Image Upload Error:",t)}})};export{ut as a,yt as b,mt as c,gt as d,ct as e,ht as f,pt as g,lt as h,dt as i,ft as j,ot as u};