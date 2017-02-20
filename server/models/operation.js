'use strict';
module.exports = function(sequelize, DataTypes) {
  var Operation = sequelize.define('Operation', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Operation;
};