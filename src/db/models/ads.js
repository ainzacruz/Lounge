"use strict";
module.exports = (sequelize, DataTypes) => {
  var Ads = sequelize.define(
    "Ads",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  Ads.associate = function(models) {
    // associations can be defined here
  };
  return Ads;
};
