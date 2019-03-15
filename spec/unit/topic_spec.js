const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
  beforeEach(done => {
    this.topic;
    this.post;

    sequelize.sync({ force: true }).then(res => {
      Topic.create(
        {
          title: "Expeditions to Alpha Centauri",
          description:
            "A compilation of reports from recent visits to the star system.",

          posts: [
            {
              title: "My first visit to Proxima Centauri b",
              body: "I saw some rocks."
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

  describe("#create()", () => {
    it("should create a topic object with a title and description", done => {
      Topic.create({
        title: "The cons of the MMO, microtransaction era",
        description: "Or: Why Bethesda is now the worst"
      })
        .then(topic => {
          expect(topic.title).toBe("The cons of the MMO, microtransaction era");
          expect(topic.description).toBe("Or: Why Bethesda is now the worst");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#getPosts()", () => {
    it("should return the associated posts", done => {
      this.topic.getPosts().then(associatedPosts => {
        expect(associatedPosts[0].title).toBe(
          "My first visit to Proxima Centauri b"
        );
        done();
      });
    });
  });
});
