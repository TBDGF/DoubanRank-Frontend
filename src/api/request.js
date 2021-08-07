const commonUrl="https://127.0.0.1:8080"

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
