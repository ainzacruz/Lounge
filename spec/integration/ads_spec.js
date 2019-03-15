const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads/";
const sequelize = require("../../src/db/models/index").sequelize;
const Ad = require("../../src/db/models").Ads;

describe("routes : ads", () => {
  beforeEach(done => {
    this.ad;
    sequelize.sync({ force: true }).then(res => {
      Ad.create({
        title: "Hello World Ad",
        description: "Hello World"
      })
        .then(ads => {
          this.ad = ads;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /ads", () => {
    it("should return a status code 200 and all ads", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Ads");
        expect(body).toContain("Hello World Ad");
        done();
      });
    });
  });

  describe("GET /ads/new", () => {
    it("should render a new ad form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Ad");
        done();
      });
    });
  });

  describe("POST /ads/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Hello World Ad",
        description: "Hello World"
      }
    };

    it("should create a new Ad and redirect", done => {
      request.post(options, (err, res, body) => {
        Ad.findOne({ where: { title: "Flaming Hot Astroids Ad" } })
          .then(ad => {
            expect(res.statusCode).toBe(303);
            expect(ad.title).toBe("Hello World Ad");
            expect(ad.description).toBe("Hello World");
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /ads/:id", () => {
    it("should render a view with the selected ad", done => {
      request.get(`${base}${this.ad.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Hello World Ad");
        done();
      });
    });
  });

  describe("POST /ads/:id/destroy", () => {
    it("should delete the ad with the associated ID", done => {
      Ad.all().then(ads => {
        const adCountBeforeDelete = ads.length;

        expect(adCountBeforeDelete).toBe(1);
        request.post(`${base}${this.ad.id}/destroy`, (err, res, body) => {
          Ad.all().then(ads => {
            expect(err).toBeNull();
            expect(ads.length).toBe(adCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /ads/:id/edit", () => {
    it("should render a view with an edit Ad form", done => {
      request.get(`${base}${this.ad.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Ad");
        done();
      });
    });
  });

  describe("POST /ads/:id/update", () => {
    it("should update the Ad with the given values", done => {
      const options = {
        url: `${base}${this.ad.id}/update`,
        form: {
          title: "Hello World Ad",
          description: "Hello World"
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Ad.findOne({
          where: { id: this.ad.id }
        }).then(ad => {
          expect(ad.title).toBe("Hello World Ad");
          done();
        });
      });
    });
  });
});
