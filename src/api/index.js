var axios = require('axios');

//API requests, all of them return a promise that 
//redux-promise will handle

export const apiGet = (url, config) => axios.get(url, config);

export const apiPut = (url, obj, config) => axios.put(url,obj, config);

export const apiPost = (url, obj, config) => axios.post(url, obj, config);

export const apiDelete = (url, obj, config) => axios.delete(url, obj, config);
