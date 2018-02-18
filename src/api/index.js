var axios = require('axios');

export const apiGet = (url, config) => axios.get(url, config);

export const apiPut = (url, id, obj) => () => 
    fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: new Headers({ "content-type" : "application/json"})
}).then(v => v.json())

export const apiPost = (url, obj, config) => axios.post(url, obj, config);
