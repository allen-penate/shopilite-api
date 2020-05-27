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


let toContainAllProducts = (response)=>{
  let mapper = ({sku,name, price}) => {
    return {sku,name, price};
  };
  let _products =  response.body.map(mapper);
  let _expected = strapi.api.db.config.products.map(mapper);

  if(!_.isEqual(_products,_expected)){
    throw new Error("Response does not match expected products");
  }
};

describe("GET /products", () => {
  it("should respond with 200", async (done) => {
    request(app.server) 
      .get("/products")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should contain all products", async (done) => {
    request(app.server) 
      .get("/products")
      .expect(toContainAllProducts)
      .end(done);
  });

});
