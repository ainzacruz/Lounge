"use strict";
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define(
    "Banner",
    {
      source: DataTypes.STRING,
      description: DataTypes.STRING,
      topicId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Topics",
          key: "id",
          as: "topicId"
        }
      }
    },
    {}
  );
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Banner;
};
