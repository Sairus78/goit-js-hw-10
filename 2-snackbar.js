import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i}from"./assets/vendor-BbbuE1sJ.js";const t=document.querySelector(".form");t.addEventListener("submit",o=>{o.preventDefault(),t.reset();const s=Number(t.elements.delay.value),m=t.elements.state.value;new Promise((e,r)=>{setTimeout(()=>{m==="fulfilled"?e(s):r(s)},s)}).then(e=>{i.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,timeout:5e3,position:"topRight"})}).catch(e=>{i.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,timeout:5e3,position:"topRight"})})});
//# sourceMappingURL=2-snackbar.js.map
