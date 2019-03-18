"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      topicId: {
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
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Favorite, {
      foreignKey: "postId",
      as: "favorites"
    });

    Post.afterCreate((post, callback) => {
      return models.Favorite.create({
        userId: post.userId,
        postId: post.id
      });
    });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };

  Post.prototype.getPoints = function() {
    // #1
    if (this.votes.length === 0) return 0;

    // #2
    return this.votes
      .map(v => {
        return v.value;
      })
      .reduce((prev, next) => {
        return prev + next;
      });
  };
  Post.prototype.hasUpvoteFor = function(thisUserId) {
    let hasVote = false;
    this.votes.forEach(vote => {
      if (vote.userId === thisUserId && vote.value === 1) {
        hasVote = true;
      }
    });
    return hasVote;
  };
  Post.prototype.hasDownvoteFor = function(thisUserId) {
    let hasVote = false;
    this.votes.forEach(vote => {
      if (vote.userId === thisUserId && vote.value === -1) {
        hasVote = true;
      }
    });
    return hasVote;
  };

  Post.prototype.getFavoriteFor = function(userId) {
    return this.favorites.find(favorite => {
      return favorite.userId == userId;
    });
  };
  return Post;
};
