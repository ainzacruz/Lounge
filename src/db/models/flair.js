"use strict";
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define(
    "Flair",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );

  Flair.associate = function(models) {
    Flair.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
  };
  return Flair;
};
