import queryString from 'query-string';
import humps from 'humps';

export function createBodyFromFields(fields) {
  return JSON.stringify(fields);
}

export function checkForSucess(request) {
  request.then(({ status, body }) => {
    switch (status) {
    case 200: {
      return body;
    }
    case 500: {
      throw new Error(body);
    }
    default: {
      throw new Error(body);
    }
    }
  });
}

export function request(url, { method, urlParams, body, token }) {
  console.log('apiClient-request-body', method, body);
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  if (token) {
    headers.append('x-access-token', token);
  }
  let urlParamsPart = '';
  if (urlParams) {
    const urlParamsAsString = queryString.stringify(urlParams);
    urlParamsPart = `?${urlParamsAsString}`;
  }
  const options = { method, headers };
  if (body) {
    console.log('apiClient-request-body', body);
    options.body = body;
  }
  return fetch(`${url}${urlParamsPart}`, options)
       .then(response => Promise.all([response.status, response.json()]))
       .then(result => ({
         status: result[0],
         body: humps.camelizeKeys(result[1])
       }));
}
