export default {
  postData: async (url = '', data = {}, adb2cToken = '') => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Ocp-Apim-Subscription-Key' : "67a029cf86da4384b2b511f577163d72",
        'Authorization' : adb2cToken, 
        'Content-Type': 'application/json'
      },
      timeout: 40000,
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    let res = null;
    try {
      res = await response.json();
    } catch {

    }
    return res; // parses JSON response into native JavaScript objects
  },
  postMultiData: async (url = '', postData = {}) => {
    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value);
      }
    }

    const formData = new FormData();

    buildFormData(formData, postData)

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData // body data type must match "Content-Type" header
    });
    if (response === undefined) return response;
    return await response.json(); // parses JSON response into native JavaScript objects
  },
  getData: async (url = '', token = '') => {
    let headers = {};
    if(token){
      headers = {
        'Ocp-Apim-Subscription-Key' : "67a029cf86da4384b2b511f577163d72",
        'Authorization' : token,
        'Content-Type': 'application/json'
      };
    }
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    let res = null;
    try {
      res = await response.json();
    } catch (e) {
      if( response.status === 205) {
        res = null;
      } else {
        throw(e);
      }
    }
    return res;
  }


}
