"use strict";
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define(
    "Favorite",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
      as: "post"
    });

    Favorite.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Favorite.addScope("favoritePosts", userId => {
      return {
        include: [
          {
            model: models.Post,
            as: "post"
          }
        ],
        where: { userId: userId },
        limit: 5,
        order: [["createdAt", "DESC"]]
      };
    });
  };
  return Favorite;
};
