require('../models/index');
const seq = require('../utils/seq');

seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功!');
  })
  .catch((err) => {
    console.error('数据库连接失败!:', err);
  });

seq.sync();
