const vCode = require('svg-captcha');

exports.genCaptcha = () => {
  const captcha = vCode.create({ fontSize: 50, width: 100, height: 40 }); //{text:"",data:""}
  return captcha;
};
