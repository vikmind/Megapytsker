'use strict';
import rimraf from 'rimraf';
import compareRuns from '../compare-runs';

module.exports = function(sequelize, DataTypes) {
  const Run = sequelize.define('Run', {
    tapeName: DataTypes.STRING,
    info: DataTypes.TEXT,
    isCanon: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        Run.belongsTo(models.Tape, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          },
          hooks: true,
        });
      }
    },
    instanceMethods: {
      makeCanon() {
        return this.update({ isCanon: true, info: 'This is canonical run' });
      },
      compareWithCanon() {
        return Run.findOne({ TapeId: this.TapeId, isCanon: true })
          .then(canon => compareRuns(canon.id, this.id))
          .then(report => this.update({ info: report }));
      },
    },
    hooks: {
      afterCreate(run) {
        return Run.findAll({ where: { TapeId: run.TapeId } })
          .then(runs => {
            if (runs.length === 1){
              return run.makeCanon();
            } else {
              return run.compareWithCanon();
            }
          });
      },
      beforeDestroy(run) {
        console.log('afterDestroy', run.id);
        rimraf.sync(`./public/runs/${run.id}`)
      },
    },
  });
  return Run;
};
