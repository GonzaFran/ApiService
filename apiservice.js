import { ContentResultModal } from "./Apiconfigure.js"

const dec2hex = (dec) =>  { return dec.toString(16).padStart(2, "0") }

const generatorId = (length) => {
    let list = new Uint8Array((length || 20) / 2)
    window.crypto.getRandomValues(list)
    return Array.from(list, dec2hex).join('')
}

// Obtención de token de acceso.

 const ObtainAccessToken = (url,userBqbs,passBqbs,clientId, clientSecret,options = undefined) => {
    const HTTP = new XMLHttpRequest()
    const AUTHORIZATION = btoa(clientId + ":" + clientSecret ) //Toma los argumentos  y crea un string que luego es codificado en base64.
    let jsessionid = localStorage.getItem('jsessionid') //Toma del localStorage el item 'jsessionid'

    let data = new URLSearchParams ({
        grant_type: "password",
        username: userBqbs,
        passBqbs: passBqbs,
        validateToken: 1
        })

    let dataBody = data.toString() //Toma la variable 'data' y transforma el objeto en query string.

    HTTP.withCredentials = true;
    HTTP.onreadystatechange = () => {
        if(HTTP.status == 200) ContentResultModal(HTTP.responseText,"Resultado")
        else ContentResultModal("Algo falló, inspeccionar la consola","Resultado")
    }

    if (jsessionid === null) {                          //Corrobora que la variable jSessionId tenga un valor
        jsessionid = generatorId(20)                    // que pueda ser envíado.
        localStorage.setItem('jsessionid',jsessionid)
    } else if (jsessionid.length != 20) {               //Corrobora que la longitud del dato sea de 20 caracteres
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    }                                                  //En cualquier caso, se setea un nuevo jsessiond id de 20 caracteres.
    //
    //HEADERS_REQUEST

    HTTP.open("POST", url);



    HTTP.setRequestHeader("Accept", "application/json");
    HTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    HTTP.setRequestHeader("Authorization","Basic " + AUTHORIZATION)
    HTTP.setRequestHeader('JSESSIONID', jsessionid)
    
    options ? options.map((option) => 
         HTTP.setRequestHeader(option.key, option.value)
      ) : null

    HTTP.send(dataBody)
}

// Refresco de token de acceso

 const RefreshAccessToken = (url, refresh_token, client_id, client_secret, options = undefined) => {

    const HTTP = new XMLHttpRequest()
    let jsessionid= localStorage.getItem('jsessionid')
    let data = new URLSearchParams ({
        grant_type: "refresh_token",
        client_id: client_id,
        client_secret: client_secret,
        refresh_token: refresh_token
        })

    let bodyData = data.toString()

    HTTP.onreadystatechange = () => {
        if(HTTP.status == 200) ContentResultModal(HTTP.responseText,"Resultado")
        else ContentResultModal("Algo falló, inspeccionar la consola","Resultado")
    }

    if(jsessionid === null) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    } else if (jsessionid.length != 20) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    }

    HTTP.open("POST", url);
    HTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    HTTP.setRequestHeader("Accept", "application/json");
    HTTP.setRequestHeader('JSESSIONID',jsessionid)

    options ? options.map((option) => 
         HTTP.setRequestHeader(option.key, option.value)
      ) : null

    HTTP.send(bodyData)
}



//ASIGNACIÓN DE PUNTOS DE VENTA

    //Obtención de datos de usuario

 const ObtainDataUser = (url, access_token, options = undefined) => {

    const HTTP = new XMLHttpRequest();
    let jsessionid= localStorage.getItem('jsessionid')

    HTTP.onreadystatechange = () => {
        if(HTTP.status == 200) ContentResultModal(HTTP.responseText,"Resultado")
        else ContentResultModal("Algo falló, inspeccionar la consola","Resultado")
    }


    if(jsessionid === null) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    } else if (jsessionid.length != 20) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    }

    HTTP.open('GET',url);
    HTTP.setRequestHeader('JSESSIONID',jsessionid)
    HTTP.setRequestHeader("Authorization","Bearer " + access_token)

    options ? options.map((option) => 
        HTTP.setRequestHeader(option.key, option.value)
    ) : null
    HTTP.send()
}

    //Obtención de puntos de venta

 const ObtainSalePoints = (url,access_token, options = undefined) => {
    const HTTP = new XMLHttpRequest();
    let jsessionid= localStorage.getItem('jsessionid');
    let data = "";

    //HTTP.withCredentials = true;
    HTTP.onreadystatechange = () => {
        if(HTTP.status == 200) ContentResultModal(HTTP.responseText,"Resultado")
        else ContentResultModal("Algo falló, inspeccionar la consola","Resultado")
    }

    if(jsessionid === null) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    } else if (jsessionid.length != 20) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    }

    HTTP.open('GET',url);
    HTTP.setRequestHeader('JSESSIONID',jsessionid)
    HTTP.setRequestHeader("Authorization","Bearer " + access_token);
    
    options ? options.map((option) => 
         HTTP.setRequestHeader(option.key, option.value)
      ) : null
    HTTP.send(data)
}

    //Asignación de puntos de venta.

 const AssignSalePoints = (url,access_token, options = undefined) => {
    const HTTP = new XMLHttpRequest();
    let jsessionid= localStorage.getItem('jsessionid')

    HTTP.onreadystatechange = () => {
        if(HTTP.status == 200) ContentResultModal(HTTP.responseText,"Resultado")
        else ContentResultModal("Algo falló, inspeccionar la consola","Resultado")
    }

    if(jsessionid === null) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    } else if (jsessionid.length != 20) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    }

    HTTP.open('POST',url)
    HTTP.setRequestHeader('JSESSIONID',jsessionid)
    HTTP.setRequestHeader("Authorization","Bearer " + access_token);

    options ? options.map((option) => 
         HTTP.setRequestHeader(option.key, option.value)
      ) : null
    HTTP.send()
    }

    export { AssignSalePoints, ObtainAccessToken, ObtainDataUser, ObtainSalePoints, RefreshAccessToken}

    //ObtainAccessToken('https://qa.buquebus.com/MarketApi/oauth/token','todos.b2b@abitab.com.uy','NdF7BkPGuW','AbitabCli','ioj42iodoi466oijdioj2oij3oijd3') 