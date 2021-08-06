const commonUrl="localhost:8080"

function parseJSON(response){
    return response.json()
}

function checkStatus(response){
    if(response.status >= 200 && response.status < 500){
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

export function request(options = {}){
    const {data,url} = options
    options = {...options}
    options.mode = 'cors'//跨域
    delete options.url
    if(data){
        delete options.data
        options.body = JSON.stringify(data)
    }
    options.headers={
        'Content-Type':'application/json'
    }
    return fetch(commonUrl+url,options,{credentials: 'include'})
        .then(checkStatus)
        .then(parseJSON)
        .catch(err=>({err}))
}