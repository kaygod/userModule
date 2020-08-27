const host = 'localhost';
const secretKey = 'wang_kai_is_god';
const port = 3000;

module.exports = {
  db: {
    //配置mysql数据库参数
    username: 'root',
    password: '123123',
    dialect: 'mysql',
    host,
  },
  _redis: {
    host,
    port: 6379,
  },
  salt: secretKey,
  security: {
    secretKey,
    expiresIn: 60 * 60 * 24 * 30,
  },
  port,
  service_ip: `http://${host}:${port}`,
};
