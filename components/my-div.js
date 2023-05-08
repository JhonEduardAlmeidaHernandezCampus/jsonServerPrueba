import config from "../config/config.js";

export default class MyForm extends HTMLElement {
    static url = import.meta.url
    static async components() {
        return await (await fetch(config.uri(MyForm.url))).text();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    /* ------------------------------------------------------------------------------------- */
    /* Mostrar el formulario de Reclutas */
    handleMostrarRecluta(e){
        (e.type === "click") ? this.MostrarRecluta() :undefined;
    }
    MostrarRecluta(){
        this.mostrarFormularioRecluta.style.display = "flex"
        this.mostrarFormularioTeam.style.display = "none"
        this.mostrarFormularioSkill.style.display = "none"
        this.mostrarFormularioModuloSkill.style.display = "none"
        this.mostrarFormularioEvaluacion.style.display = "none"
    }
    /* --------------------------------- */

    /* Mostrar el formulario de Team */
    handleMostrarTeam(e){
        (e.type === "click") ? this.mostrarTeam() :undefined;
    }
    mostrarTeam(){
        this.mostrarFormularioTeam.style.display = "flex"
        this.mostrarFormularioRecluta.style.display = "none"
        this.mostrarFormularioSkill.style.display = "none"
        this.mostrarFormularioModuloSkill.style.display = "none"
        this.mostrarFormularioEvaluacion.style.display = "none"
    }
    /* --------------------------------- */

    /* Mostrar el formulario de Skill */
    handleMostrarSkill(e){
        (e.type === "click") ? this.mostrarSkill() :undefined;
    }
    mostrarSkill(){
        this.mostrarFormularioTeam.style.display = "none"
        this.mostrarFormularioRecluta.style.display = "none"
        this.mostrarFormularioSkill.style.display = "flex"
        this.mostrarFormularioModuloSkill.style.display = "none"
        this.mostrarFormularioEvaluacion.style.display = "none"
    }
    /* --------------------------------- */

    /* Mostrar el formulario de Modulo Skill */
    handleMostrarModuloSkill(e){
        (e.type === "click") ? this.MostrarModuloSkill() :undefined;
    }
    MostrarModuloSkill(){
        this.mostrarFormularioTeam.style.display = "none"
        this.mostrarFormularioRecluta.style.display = "none"
        this.mostrarFormularioSkill.style.display = "none"
        this.mostrarFormularioModuloSkill.style.display = "flex"
        this.mostrarFormularioEvaluacion.style.display = "none"
    }
    /* --------------------------------- */

    /* Mostrar el formulario de Evaluacion */
    handleMostrarEvaluacion(e){
        (e.type === "click") ? this.MostrarEvaluacion() :undefined;
    }

    MostrarEvaluacion(){
        this.mostrarFormularioTeam.style.display = "none"
        this.mostrarFormularioRecluta.style.display = "none"
        this.mostrarFormularioSkill.style.display = "none"
        this.mostrarFormularioModuloSkill.style.display = "none"
        this.mostrarFormularioEvaluacion.style.display = "flex"
    }
    /* --------------------------------- */
    /* ------------------------------------------------------------------------------------ */

    handleListar(e){
        (e.type === "click") ? this.listarReclutasFecha(e) : undefined;
    }

    handleListarEdad(e){
        (e.type === "click") ? this.listarReclutasEdad(e) : undefined;
    }

    handleListarReprobados(e){
        (e.type === "click") ? this.listarReclutasReprobados(e) : undefined;
    }

    handleEvent(e) {
        e.preventDefault();
        (e.type === "submit") ? this.myTeam(e) : undefined;
        (e.type === "submit") ? this.myRecluta(e) : undefined;
        (e.type === "submit") ? this.mySkill(e) : undefined;
        (e.type === "submit") ? this.myModuloSkill(e) : undefined;
        (e.type === "submit") ? this.myEvaluacion(e) : undefined;
    }

    listarReclutasReprobados(e){
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});

        ws.postMessage({type: "filterListarReprobados"});

        ws.addEventListener("message", (e) => {
            let datos = e.data;
            datos.map((val, id) => {
              const fila = document.createElement("div");
              fila.innerHTML = `
                                <div class="contenedorProducto">

                                    <h3>IDENTIFICACION DEL RECLUTA</h3>
                                        <p>${val.identificacionRec}</p>
                                    <h3>ID DEL MODULO RECLUTA</h3>
                                        <p>${val.idModuloSkill}</p>
                                    <h3>NOTA</h3>
                                        <p>${val.notaEval}</p>

                                </div>
                               `;
                this.pintarFiltradoReprobados.appendChild(fila);
         
            });

            ws.terminate();
          });  
        
    }

    listarReclutasFecha(){
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});

        ws.postMessage({type: "filtrarReclutas"});

        ws.addEventListener("message", (e) => {
            let datos = e.data;
            datos.map((val, id) => {
              const fila = document.createElement("div");
              fila.innerHTML = `
                                <div class="contenedorProducto">

                                    <h3>ID DEL RECLUTA</h3>
                                        <p>${val.id}</p>
                                    <h3>IDENTIFICACION DEL RECLUTA</h3>
                                        <p>${val.identificacionRec}</p>
                                    <h3>NOMBRE DEL RECLUTA</h3>
                                        <p>${val.nombreRec}</p>
                                    <h3>EDAD DEL RECLUTA</h3>
                                        <p>${val.edadRec}</p>
                                    <h3>TELEFONO DEL RECLUTA</h3>
                                        <p>${val.telefonoRec}</p>
                                    <h3>EMAIL DEL RECLUTA</h3>
                                        <p>${val.emailRec}</p>
                                    <h3>DIRECCION DEL RECLUTA</h3>
                                        <p>${val.direccionRec}</p>
                                    <h3>FECHA DE NACIMIENTO DEL RECLUTA</h3>
                                        <p>${val.fechaNacimientoRec}</p>
                                    <h3>FECHA DE INGRESO DEL RECLUTA</h3>
                                        <p>${val.fechaIngresoProgramaRec}</p>

                                </div>
                               `;
                this.pintarFiltrado.appendChild(fila);
         
            });

            ws.terminate();
          });  
        
    }

    listarReclutasEdad(){
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});

        ws.postMessage({type: "filtrarReclutasEdad"});

        ws.addEventListener("message", (e) => {
            let datos = e.data;
            datos.map((val, id) => {
              const fila = document.createElement("div");
              fila.innerHTML = `
                                <div class="contenedorProducto" >

                                    <h3>ID DEL RECLUTA</h3>
                                        <p>${val.id}</p>
                                    <h3>IDENTIFICACION DEL RECLUTA</h3>
                                        <p>${val.identificacionRec}</p>
                                    <h3>NOMBRE DEL RECLUTA</h3>
                                        <p>${val.nombreRec}</p>
                                    <h3>EDAD DEL RECLUTA</h3>
                                        <p>${val.edadRec}</p>
                                    <h3>TELEFONO DEL RECLUTA</h3>
                                        <p>${val.telefonoRec}</p>
                                    <h3>EMAIL DEL RECLUTA</h3>
                                        <p>${val.emailRec}</p>
                                    <h3>DIRECCION DEL RECLUTA</h3>
                                        <p>${val.direccionRec}</p>
                                    <h3>FECHA DE NACIMIENTO DEL RECLUTA</h3>
                                        <p>${val.fechaNacimientoRec}</p>
                                    <h3>FECHA DE INGRESO DEL RECLUTA</h3>
                                        <p>${val.fechaIngresoProgramaRec}</p>

                                </div>
                               `;
                this.pintarFiltradoEdad.appendChild(fila);
         
            });

            ws.terminate();
          });  
        
    }

    /* handleClick(e) {
        e.preventDefault();
        if(e.type === "click"){
            this.mostrarFactura();
        } else if(e.type === "submit"){
            this.myFactura(e)
        } else{
            undefined;
        }
    } */

    myRecluta(e) {
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});
            let guardarRecluta = Object.fromEntries(new FormData(e.target));

            switch (e.submitter.dataset.valor) {
                case "postRecluta":
                    let confirmar = confirm("¿Desea agregar este recluta?")
                    if(confirmar == true){
                        ws.postMessage({type: "postReclutas", arg: guardarRecluta});
                        alert("recluta agregado exitosamente")
                    }
                    
                    break;
                    
                case "getRecluta":
                    ws.postMessage({type: "getReclutas", arg: guardarRecluta});
                    break;
                    
                default:
                    break;
            }
    
            ws.addEventListener("message", (e) => {
                let datos = e.data;
                datos.map((val, id) => {
                  const fila = document.createElement("div");
                  fila.innerHTML = `
                                    <div class="contenedorProducto">

                                        <h3>ID DEL RECLUTA</h3>
                                            <p>${val.id}</p>
                                        <h3>IDENTIFICACION DEL RECLUTA</h3>
                                            <p>${val.identificacionRec}</p>
                                        <h3>NOMBRE DEL RECLUTA</h3>
                                            <p>${val.nombreRec}</p>
                                        <h3>EDAD DEL RECLUTA</h3>
                                            <p>${val.edadRec}</p>
                                        <h3>TELEFONO DEL RECLUTA</h3>
                                            <p>${val.telefonoRec}</p>
                                        <h3>EMAIL DEL RECLUTA</h3>
                                            <p>${val.emailRec}</p>
                                        <h3>DIRECCION DEL RECLUTA</h3>
                                            <p>${val.direccionRec}</p>
                                        <h3>FECHA DE NACIMIENTO DEL RECLUTA</h3>
                                            <p>${val.fechaNacimientoRec}</p>
                                        <h3>FECHA DE INGRESO DEL RECLUTA</h3>
                                            <p>${val.fechaIngresoProgramaRec}</p>

                                            <input type="button" data-valor="Eliminar" id="${val.id}" value="Eliminar">

                                    </div>
                                   `;
                    this.pintarReclutas.appendChild(fila);
                
                const botonEliminar = fila.querySelector("[data-valor=Eliminar]");
                    botonEliminar.addEventListener("click", (e) => {
                        e.preventDefault();
                        let confirmarEliminar = confirm("¿Desea eliminar este recluta?")
                        if(confirmarEliminar == true){
                            fetch(`http://localhost:4002/reclutas/${e.target.id}`, { method: "DELETE" })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error));
                        }
                    });
                    
                });
                ws.terminate();
              });   
    }

    myTeam(e) {
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});
            let guardarRecluta = Object.fromEntries(new FormData(e.target));

            switch (e.submitter.dataset.valor) {
                case "postTeam":
                    let confirmar = confirm("¿Desea agregar este team?")
                    if(confirmar == true){
                        ws.postMessage({type: "postTeams", arg: guardarRecluta});
                        alert("team agregado exitosamente")
                    }
                    
                    break;
                    
                case "getTeam":
                    ws.postMessage({type: "getTeams", arg: guardarRecluta});
                    break;
                    
                default:
                    break;
            }
    
            ws.addEventListener("message", (e) => {
                let datos = e.data;
                datos.forEach((val, id) => {
                  const fila = document.createElement("div");
                  fila.innerHTML = `
                                    <div class="contenedorProducto">

                                        <h3>ID DEL TEAM</h3>
                                            <p>${val.id}</p>
                                        <h3>NOMBRE DEL TEAM</h3>
                                            <p>${val.nombreTeam}</p>
                                        <h3>NOMBRE DEL TRAINER DE ESE TEAM</h3>
                                            <p>${val.trainer_asociado}</p>

                                            <input type="button" data-valor="Eliminar" id="${val.id}" value="Eliminar">

                                    </div>
                                   `;
                    this.pintarTeams.appendChild(fila);
                
                const botonEliminar = fila.querySelector("[data-valor=Eliminar]");
                    botonEliminar.addEventListener("click", (e) => {
                        e.preventDefault();
                        let confirmarEliminar = confirm("¿Desea eliminar este team?")
                        if(confirmarEliminar == true){
                            fetch(`http://localhost:4002/team/${e.target.id}`, { method: "DELETE" })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error));
                        }
                    });
                });
                ws.terminate();
              });   
    }

    mySkill(e) {
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});
            let guardarRecluta = Object.fromEntries(new FormData(e.target));

            switch (e.submitter.dataset.valor) {
                case "postSkill":
                    let confirmar = confirm("¿Desea agregar esta Skill?")
                    if(confirmar == true){
                        ws.postMessage({type: "postSkills", arg: guardarRecluta});
                        alert("Skill agregado exitosamente")
                    }
                    
                    break;
                    
                case "getSkill":
                    ws.postMessage({type: "getSkills", arg: guardarRecluta});
                    break;
                    
                default:
                    break;
            }
    
            ws.addEventListener("message", (e) => {
                let datos = e.data;
                datos.forEach((val, id) => {
                  const fila = document.createElement("div");
                  fila.innerHTML = `
                                    <div class="contenedorProducto">

                                        <h3>ID DE LA SKILL</h3>
                                            <p>${val.IdSkill}</p>
                                        <h3>NOMBRE DE LA SKILL</h3>
                                            <p>${val.nombreSkill}</p>
        
                                            <input type="button" data-valor="Eliminar" id="${val.id}" value="Eliminar">

                                    </div>
                                   `;
                    this.pintarSkills.appendChild(fila);
                
                const botonEliminar = fila.querySelector("[data-valor=Eliminar]");
                    botonEliminar.addEventListener("click", (e) => {
                        e.preventDefault();
                        let confirmarEliminar = confirm("¿Deseas eliminar esta Skill?")
                        if(confirmarEliminar == true){
                            fetch(`http://localhost:4002/skill/${e.target.id}`, { method: "DELETE" })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error));
                        }
                    });
                    
                });
                ws.terminate();
              });   
    }

    myModuloSkill(e) {
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});
            let guardarRecluta = Object.fromEntries(new FormData(e.target));

            switch (e.submitter.dataset.valor) {
                case "postModuloSkill":
                    let confirmar = confirm("¿Desea agregar este modulo?")
                    if(confirmar == true){
                        ws.postMessage({type: "postModulosSkills", arg: guardarRecluta});
                        alert("Modulo agregado exitosamente")
                    }
                    
                    break;
                    
                case "getModuloSkill":
                    ws.postMessage({type: "getModulosSkills", arg: guardarRecluta});
                    break;
                    
                default:
                    break;
            }
    
            ws.addEventListener("message", (e) => {
                let datos = e.data;
                datos.forEach((val, id) => {
                  const fila = document.createElement("div");
                  fila.innerHTML = `
                                    <div class="contenedorProducto">

                                        <h3>ID SKILLS</h3>
                                            <p>${val.idModuloSkill}</p>
                                        <h3>NOMBRE DEL MODULO</h3>
                                            <p>${val.nombreModuloSkill}</p>

                                            <input type="button" data-valor="Eliminar" id="${val.id}" value="Eliminar">

                                    </div>
                                   `;
                    this.pintarModuloSkills.appendChild(fila);
                
                const botonEliminar = fila.querySelector("[data-valor=Eliminar]");
                    botonEliminar.addEventListener("click", (e) => {
                        e.preventDefault();
                        let confirmarEliminar = confirm("¿Desea eliminar este modulo?")
                        if(confirmarEliminar == true){
                            fetch(`http://localhost:4002/moduloSkills/${e.target.id}`, { method: "DELETE" })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error));
                        }
                    });
                    
                });
                ws.terminate();
              });   
    }

    myEvaluacion(e) {
        let ws = new Worker("../config/wsMyDatos.js", {type: "module"});
            let guardarRecluta = Object.fromEntries(new FormData(e.target));

            switch (e.submitter.dataset.valor) {
                case "postEvaluacion":
                    let confirmar = confirm("¿Desea agregar esta evaluación?")
                    if(confirmar == true){
                        ws.postMessage({type: "postEvaluations", arg: guardarRecluta});
                        alert("Evaluación agregada exitosamente")
                    }
                    
                    break;
                    
                case "getEvaluacion":
                    ws.postMessage({type: "getEvaluacion", arg: guardarRecluta});
                    break;
                    
                default:
                    break;
            }
    
            ws.addEventListener("message", (e) => {
                let datos = e.data;
                datos.forEach((val, id) => {
                  const fila = document.createElement("div");
                  fila.innerHTML = `
                                    <div class="contenedorProducto">

                                        <h3>IDENTIFICACION DEL RECLUTA</h3>
                                            <p>${val.identificacionRec}</p>
                                        <h3>ID DEL MODULO RECLUTA</h3>
                                            <p>${val.idModuloSkill}</p>
                                        <h3>NOTA</h3>
                                            <p>${val.notaEval}</p>
                            
                                            <input type="button" data-valor="Eliminar" id="${val.id}" value="Eliminar">

                                    </div>
                                   `;
                    this.pintarEvaluacion.appendChild(fila);
                
                const botonEliminar = fila.querySelector("[data-valor=Eliminar]");
                    botonEliminar.addEventListener("click", (e) => {
                        e.preventDefault();
                        let confirmarEliminar = confirm("¿Desea eliminar esta evaluación?")
                        if(confirmarEliminar == true){
                            fetch(`http://localhost:4002/evaluacion/${e.target.id}`, { method: "DELETE" })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error));
                        }
                    });
                    
                });
                ws.terminate();
              });   
    }
    
    connectedCallback() {
        Promise.resolve(MyForm.components()).then(html => {
            this.shadowRoot.innerHTML = html;

            /* Seleccionamos el boton y el formulario de recluta */
            this.mostrarFormReclutas = this.shadowRoot.querySelector("#mostrarFormReclutas")
            this.mostrarFormReclutas.addEventListener("click", this.handleMostrarRecluta.bind(this))
            this.mostrarFormularioRecluta = this.shadowRoot.querySelector("#mostrarFormularioRecluta")
            /* ------------------------------------------------- */

            /* Seleccionamos el boton y el formulario de team */
            this.mostrarFormTeam = this.shadowRoot.querySelector("#mostrarFormTeam")
            this.mostrarFormTeam.addEventListener("click", this.mostrarTeam.bind(this))
            this.mostrarFormularioTeam = this.shadowRoot.querySelector("#mostrarFormularioTeam")
            /* ---------------------------------------------- */
            
            /* Seleccionamos el boton y el formulario de skill */
            this.mostrarFormSkill = this.shadowRoot.querySelector("#mostrarFormSkill")
            this.mostrarFormSkill.addEventListener("click", this.handleMostrarSkill.bind(this))
            this.mostrarFormularioSkill = this.shadowRoot.querySelector("#mostrarFormularioSkill")
            /* ----------------------------------------------- */

            /* Seleccionamos el boton y el formulario de Modulo Skill */
            this.mostrarFormModuloSkill = this.shadowRoot.querySelector("#mostrarFormModuloSkill")
            this.mostrarFormModuloSkill.addEventListener("click", this.handleMostrarModuloSkill.bind(this))
            this.mostrarFormularioModuloSkill = this.shadowRoot.querySelector("#mostrarFormularioModuloSkill")
            /* ----------------------------------------------- */

            /* Seleccionamos el boton y el formulario de Evaluacion */
            this.mostrarFormEvaluacion = this.shadowRoot.querySelector("#mostrarFormEvaluacion")
            this.mostrarFormEvaluacion.addEventListener("click", this.handleMostrarEvaluacion.bind(this))
            this.mostrarFormularioEvaluacion = this.shadowRoot.querySelector("#mostrarFormularioEvaluacion")
            /* ----------------------------------------------- */

            /* Guardamos cada uno de los datos de los distintos formularios */
            this.myFormularioRecluta = this.shadowRoot.querySelector("#myFormularioRecluta");
            this.myFormularioRecluta.addEventListener("submit", this.handleEvent.bind(this));
            this.pintarReclutas = this.shadowRoot.querySelector("#tablaReclutas")

            this.myFormularioTeam = this.shadowRoot.querySelector("#myFormularioTeam");
            this.myFormularioTeam.addEventListener("submit", this.handleEvent.bind(this));
            this.pintarTeams = this.shadowRoot.querySelector("#tablaTeams")

            this.myFormularioSkill = this.shadowRoot.querySelector("#myFormularioSkill");
            this.myFormularioSkill.addEventListener("submit", this.handleEvent.bind(this));
            this.pintarSkills = this.shadowRoot.querySelector("#tablaSkills")

            this.myFormularioModuloSkill = this.shadowRoot.querySelector("#myFormularioModuloSkill");
            this.myFormularioModuloSkill.addEventListener("submit", this.handleEvent.bind(this));
            this.pintarModuloSkills = this.shadowRoot.querySelector("#tablaModulosSkills")

            this.myFormularioEvaluacion = this.shadowRoot.querySelector("#myFormularioEvaluacion");
            this.myFormularioEvaluacion.addEventListener("submit", this.handleEvent.bind(this));
            this.pintarEvaluacion = this.shadowRoot.querySelector("#tablaEvaluacion")
            /* ----------------------------------------------------------- */

            /* Boton Listar fecha*/
            this.botonListar = this.shadowRoot.querySelector("#filterListar");
            this.botonListar.addEventListener("click", this.handleListar.bind(this));
            this.pintarFiltrado = this.shadowRoot.querySelector("#tablaReclutas");

            /* Boton Listar edad*/
            this.filterListarEdad = this.shadowRoot.querySelector("#filterListarEdad");
            this.filterListarEdad.addEventListener("click", this.handleListarEdad.bind(this));
            this.pintarFiltradoEdad = this.shadowRoot.querySelector("#tablaReclutas");
           
            /* Boton Listar reprobados*/
            this.filterListarReprobados = this.shadowRoot.querySelector("#filterListarReprobados");
            this.filterListarReprobados.addEventListener("click", this.handleListarReprobados.bind(this));
            this.pintarFiltradoReprobados = this.shadowRoot.querySelector("#tablaEvaluacion");
           
        })
    }
}
customElements.define(config.name(MyForm.url), MyForm);