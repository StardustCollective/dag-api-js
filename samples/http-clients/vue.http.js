
export class VueHttp {

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  invoke (options) {

    let ngHttpRequest = this.buildRequest(options);

    return this.makeServiceRequest(ngHttpRequest, options);
  }

  buildRequest (options) {

    let paramStr = options.queryParams && this.serialize(options.queryParams);

    if (paramStr) {
      options.url = options.url + '?' + paramStr;
    }

    let httpHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (options.authToken && !options.noAuthHeader) {
      httpHeaders['Authorization'] = options.authToken;
    }

    if (options.headers) {
      Object.keys(options.headers).forEach(key => {
        httpHeaders[key] = options.headers[key];
      });

      if (options.body) {
        if (options.headers['Content-Type'] && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          options.body = this.serialize(options.body);
        }
      }
    }

    return {
      method: options.method,
      url: options.url,
      headers: httpHeaders,
      body: options.body
    };
  }

  serialize (obj) {
    return obj && Object.keys(obj).map( (key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
  }

  makeServiceRequest (httpRequest, options) {

    return new Promise( (resolve, reject) => {

      let promise;

      if (options.method === 'GET') {
        promise = this.httpClient.get(options.url, { headers: options.headers });
      }
      else if (options.method === 'POST') {
        promise = this.httpClient.post(options.url, options.body, { headers: options.headers });
      }

      promise.then( (res) => {
          if (options.transformResponse) {
            resolve(options.transformResponse(res.json()));
          }
          else {
            resolve(res.json());
          }
        },
        (err) => {
          reject(err);
        });
    });

  }

}

