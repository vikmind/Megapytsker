'use strict';
module.exports = function(sequelize, DataTypes) {
  var Run = sequelize.define('Run', {
    tapeName: DataTypes.STRING,
    info: DataTypes.TEXT
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
    }
  });
  return Run;
};
