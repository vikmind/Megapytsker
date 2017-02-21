'use strict';
module.exports = function(sequelize, DataTypes) {
  var Operation = sequelize.define('Operation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['selectCard', 'touchScreen', 'inputText', 'wait'],
      allowNull: false
    },
    args: {
      type: DataTypes.STRING,
      get: function(){
        var ar = this.getDataValue('args');
        if (typeof(ar) === "string"){
          return ar.split('|=|');
        } else {
          return ar;
        }
      },
      set: function(val){
        this.setDataValue('args', val.join('|=|'));
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        Operation.belongsTo(models.Tape, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Operation;
};
