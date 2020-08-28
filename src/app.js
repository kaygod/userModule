const Koa = require('koa');
const app = new Koa();
const { router } = require('./router/user'); //引入用户路由模块
const bodyParser = require('koa-bodyparser');
const { port } = require('./config');
require('./utils/sync'); //开启同步数据库
const { configSession } = require('./utils/setSession');

configSession(app); //启动session配置
app.use(bodyParser()); //解析post请求
app.use(router.routes()); //加载用户路由模块

// response
app.use((ctx) => {
  ctx.body = 'Hello world';
});

app.listen(port);
