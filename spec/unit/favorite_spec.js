// #1
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Comment = require("../../src/db/models").Comment;
const User = require("../../src/db/models").User;
const Favorite = require("../../src/db/models").Favorite;

describe("Favorite", () => {
  beforeEach(done => {
    // #2
    this.user;
    this.topic;
    this.post;
    this.favorite;

    // #3
    sequelize.sync({ force: true }).then(res => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      }).then(res => {
        this.user = res;

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
          .then(res => {
            this.topic = res;
            this.post = this.topic.posts[0];

            Comment.create({
              body: "ay caramba!!!!!",
              userId: this.user.id,
              postId: this.post.id
            })
              .then(res => {
                this.comment = res;
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

  // tests here
  // #1
  describe("#create()", () => {
    // #2
    it("should create a favorite for a post on a user", done => {
      // #3
      Favorite.create({
        postId: this.post.id,
        userId: this.user.id
      })
        .then(favorite => {
          // #4
          expect(favorite.postId).toBe(this.post.id);
          expect(favorite.userId).toBe(this.user.id);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    // #5
    it("should not create a favorite without assigned post or user", done => {
      Favorite.create({
        userId: null
      })
        .then(favorite => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch(err => {
          expect(err.message).toContain("Favorite.userId cannot be null");
          expect(err.message).toContain("Favorite.postId cannot be null");
          done();
        });
    });
  });

  describe("#setUser()", () => {
    it("should associate a favorite and a user together", done => {
      Favorite.create({
        // create a favorite on behalf of this.user
        postId: this.post.id,
        userId: this.user.id
      }).then(favorite => {
        this.favorite = favorite; // store it
        expect(favorite.userId).toBe(this.user.id); //confirm it was created for this.user

        User.create({
          // create a new user
          email: "bob@example.com",
          password: "password"
        })
          .then(newUser => {
            this.favorite
              .setUser(newUser) // change the favorite's user reference for newUser
              .then(favorite => {
                expect(favorite.userId).toBe(newUser.id); //confirm it was updated
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

  // #2
  describe("#getUser()", () => {
    it("should return the associated user", done => {
      Favorite.create({
        userId: this.user.id,
        postId: this.post.id
      })
        .then(favorite => {
          favorite.getUser().then(user => {
            expect(user.id).toBe(this.user.id); // ensure the right user is returned
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#setPost()", () => {
    it("should associate a post and a favorite together", done => {
      Favorite.create({
        // create a favorite on `this.post`
        postId: this.post.id,
        userId: this.user.id
      }).then(favorite => {
        this.favorite = favorite; // store it

        Post.create({
          // create a new post
          title: "Dress code on Proxima b",
          body: "Spacesuit, space helmet, space boots, and space gloves",
          topicId: this.topic.id,
          userId: this.user.id
        })
          .then(newPost => {
            expect(this.favorite.postId).toBe(this.post.id); // check favorite not associated with newPost

            this.favorite
              .setPost(newPost) // update post reference for favorite
              .then(favorite => {
                expect(favorite.postId).toBe(newPost.id); // ensure it was updated
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

  // #2
  describe("#getPost()", () => {
    it("should return the associated post", done => {
      Favorite.create({
        userId: this.user.id,
        postId: this.post.id
      })
        .then(favorite => {
          this.comment.getPost().then(associatedPost => {
            expect(associatedPost.title).toBe(
              "My first visit to Proxima Centauri b"
            );
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
