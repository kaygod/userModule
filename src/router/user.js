const Router = require('@koa/router');
const { register, verifyKey } = require('../controller/user');

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

exports.router = router;
