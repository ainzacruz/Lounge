const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Vote = require("../../src/db/models").Vote;

describe("Post", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      }).then(user => {
        this.user = user; //store the user

        Topic.create(
          {
            title: "Expeditions to Alpha Centauri",
            description:
              "A compilation of reports from recent visits to the star system.",
            posts: [
              {
                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                userId: this.user.id
              }
            ]
          },
          {
            include: {
              model: Post,
              as: "posts"
            }
          }
        ).then(topic => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a post object with a title, body, and assigned topic and user", done => {
      //#1
      Post.create({
        title: "Pros of Cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question.",
        topicId: this.topic.id,
        userId: this.user.id
      })
        .then(post => {
          //#2
          expect(post.title).toBe("Pros of Cryosleep during the long journey");
          expect(post.body).toBe(
            "1. Not having to answer the 'are we there yet?' question."
          );
          expect(post.topicId).toBe(this.topic.id);
          expect(post.userId).toBe(this.user.id);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a post with missing title, body, or assigned topic", done => {
      Post.create({
        title: "Pros of Cryosleep during the long journey"
      })
        .then(post => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch(err => {
          expect(err.message).toContain("Post.body cannot be null");
          expect(err.message).toContain("Post.topicId cannot be null");
          done();
        });
    });
  });

  describe("#setTopic()", () => {
    it("should associate a topic and a post together", done => {
      // #1
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      }).then(newTopic => {
        // #2
        expect(this.post.topicId).toBe(this.topic.id);
        // #3
        this.post.setTopic(newTopic).then(post => {
          // #4
          expect(post.topicId).toBe(newTopic.id);
          done();
        });
      });
    });
  });

  describe("#getTopic()", () => {
    it("should return the associated topic", done => {
      this.post.getTopic().then(associatedTopic => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      });
    });
  });

  describe("#setUser()", () => {
    it("should associate a post and a user together", done => {
      User.create({
        email: "ada@example.com",
        password: "password"
      }).then(newUser => {
        expect(this.post.userId).toBe(this.user.id);

        this.post.setUser(newUser).then(post => {
          expect(this.post.userId).toBe(newUser.id);
          done();
        });
      });
    });
  });

  describe("#getUser()", () => {
    it("should return the associated topic", done => {
      this.post.getUser().then(associatedUser => {
        expect(associatedUser.email).toBe("starman@tesla.com");
        done();
      });
    });
  });

  describe("#getPoints()", () => {
    it("should return the count of all the votes a post has", done => {
      this.post.votes = [];

      Vote.create({
        value: 1,
        postId: this.post.id,
        userId: this.user.id
      })
        .then(vote => {
          this.post.votes.push(vote);
          expect(this.post.getPoints()).toBe(1);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
