const vCode = require('svg-captcha');

exports.genCaptcha = (ctx) => {
  const captcha = vCode.create({ fontSize: 50, width: 100, height: 40 }); //{text:"",data:""}
  return captcha;
};
