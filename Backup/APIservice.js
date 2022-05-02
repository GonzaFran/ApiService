
const dec2hex = (dec) =>  { return dec.toString(16).padStart(2, "0") }

const generatorId = (length) => {
    let list = new Uint8Array((length || 20) / 2)
    window.crypto.getRandomValues(list)
    return Array.from(list, dec2hex).join('')
}

// Obtención de token de acceso.

 const ObtainAccessToken = (url,userBqbs,passBqbs,clientId, clientSecret) => {
    const HTTP = new XMLHttpRequest()
    const AUTHORIZATION = btoa(clientId + ":" + clientSecret )
    let jsessionid = localStorage.getItem('jsessionid')
    let data = new URLSearchParams ({
        grant_type: "password",
        username: userBqbs,
        passBqbs: passBqbs,
        validateToken: 1
        })

    let dataBody = data.toString()

    HTTP.withCredentials = true;
    HTTP.onreadystatechange = () => {
        if(HTTP.readyState == 4) console.log(HTTP.responseText)
    }

    if (jsessionid === null) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    } else if (jsessionid.length != 20) {
        jsessionid = generatorId(20)
        localStorage.setItem('jsessionid',jsessionid)
    }


    HTTP.open("POST", url);
    HTTP.setRequestHeader("Accept", "application/json");
    //HTTP.setRequestHeader("Referer",'http://127.0.0.1:5500/user-new.php')
    HTTP.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    HTTP.setRequestHeader("Authorization","Basic " + AUTHORIZATION)
    HTTP.setRequestHeader('JSESSIONID', jsessionid)
    //HTTP.setRequestHeader('Host',"qa.buquebus.com")
    HTTP.send(dataBody)
}

// Refresco de token de acceso

 const RefreshAccessToken = (url,refresh_token,client_id,client_secret) => {
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
        if(HTTP.readyState == 4) console.log(HTTP.responseText)
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
    HTTP.send(bodyData)
}




//ASIGNACIÓN DE PUNTOS DE VENTA

    //Obtención de datos de usuario

 const ObtainDataUser = (url, access_token) => {
    const HTTP = new XMLHttpRequest();
    let jsessionid= localStorage.getItem('jsessionid')

    HTTP.onreadystatechange = () => {
        if(HTTP.readyState == 4) console.log(HTTP.responseText)
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
    HTTP.send()
}

    //Obtención de puntos de venta 

 const ObtainSalePoints = (url,access_token) => {
    const HTTP = new XMLHttpRequest();
    let jsessionid= localStorage.getItem('jsessionid');
    let data = "";

    //HTTP.withCredentials = true;
    HTTP.onreadystatechange = () => {
        if(HTTP.readyState == 4) console.log(HTTP.responseText)
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
    HTTP.send(data)
}

    //Asignación de puntos de venta.

 const AssignSalePoints = (url,access_token) => {
    const HTTP = new XMLHttpRequest();
    let jsessionid= localStorage.getItem('jsessionid')
    
    HTTP.withCredentials = true;
    HTTP.onreadystatechange = () => {
        if(HTTP.readyState == 4) console.log(HTTP.responseText)
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
    HTTP.send()
    } 

    export { AssignSalePoints, ObtainAccessToken, ObtainDataUser, ObtainSalePoints, RefreshAccessToken}

    //ObtainAccessToken('https://qa.buquebus.com/MarketApi/oauth/token','todos.b2b@abitab.com.uy','NdF7BkPGuW','AbitabCli','ioj42iodoi466oijdioj2oij3oijd3')