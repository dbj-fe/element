function parseQuerystring(obj) {
  let result = '';
  if (obj) {
    let tmp = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        if (value instanceof Array && value.length) {
          value.forEach((v) => {
            tmp.push(`${key}=${encodeURIComponent(v)}`);
          });
        } else {
          tmp.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    }
    result = tmp.join('&');
  }
  return result;
}

const http2 = {
  get: function(url, options) {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
      let url2 = url;
      let body = parseQuerystring(options);
      let params = {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      url2 = url.indexOf('?') > 0 ? encodeURI(url) + '&'
        : encodeURI(url) + '?';
      if (body) {
        url2 += body + `&b${new Date().getTime()}=1`;
      } else {
        url2 += `b${new Date().getTime()}=1`;
      }
      fetch(url2, params).then((response) => {
        let data = response.json();
        resolve(data);
      }).catch(e => {
        reject();
      });
    });
  }
};

// 文件上传token获取
export function getUploadToken(type) {
  const TYPE_MAP = {
    'RESOURCE': 1,
    'IMAGE': 2,
    'VIDEO': 3
  };
  return http2.get(`https://zeus-stage.meiwu365.com/api/oss/policy/${TYPE_MAP[type]}`, {}, false);
}

