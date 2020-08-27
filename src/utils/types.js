const { DataTypes } = require('sequelize');

module.exports = {
  String: DataTypes.STRING,
  Date: DataTypes.DATE,
  Boolean: DataTypes.BOOLEAN, // TINYINT(1)
  Integer: DataTypes.INTEGER,
  Text: DataTypes.TEXT,
  Decimal: DataTypes.DECIMAL,
};

/*
Sequelize.INTEGER.UNSIGNED              // INTEGER UNSIGNED
Sequelize.INTEGER(11).UNSIGNED          // INTEGER(11) UNSIGNED
Sequelize.INTEGER(11).ZEROFILL          // INTEGER(11) ZEROFILL
Sequelize.INTEGER(11).ZEROFILL.UNSIGNED // INTEGER(11) UNSIGNED ZEROFILL
Sequelize.INTEGER(11).UNSIGNED.ZEROFILL // INTEGER(11) UNSIGNED ZEROFILL

// for enums:
class MyModel extends Model {}
MyModel.init({
  states: {
    type: Sequelize.ENUM,
    values: ['active', 'pending', 'deleted']
  }
}, { sequelize })

约束有下面几种
allowNull: false, defaultValue: true,unique: true,primaryKey: true,autoIncrement: true,comment:'desc'

*/
