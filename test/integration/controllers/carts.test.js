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


let toContainAllCarts = (response)=>{
  let mapper = ({code,items}) => {
    return {code: code, items:items.length}
  };
  let _carts =  response.body.map(mapper);
  let _expected = strapi.api.db.config.carts.map(mapper);
  return _.isEqual(_carts,_expected);
};

let getCartCode = ()=>{
  return "1f4aa898-3f26-4f4f-8df4-663e2bb20f72";
};

let toContainExpectedCart = (response)=>{
  let {code} = response.body;
  return code === getCartCode();
};

describe("GET /carts", () => {
  it("should respond with 200", async (done) => {
    request(app.server) 
      .get("/carts")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should contain all available carts", async (done) => {
    request(app.server) 
      .get("/carts")
      .expect(toContainAllCarts)
      .end(done);
  });

});

describe("GET /carts/:code", () => {
 
  let url = `/carts/${getCartCode()}`;

  it("should respond with 200", async (done) => {
    request(app.server) 
      .get(url)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should fetch related cart information", async (done) => {
    request(app.server) 
      .get(url)
      .expect(toContainExpectedCart)
      .end(done);
  });

});

//Checkout Related Tests

let orderWithMackbookProAndRaspFree = function(response){
  let _expected = { 
                    subtotal: 5429.99,
                    discount: 30,
                    total: 5499.99
                  }  
  let {subtotal, discount, total} = response.body;
  if(!_.isEqual(_expected, {subtotal, discount, total})){
    throw new Error("missing next key");
  }else{
    return {subtotal, discount, total};
  }
}

//Checkout Cart with MacBook Pro, Raspberry Pi B -- Total: $5,399.99
describe("PUT /carts/:code/checkout -- Checkout Cart with MacBook Pro, Raspberry Pi B -- Total: $5,399.99", () => {
 
  const url = "/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f71/checkout";
  const response = {
    "items": [
        {
            "product": {
                "id": 2,
                "sku": "43N23P",
                "name": "MackBook Pro",
                "price": 5399.99,
                "inventory_qty": 5
            },
            "quantity": 1,
            "subtotal": 5399.99,
            "discount": 0,
            "total": 5399.99
        },
        {
            "product": {
                "id": 4,
                "sku": "234234",
                "name": "Raspberry Pi B",
                "price": 30,
                "inventory_qty": 2
            },
            "quantity": 1,
            "subtotal": 30,
            "discount": 30,
            "total": 0
        }
    ],
    "subtotal": 5429.99,
    "discount": 30,
    "total": 5399.99
}

  it("should respond with 200", async (done) => {
    request(app.server) 
      .put(url)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should fetch related order with discounted price", async (done) => {
    request(app.server) 
      .put(url)
      .expect(response)
      .end(done);
  });
});

// Checkout cart with 3 Google Homes -- Total: $99.98
describe("PUT /carts/:code/checkout -- Checkout cart with 3 Google Homes -- Total: $99.98", () => {
 
  const url = "/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f72/checkout";
  const response = {
    "items": [
        {
            "product": {
                "id": 1,
                "sku": "120P90",
                "name": "Google Home",
                "price": 49.99,
                "inventory_qty": 10
            },
            "quantity": 3,
            "subtotal": 149.97,
            "discount": 49.99,
            "total": 99.98
        }
    ],
    "subtotal": 149.97,
    "discount": 49.99,
    "total": 99.98
}

  it("should respond with 200", async (done) => {
    request(app.server) 
      .put(url)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should fetch related order with discounted price", async (done) => {
    request(app.server) 
      .put(url)
      .expect(response)
      .end(done);
  });

  
});

// Checkout cart with 3 Alexa Speakers -- Total: $295.65
describe("PUT /carts/:code/checkout -- Checkout cart with 3 Alexa Speakers -- Total: $295.65", () => {
 
  const url = "/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f73/checkout";
  const response = {
    "items": [
        {
            "product": {
                "id": 3,
                "sku": "A304SD",
                "name": "Alexa Speaker",
                "price": 109.5,
                "inventory_qty": 10
            },
            "quantity": 3,
            "subtotal": 328.5,
            "discount": 32.85,
            "total": 295.65
        }
    ],
    "subtotal": 328.5,
    "discount": 32.85,
    "total": 295.65
}

  it("should respond with 200", async (done) => {
    request(app.server) 
      .put(url)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should fetch related order with discounted price", async (done) => {
    request(app.server) 
      .put(url)
      .expect(response)
      .end(done);
  });

  
});

// Checkout cart with 2 Raspberry Pi -- Total: $60
describe("PUT /carts/:code/checkout -- Checkout cart with 2 Raspberry Pi -- Total: $60", () => {
 
  const url = "/carts/5814cb36-df99-4113-a3ab-7fb16faf8f8f/checkout";
  const response = {
    "items": [
        {
            "product": {
                "id": 4,
                "sku": "234234",
                "name": "Raspberry Pi B",
                "price": 30,
                "inventory_qty": 2
            },
            "quantity": 2,
            "subtotal": 60,
            "discount": 0,
            "total": 60
        }
    ],
    "subtotal": 60,
    "discount": 0,
    "total": 60
}

  it("should respond with 200", async (done) => {
    request(app.server) 
      .put(url)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should fetch related order with no discounted price", async (done) => {
    request(app.server) 
      .put(url)
      .expect(response)
      .end(done);
  });

  
});