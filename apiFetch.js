
const dec2hex = (dec) =>  { return dec.toString(16).padStart(2, "0") }

const generatorId = (length) => {
    let list = new Uint8Array((length || 20) / 2)
    window.crypto.getRandomValues(list)
    return Array.from(list, dec2hex).join('')
}


const obtainAccessToken = async (url,userBqbs,passBqbs,clientId, clientSecret) => {

    const AUTHORIZATION = btoa(clientId + ":" + clientSecret )
    let jsessionid = localStorage.getItem('jsessionid')
    let data = new URLSearchParams ({
        grant_type: "password",
        username: userBqbs,
        passBqbs: passBqbs,
        validateToken: 1
        })
    
    let dataBody = data.toString()

        if (jsessionid === null) {
            jsessionid = generatorId(20)
            localStorage.setItem('jsessionid',jsessionid)
        } else if (jsessionid.length != 20) {
            jsessionid = generatorId(20)
            localStorage.setItem('jsessionid',jsessionid)
        }

        await fetch(url,
        {
            method:'POST',
            mode:'cors',
            //credentials:'include',
            headers: new Headers({
                "Accept":"application/json",
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization": "Basic" + AUTHORIZATION,
                "JSESSIONID": jsessionid,
            }),
            referrerPolicy:"unsafe-url",
            body: dataBody
        })
        .then(response => response.text())
        .then(response => console.log(response))
        .catch(err => console.log(err))
        }  