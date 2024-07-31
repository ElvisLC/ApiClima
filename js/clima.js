const contenedor=document.querySelector('·container')
const resultado=document.querySelector('#resultado')
const formulario=document.querySelector('#formulario')

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault();
    const ciudad=document.querySelector('#ciudad').value
    const pais=document.querySelector('#pais').value

    if(ciudad===''||pais===''){
        mostrarError('Los campos son obligatorios')
        return 
    }else{
        consultarAPI(ciudad,pais)
    }
}

function mostrarError(mensaje){
    const alerta=document.querySelector('.bg-red-100')

    if(!alerta){
        const alertaMsj=document.createElement('div');
        alertaMsj.classList.add('.bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center')
        alertaMsj.innerHTML=`
        <strong class="'font-bold">ERROR!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;
        resultado.appendChild(alertaMsj)

        setTimeout(()=>{
            alertaMsj.remove()
        },3000);
    }

}

function consultarAPI(ciudad,pais){
    //url imprimir resultado

    const appid='57096bb95aabc7994fdc948ca3833b97'
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}` 
    spinner()
    fetch(url)
    .then(respuesta=>{
        return respuesta.json()
    })
    .then(datos=>{
        console.log(datos);
        limpiarHTML()
        //VALIDACION

        if(datos.cod==='404'){
            mostrarError('La ciudad ingresada no ha sido encontrada')
        }
        else{
            mostrarClima(datos)
        }
    })
    .catch(error=>{
        console.log(error);
    })
}

function mostrarClima(datos){
    const {name,main:{temp,temp_max,temp_min}}=datos

    const grados=KelvinAcent(temp)
    const min=KelvinAcent(temp_min)
    const max=KelvinAcent(temp_max)

    //Armar HTML 

    const nombreCiudad=document.createElement('p')

    nombreCiudad.innerHTML=`Clima en ${name}`
    nombreCiudad.classList.add('font-bold','text-2xl')

    const tempActual=document.createElement('p');
    tempActual.innerHTML=`${grados} &#8451`
    tempActual.classList.add('font-bold','text-6xl')

    const tempMinima=document.createElement('p');
    tempMinima.innerHTML=`Min: ${min}&#8451 `
    tempMinima.classList.add('text-xl')

    const tempMaxima=document.createElement('p')
    tempMaxima.innerHTML=`Max: ${max}&#8451`
    tempMaxima.classList.add('text-xl')


    const resultadoDiv=document.createElement('div')

    resultadoDiv.classList.add('text-center','text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(tempActual)
    resultadoDiv.appendChild(tempMinima)
    resultadoDiv.appendChild(tempMaxima)

    resultado.appendChild(resultadoDiv)
    
}

function KelvinAcent(grados){
    return parseInt(grados-273.15)
}

function limpiarHTML(){

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }


}

function spinner(){

    limpiarHTML()

    const divSpinner=document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')
    
    divSpinner.innerHTML=`
    
    <div class="sk-circle1 sk-circle"><div>
    <div class="sk-circle2 sk-circle"><div>
    <div class="sk-circle3 sk-circle"><div>
    <div class="sk-circle4 sk-circle"><div>
    <div class="sk-circle5 sk-circle"><div>
    <div class="sk-circle6 sk-circle"><div>
    <div class="sk-circle7 sk-circle"><div>
    <div class="sk-circle8 sk-circle"><div>
    <div class="sk-circle9 sk-circle"><div>
    <div class="sk-circle10 sk-circle"><div>
    <div class="sk-circle11 sk-circle"><div>
    <div class="sk-circle12 sk-circle"><div>

    `
    resultado.appendChild(divSpinner)

}