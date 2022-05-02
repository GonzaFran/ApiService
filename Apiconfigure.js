import {ObtainAccessToken, ObtainDataUser, ObtainSalePoints,RefreshAccessToken, AssignSalePoints} from './apiservice.js'

//Funciones complementarias

const modalAlert = (title,text = null,time = 0 ,type ="inspector") => {
    let modal = document.getElementById('modal');
    let span = document.getElementsByClassName('close')[0]
    let textoModal = document.getElementById('textModal')
    let titleModal = document.getElementById('titleModal')

    if(type == "modal") {
        modal.style.display = "block"
        textoModal.textContent  += text
        titleModal.textContent = title

    span.onclick = () => {
        modal.style.display = "none";
        textoModal.textContent = "";
        titleModal.textContent = "";
    }

     setTimeout(() => {    
        modal.style.display = "none";
        textoModal.textContent = "";
        titleModal.textContent = "";
    },time);

    } else if(type == "inspector") {

        modal.style.display = "block"
        
        textoModal.textContent  += headers.map((header) =>
            header.key + " : " + header.value  
        )

        titleModal.textContent = title
    
    span.onclick = () => {
        modal.style.display = "none";
        textoModal.textContent = "";
        titleModal.textContent = "" 
        }
    }
}

export const ContentResultModal = (content,title) => {
    let modal = document.getElementById('result');
    let span = document.getElementsByClassName('close-result')[0];
    let titleResult = document.getElementById('result-title');
    let result = document.getElementById('call-result');

    modal.style.display = "block"
    titleResult.textContent = title
    result.innerHTML = `<h4 class="resultCall">${content}</h4>`

    
    span.onclick = () => {
        titleResult.textContent = "";
        result.innerHTML = "";
        modal.style.display = "none";
        
    }
}

 /*--HEADERS--*/

let headers = [];

const AddHeaders = document.getElementById('add')
    let keyHeader = document.getElementById('key')
    let valueHeader = document.getElementById('value')

AddHeaders.addEventListener('click',(e) => {
    e.preventDefault()
    let key = keyHeader.value;
    let value = valueHeader.value;

    if(key && value) {
        headers.push({key: key, value: value});
        modalAlert("Se añadió",key +":"+ value,1000,"modal")
        keyHeader.value = '';
        valueHeader.value = '';
    } else if( key ) {
        headers.push({key: key, value: value});
        modalAlert("Se añadió encabezado sin clave",key +":"+ " value no definido",1000,"modal")
        keyHeader.value = '';
        valueHeader.value = '';
    } else if(value) {
        modalAlert("Ups...hubo un problema","No se puede añadir una clave sin su encabezado",2000,"modal")
        keyHeader.value = '';
        valueHeader.value = ''; 
    } else {
        modalAlert("Ups...hubo un problema"," Tenés que declarar un encabezado con o sin clave",2000,"modal")
        keyHeader.value = '';
        valueHeader.value = ''; 
    }
    
})

const cleanHeaders = document.getElementById('cleaner')

cleanHeaders.addEventListener('click',(e) => {
    e.preventDefault();
    for(const key in headers) {
        delete headers[key];
    }    
    headers = [];
})

const inspectorHeaders = document.getElementById('inspector')

inspectorHeaders.addEventListener('click',(e)=> {
    e.preventDefault()
    headers.length !== 0 ? modalAlert("Headers") : modalAlert("Atención", "No ha añadido valores",1500,"modal")
})

/*--BOTONES DE FORMULARIOS--*/

    //Obtener token de acceso
const ButtonObtainAccessToken = document.getElementById('ObtainTokenAccess')

    let userBqbs = document.getElementById('userBqbs')
    let passBqbs = document.getElementById('passBqbs')
    let clientId = document.getElementById('clientId')
    let clientSecret = document.getElementById('clientSecret')


ButtonObtainAccessToken.addEventListener('click',(e) => {
    let url = 'https://qa.buquebus.com/MarketApi/oauth/token'
    e.preventDefault();
    ObtainAccessToken(url,userBqbs.value, passBqbs.value, clientId.value,clientSecret.value,headers)
    })

    //Refrescar token de acceso
const ButtonRefreshToken = document.getElementById('RefreshAccessToken')

    let refreshToken = document.getElementById('refreshToken')
    let refreshId = document.getElementById('RefreshId')
    let refreshSecret = document.getElementById('refreshSecret')

ButtonRefreshToken.addEventListener('click',(e) => {
    let url = 'https://qa.buquebus.com/MarketApi/oauth/token'
    e.preventDefault()
    RefreshAccessToken(url, refreshToken,refreshId,refreshSecret,headers)
    })

     //Obtener datos de usuario
const ButtonObtainDataUser = document.getElementById('ObtainDataUser')

    let accessToken = document.getElementById('accessToken')

ButtonObtainDataUser.addEventListener('click',(e)=> {
    let url = 'https://qa.buquebus.com/MarketApi/api/user/me';
    e.preventDefault();
    ObtainDataUser(url,accessToken.value)
    })

    //Obtener puntos de venta
const ButtonSalePoints = document.getElementById('ObtainSalePoints')

    let accessTokenSalePoints = document.getElementById('accessTokenSalePoints')

ButtonSalePoints.addEventListener('click',(e) => {
    let url = 'https://qa.buquebus.com/MarketApi/api/user/currentsalespointlist'
    e.preventDefault()
    ObtainSalePoints(url,accessTokenSalePoints.value, headers)  
    })

    //Asignar puntos de venta
const ButtonAssignSalePoints = document.getElementById('AssignSalePoints')

    let accessTokenAssign = document.getElementById('TokenAssignSalePoints')

ButtonAssignSalePoints.addEventListener('click', (e) =>  {
    let url = 'https://qa.buquebus.com/MarketApi/api/user/salespoint/39'
    e.preventDefault();
    AssignSalePoints(url, accessTokenAssign, headers)
    })
