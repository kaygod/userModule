const crypto = require('crypto');
const { salt } = require('../config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { security } = require('../config');

/**
 * md5加密
 * @param {数据} data
 */
exports.md5 = (data) => {
  const md5Handler = crypto.createHmac('md5', salt).update(data);

  return md5Handler.digest('hex');
};

exports.saveProp = (params, array = []) => {
  const data = { ...params };
  const new_obj = {};
  for (let key in data) {
    if (array.includes(key)) {
      new_obj[key] = data[key];
    }
  }
  data.properties = new_obj;
  return data;
};

exports.delProp = (data, property = null) => {
  try {
    if (property === null) {
      return false;
    }

    let array = property;

    if (!Array.isArray(property)) {
      array = [property];
    }

    array.forEach((item) => {
      delete data[item];
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDate = (date, type = 1) => {
  if (type == 1) {
    return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
};

/**
 * 这个scope用作权限控制
 *
 * 1 普通用户
 *
 * 10 管理员
 *
 * 100 超级管理员
 *
 */
exports.generateToken = (data, scope) => {
  const { secretKey, expiresIn } = security;
  const token = jwt.sign(
    {
      ...data,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  );
  return token;
};

/**
 * 生成随机位数的数字
 */
exports.generateNumber = (num = 6) => {
  let str = '';
  Array.from(Array(num)).map(() => {
    str += parseInt(Math.random() * 10);
  });
  return str;
};
