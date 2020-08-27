const { Sequelize } = require('sequelize');

const { db } = require('../config');

const seq = new Sequelize('userModule', db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00', //东八时区
});

seq.query('create database if not exists personCenter default charset = utf8;');

module.exports = seq;
