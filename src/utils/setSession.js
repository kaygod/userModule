const session = require('koa-session');

const key = 'koa:sess';

exports.sessionKey = key;

exports.configSession = (app) => {
  // 使用session
  app.keys = ['secret'];
  const CONFIG = {
    key, // cookie key (默认koa：sess)
    maxAge: 60000, // cookie的过期时间,毫秒，默认为1分钟
    overwrite: true, // 是否覆盖    (默认default true)
    httpOnly: false, // cookie是否只有服务器端可以访问,默认为true
    signed: true, // 签名默认true
    rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false, // (boolean) 会话即将到期时,续订会话
  };
  app.use(session(CONFIG, app));
};
