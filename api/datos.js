let headers = new Headers({"Content-Type": "application/json"});
const puerto = 4002;

const postReclutas = async(arg)=>{
    let config = {
        method: "POST", 
        headers: headers, 
        body:JSON.stringify(arg)
    };
    return await ( await fetch(`http://localhost:${puerto}/reclutas/`, config) ).json();
}

const postTeams = async(arg)=>{
    arg.idTeams = (arg.idTeams) ? arg.idTeams : Date.now();
    let config = {
        method: "POST", 
        headers: headers, 
        body:JSON.stringify(arg)
    };
    return await ( await fetch(`http://localhost:${puerto}/team/`, config) ).json();
}

const postSkills = async(arg)=>{
    let config = {
        method: "POST", 
        headers: headers, 
        body:JSON.stringify(arg)
    };
    return await ( await fetch(`http://localhost:${puerto}/skill/`, config) ).json();
}

const postModulosSkills = async(arg)=>{
    let config = {
        method: "POST", 
        headers: headers, 
        body:JSON.stringify(arg)
    };
    return await ( await fetch(`http://localhost:${puerto}/moduloSkills/`, config) ).json();
}

const postEvaluations = async(arg)=>{
    let config = {
        method: "POST", 
        headers: headers, 
        body:JSON.stringify(arg)
    };
    return await ( await fetch(`http://localhost:${puerto}/evaluacion/`, config) ).json();
}

const getReclutas = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/reclutas/`, config) ).json();
} 

const getTeams = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/team/`, config) ).json();
} 

const getSkills = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/skill/`, config) ).json();
} 

const getModulosSkills = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/moduloSkills/`, config) ).json();
} 

const getEvaluacion = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/evaluacion/`, config) ).json();
} 

const filtrarReclutas = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/reclutas/?fechaIngresoProgramaRec_gte=2023-03-08`, config) ).json();
} 

const filtrarReclutasEdad = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/reclutas/?edadRec_gte=1&edadRec_lte=18`, config) ).json();
}

const filterListarReprobados = async()=>{
    let config = {
        method: "GET", 
        headers: headers
    };
    return await ( await fetch(`http://localhost:${puerto}/evaluacion/?notaEval_lte=69/`, config) ).json();
}

export default {
    postReclutas,
    postTeams,
    postSkills,
    postModulosSkills,
    postEvaluations,
    getReclutas,
    getTeams,
    getSkills,
    getModulosSkills,
    getEvaluacion,
    filtrarReclutas,
    filtrarReclutasEdad,
    filterListarReprobados
}