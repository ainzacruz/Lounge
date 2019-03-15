const Topic = require("./models").Topic;

module.exports = {
  //#1
  getAllTopics(callback) {
    return (
      Topic.all()

        //#2
        .then(topics => {
          callback(null, topics);
        })
        .catch(err => {
          callback(err);
        })
    );
  },
  addTopic(newTopic, callback) {
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
      .then(topic => {
        callback(null, topic);
      })
      .catch(err => {
        callback(err);
      });
  },
  getTopic(id, callback) {
    return Topic.findById(id)
      .then(topic => {
        callback(null, topic);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteTopic(id, callback) {
    return Topic.destroy({
      where: { id }
    })
      .then(topic => {
        callback(null, topic);
      })
      .catch(err => {
        callback(err);
      });
  }
};
