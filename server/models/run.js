'use strict';
module.exports = function(sequelize, DataTypes) {
  var Run = sequelize.define('Run', {
    tapeName: DataTypes.STRING,
    info: DataTypes.TEXT,
    isCanon: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        Run.belongsTo(models.Tape, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
    instanceMethods: {
      makeCanon: function() {
        var self = this;
        return Run.update({isCanon: false}, {where:{TapeId: this.TapeId}})
          .then(function(runs){
            self.update({isCanon: true});
          });
      }
    },
  });
  return Run;
};
