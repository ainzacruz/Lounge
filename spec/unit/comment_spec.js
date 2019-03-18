// #1: We import our dependencies
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Comment = require("../../src/db/models").Comment;

describe("Comment", () => {
  // #2: Before each test, we scope a user, topic, post, and comment to the test context.
  beforeEach(done => {
    this.user;
    this.topic;
    this.post;
    this.comment;

    sequelize.sync({ force: true }).then(res => {
      // #3: We create test data we can use during test execution
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      }).then(user => {
        this.user = user;

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
        )
          .then(topic => {
            this.topic = topic;
            this.post = this.topic.posts[0];

            Comment.create({
              body: "ay caramba!!!!!",
              userId: this.user.id,
              postId: this.post.id
            })
              .then(comment => {
                this.comment = comment;
                done();
              })
              .catch(err => {
                console.log(err);
                done();
              });
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  // #4: We start a test suite for the `create` action
  describe("#create()", () => {
    it("should create a comment object with a body, assigned post and user", done => {
      Comment.create({
        // create a comment
        body: "The geological kind.",
        postId: this.post.id,
        userId: this.user.id
      })
        .then(comment => {
          // confirm it was created with the values passed
          expect(comment.body).toBe("The geological kind.");
          expect(comment.postId).toBe(this.post.id);
          expect(comment.userId).toBe(this.user.id);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    // #5: We test that comments with invalid attributes are not created
    it("should not create a comment with missing body, assigned post or user", done => {
      Comment.create({
        body: "Are the inertial dampers still engaged?"
      })
        .then(comment => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch(err => {
          expect(err.message).toContain("Comment.userId cannot be null");
          expect(err.message).toContain("Comment.postId cannot be null");
          done();
        });
    });
  });

  // #6: We test the `setUser` method which assigns a User object to the comment it was called on
  describe("#setUser()", () => {
    it("should associate a comment and a user together", done => {
      User.create({
        // create an unassociated user
        email: "bob@example.com",
        password: "password"
      }).then(newUser => {
        // pass the user down

        expect(this.comment.userId).toBe(this.user.id); // confirm the comment belongs to another user

        this.comment
          .setUser(newUser) // then reassign it
          .then(comment => {
            expect(comment.userId).toBe(newUser.id); // confirm the values persisted
            done();
          });
      });
    });
  });

  // #7: We test the `getUser` method which should return the User associated with the comment called on
  describe("#getUser()", () => {
    it("should return the associated user", done => {
      this.comment.getUser().then(associatedUser => {
        expect(associatedUser.email).toBe("starman@tesla.com");
        done();
      });
    });
  });

  // #8: We test `setPost` which should associate the Post passed as argument to the comment called on
  describe("#setPost()", () => {
    it("should associate a post and a comment together", done => {
      Post.create({
        // create post
        title: "Dress code on Proxima b",
        body: "Spacesuit, space helmet, space boots, and space gloves",
        topicId: this.topic.id,
        userId: this.user.id
      }).then(newPost => {
        expect(this.comment.postId).toBe(this.post.id); // confirm comment is associated to a different post

        this.comment
          .setPost(newPost) // associate new post to comment
          .then(comment => {
            expect(comment.postId).toBe(newPost.id); // confirm association took place
            done();
          });
      });
    });
  });

  // #9: We test `getPost` which should return the Post associated with the comment called on
  describe("#getPost()", () => {
    it("should return the associated post", done => {
      this.comment.getPost().then(associatedPost => {
        expect(associatedPost.title).toBe(
          "My first visit to Proxima Centauri b"
        );
        done();
      });
    });
  });
});
