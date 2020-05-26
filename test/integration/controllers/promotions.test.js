const request = require("supertest");
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
    return {code: code, description: description, priority: priority}
  };
  let _promotions =  response.body.map(mapper);
  return (strapi.api.db.config.promotions.map(mapper) == _promotions);
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
