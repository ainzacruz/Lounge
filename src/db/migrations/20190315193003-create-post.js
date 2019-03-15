"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      topicId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", // delete post if parent topic is deleted
        allowNull: false, // validation to prevent null value
        references: {
          // association information
          model: "Topics", // table name
          key: "id", // attribute to use
          as: "topicId" // reference as topicId
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Posts");
  }
};
