"use strict";
module.exports = (sequelize, DataTypes) => {
  var Vote = sequelize.define(
    "Vote",
    {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[-1, 1]]
        }
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Vote.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Vote;
};
