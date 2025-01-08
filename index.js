let div = document.createElement('DIV');

let title = document.createElement('h1');
    title.innerHTML = 'A que país pertenece esta bandera?';

let selector = document.createElement('SELECT');
    selector.id = 'selector';

let img = document.createElement('IMG');
    img.id = 'img';

let region = document.createElement('span');
    region.id = 'region';

let continente = document.createElement('span');
    continente.id = 'continente';    

let nombre = document.createElement('h2');
    nombre.id = 'nombre';

div.append(selector, title, img, nombre, continente, region)

document.body.append(div);

// let jsonFile = 'banderas_del_mundo.json';
let jsonFile = 'paises.json';


let opt ='';
let continenteArray = ['Todos', 'América','Asia', 'África','Europa','Oceanía'];
continenteArray.forEach(item => opt += `<option value="${item}">${item}<option>`);
selector.innerHTML = opt; 

fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        sessionStorage.setItem('datos', JSON.stringify(data))
    })

const datos = JSON.parse(sessionStorage.getItem('datos'));


function filt() {
    let datosFiltrados = datos.filter(item => item.continente == selector.value);
    if (selector.value == 'Todos') {
        datosFiltrados = datos;
    } else {
        datosFiltrados = datosFiltrados;
    }
    return datosFiltrados;
}

let datos2="";
let mySet2 = new Set();
let activeTimeouts = [];

selector.addEventListener('change', () => {
    activeTimeouts.forEach(clearTimeout);
    mySet2.clear();
    datos2 = filt();
    console.log(datos2.length);    
    while(mySet2.size < datos2.length){
        mySet2.add(Math.floor(Math.random() * datos2.length))
    }  

    let i = 0;    
    for (const element of mySet2) {
        const timeout = setTimeout(()=>{addImage(element)}, i * 9000)
        activeTimeouts.push(timeout)
        i++;
    }
} )

function addImage(num) {    
    img.src = ''
    nombre.innerHTML = '';
    continente.innerHTML = '';
    region.innerHTML = '';

    img.src = datos2[num].url;
        myTimeOut = setTimeout(() => {
        nombre.innerHTML = datos2[num].name;
        continente.innerHTML = 'Continente : '+ datos2[num].continente;
        region.innerHTML = 'Region : '+ datos2[num].region;
        activeTimeouts.push(myTimeOut)
    }, 5000)
    
}




// function addImage(){
//     img.src = ''
//     nombre.innerHTML = '';
//     continente.innerHTML = '';
//     sector.innerHTML = '';

//     random = Math.floor(Math.random() * nameValues.length);
    
//     // if(mySet.has(random)){

//     // }else{
//         mySet.add(random);
        
//         img.src = datos.url[random];
//         setTimeout(()=> {
//             nombre.innerHTML = datos.name[random];
//             continente.innerHTML = datos.continente[random];
//             sector.innerHTML = datos.sector[random];
//         } , 5000) 
//     // }
// }

// // while ( mySet !== nameValues.length ) {
   
// //     setTimeout(()=>{addImage();},  9000)
// // }

// for (let i = 0; i < nameValues.length + 20; i++) {
    
//     setTimeout(()=>{addImage(); console.log(i)}, i * 9000)
//     if(mySet == nameValues.length){
//         break
//     } 
// }
