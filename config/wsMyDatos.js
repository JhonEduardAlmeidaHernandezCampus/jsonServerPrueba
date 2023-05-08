import datos from "../api/datos.js";

self.addEventListener("message", (e)=>{
    let res = datos[`${e.data.type}`]((e.data.arg) ? e.data.arg : undefined);
    Promise.resolve(res).then(res=>postMessage(res));
})