const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const User = require("../../src/db/models").User;

describe("routes : topics", () => {
  beforeEach(done => {
    // before each context
    this.topic; // define variables and bind to context
    sequelize.sync({ force: true }).then(() => {
      // clear database
      Topic.create({
        title: "JS Frameworks",
        description: "There is a lot of them"
      })
        .then(res => {
          this.topic = res; // store resulting topic in context
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  // context of admin user
  // #1: define the admin user context
  describe("admin user performing CRUD actions for Topic", () => {
    // #2: // before each test in admin user context, send an authentication request
    // to a route we will create to mock an authentication request
    beforeEach(done => {
      User.create({
        email: "admin@example.com",
        password: "123456",
        role: "admin"
      }).then(user => {
        request.get(
          {
            // mock authentication
            url: "http://localhost:3000/auth/fake",
            form: {
              role: user.role, // mock authenticate as admin user
              userId: user.id,
              email: user.email
            }
          },
          (err, res, body) => {
            done();
          }
        );
      });
    });

    describe("GET /topics", () => {
      it("should respond with all topics", done => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("GET /topics/new", () => {
      it("should render a view with a new topic form", done => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Topic");
          done();
        });
      });
    });

    describe("POST /topics/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new topic and redirect", done => {
        request.post(options, (err, res, body) => {
          Topic.findOne({ where: { title: "blink-182 songs" } })
            .then(topic => {
              expect(topic.title).toBe("blink-182 songs");
              expect(topic.description).toBe(
                "What's your favorite blink-182 song?"
              );
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });

    describe("GET /topics/:id", () => {
      it("should render a view with the selected topic", done => {
        request.get(`${base}${this.topic.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("POST /topics/:id/destroy", () => {
      it("should delete the topic with the associated ID", done => {
        Topic.all().then(topics => {
          const topicCountBeforeDelete = topics.length;

          expect(topicCountBeforeDelete).toBe(1);

          request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
            Topic.all().then(topics => {
              expect(err).toBeNull();
              expect(topics.length).toBe(topicCountBeforeDelete - 1);
              done();
            });
          });
        });
      });
    });

    describe("GET /topics/:id/edit", () => {
      it("should render a view with an edit topic form", done => {
        request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Topic");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("POST /topics/:id/update", () => {
      it("should update the topic with the given values", done => {
        request.post(
          {
            url: `${base}${this.topic.id}/update`,
            form: {
              title: "JS Frameworks",
              description: "There are a lot of them"
            }
          },
          (err, res, body) => {
            expect(err).toBeNull();
            Topic.findOne({
              where: { id: 1 }
            }).then(topic => {
              expect(topic.title).toBe("JS Frameworks");
              done();
            });
          }
        );
      });
    });
  }); //end context for admin user

  // context of member user
  describe("member user performing CRUD actions for Topic", () => {
    // #4: Send mock request and authenticate as a member user
    beforeEach(done => {
      request.get(
        {
          url: "http://localhost:3000/auth/fake",
          form: {
            role: "member"
          }
        },
        (err, res, body) => {
          done();
        }
      );
    });

    describe("GET /topics", () => {
      it("should respond with all topics", done => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("GET /topics/new", () => {
      it("should redirect to topics view", done => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
          done();
        });
      });
    });

    describe("POST /topics/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should not create a new topic", done => {
        request.post(options, (err, res, body) => {
          Topic.findOne({ where: { title: "blink-182 songs" } })
            .then(topic => {
              expect(topic).toBeNull(); // no topic should be returned
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });

    describe("GET /topics/:id", () => {
      it("should render a view with the selected topic", done => {
        // variables defined outside, like `this.topic` are only available
        // inside `it` blocks.
        request.get(`${base}${this.topic.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("POST /topics/:id/destroy", () => {
      it("should not delete the topic with the associated ID", done => {
        Topic.all().then(topics => {
          const topicCountBeforeDelete = topics.length;

          expect(topicCountBeforeDelete).toBe(1);

          request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
            Topic.all().then(topics => {
              // confirm that no topics were deleted
              expect(topics.length).toBe(topicCountBeforeDelete);
              done();
            });
          });
        });
      });
    });

    describe("GET /topics/:id/edit", () => {
      it("should not render a view with an edit topic form", done => {
        request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).not.toContain("Edit Topic");
          expect(body).toContain("JS Frameworks"); // confirm redirect to topic show
          done();
        });
      });
    });

    describe("POST /topics/:id/update", () => {
      it("should not update the topic with the given values", done => {
        const options = {
          url: `${base}${this.topic.id}/update`,
          form: {
            title: "JS Frameworks",
            description: "There are a lot of them"
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Topic.findOne({
            where: { id: 1 }
          }).then(topic => {
            expect(topic.title).toBe("JS Frameworks"); // confirm title is unchanged
            done();
          });
        });
      });
    });
  });
});
