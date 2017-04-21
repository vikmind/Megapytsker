'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tape = sequelize.define('Tape', {
    name: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Tape.hasMany(models.Operation);
        Tape.hasMany(models.Run, {
          onDelete: 'CASCADE',
          hooks: true,
        });
      }
    }
  });
  return Tape;
};
