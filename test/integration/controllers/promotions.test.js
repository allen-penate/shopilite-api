const request = require("supertest");
const _ = require("lodash");

// function from gist file
const { setupStrapi } = require("../../helpers/strapi");

// We're setting timeout because sometimes bootstrap can take 5-7 seconds (big apps)
jest.setTimeout(10000);

let app; // this is instance of the the strapi

beforeAll(async () => {
  app = await setupStrapi(); // return singleton so it can be called many times
});


let toContainAllPromotions = (response)=>{
  let mapper = ({code,description, priority}) => {
    return {code, description, priority}
  };
  let _promotions =  response.body.map(mapper);
  let _expected = strapi.api.db.config.promotions.map(mapper);
  if(!_.isEqual(_promotions,_expected)){
    throw new Error("Response does not match expected promotions");
  }
};

describe("GET /promotions", () => {
  it("should respond with 200", async (done) => {
    request(app.server) 
      .get("/promotions")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should contain all available promotions", async (done) => {
    request(app.server) 
      .get("/promotions")
      .expect(toContainAllPromotions)
      .end(done);
  });

});
