const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { security } = require('../config');

class Auth {
  constructor() {}

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      //这个userToken的name属性是前端自定义的,userToken.name就是token值
      if (!userToken || !userToken.name) {
        ctx.body = {
          error_no: 54,
          message: 'token无效',
        };
        return false;
      }
      const { secretKey } = security; //加密或者解密的盐值
      try {
        var decode = jwt.verify(userToken.name, secretKey);
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          ctx.body = {
            error_no: 54,
            message: 'token已过期',
          };
        }
        return false;
      }

      //decode只是user_id
      ctx.auth = ctx.session[`user_id_${decode}`]; //获取存储在session中的用户数据

      await next();
    };
  }
}

module.exports = Auth;
