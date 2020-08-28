const Router = require('@koa/router');
const { register, verifyKey, login } = require('../controller/user');
const { genCaptcha } = require('../utils/genCaptcha');
const Auth = require('../middleWare/auth');

const router = new Router();

/**
 * 注册
 */
router.post('/register', async (ctx) => {
  const { user_name, password, email } = ctx.request.body; //在app.js中使用bodyParser中间件后,这里可以轻松获取到post请求传递过来的参数
  ctx.body = await register({ user_name, password, email });
});

/**
 * 注册成功
 */
router.get('/regiter_success', async (ctx) => {
  const { id: user_id, verify_key } = ctx.query;
  ctx.body = await verifyKey({ user_id, verify_key });
});

/**
 * 获取登录校验码
 */
router.get('/getCaptcha', async (ctx) => {
  const { text, data } = genCaptcha();
  ctx.session.captcha = text.toLowerCase(); //转化成小写字母
  ctx.set('Content-Type', 'image/svg+xml');
  ctx.body = String(data);
});

/**
 * 登录
 */
router.post('/login', async (ctx) => {
  const { user_name, password, captcha } = ctx.request.body;
  if (ctx.session.captcha != captcha.toLowerCase()) {
    ctx.body = {
      error_no: 50,
      message: '验证码不正确',
    };
    return false;
  }
  ctx.body = await login({ user_name, password }, ctx);
});

/**
 * 更新用户信息
 */
router.post('/update_user', new Auth().m, async (ctx) => {
  /**
   * 测试一下用户是否登录,如果登录了就能得到用户数据
   */
  const { user_name, user_id } = ctx.auth;
  ctx.body = {
    error_no: 0,
    message: {
      user_id,
      user_name,
    },
  };
});

exports.router = router;
