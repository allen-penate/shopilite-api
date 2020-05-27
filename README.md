# Basic Shopping Cart API

Shopilite API is a Shopping Cart API implemented to solve a Backend Engineering Code Challenge.It is based on Strapi (KoaJS + SQLite).

## Origins

### Shopping Cart API
We need to build a checkout system as a standalone NodeJS API for an ecommerce platform. This 
application will have to support different promotions within a given inventory.

#### Inventory
| SKU | Name | Price | Inventory Qty |
| --- | --- | --- | --- |
| 120P90 | Google Home | $49.99 | 10 |
| 43N23P | MacBook Pro | $5,399.99 | 5 |
| A304SD | Alexa Speaker | $109.50 | 10 |
| 234234 | Raspberry Pi B | $30.00 | 2 |

#### Promotions
- Each sale of a MacBook Pro comes with a free Raspberry Pi B.
- Buy 3 Google Homes for the price of 2.
- Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers.

#### Example Scenarios
- Scanned Items: MacBook Pro, Raspberry Pi B. (Total: $5,399.99).
- Scanned Items: Google Home, Google Home, Google Home. (Total: 99.98).
- Scanned Items: Alexa Speaker, Alexa Speaker, Alexa Speaker. (Total: $295.65).

## Installation

### 1. Requirements
#### NodeJS

| Software | Minimum version |
| --- | --- |
| Node.js | 12.x|
| npm | 6.x|

#### Yarn (optional)
#### Database
| Database | Minimum version |
| --- | --- |
| SQLite | 3 |

### 2. Clone from this repository
```sh
git clone git@github.com:YOUR_USERNAME/shopilite-api.git
```

### 3. Install Dependencies
Go to the root of the repository
```sh
cd shopilite-api && npm install
```

Or if using Yarn

```sh
cd shopilite-api && yarn
```
### 4. Build the application
```sh
npm run build
```

Or if using Yarn

```sh
yarn build
```
Note:
This command , among other things, will build the admin UI to manage content type and permissions related to this application.The use of this admin interface is totally optional.

### 5. Start the application

```sh
npm run start
```

Or if using Yarn

```sh
yarn start
```

Note:
When the application starts for first time it opens an admin landing page to create a user, this step is not required to access the API functionality and documentation.For detailed explanation you can consult [Strapi website](https://strapi.io/documentation/v3.x/getting-started/quick-start-tutorial.html#_2-create-an-administrator-and-front-end-user)

## Application
First time application starts it will seed the Database with all the necessary data to cover the Inventory and Example Scenarios mencioned on the original problem:

### Seed Data

`products.json`

```json
    {
  "products":[
    {
        "name": "Google Home",
        "price": 49.99,
        "inventory_qty": 10,
        "sku": "120P90"
    },
    {
        "name": "MackBook Pro",
        "price": 5399.99,
        "inventory_qty": 5,
        "sku": "43N23P"
    },
    {
        "name": "Alexa Speaker",
        "price": 109.5,
        "inventory_qty": 10,
        "sku": "A304SD"
    },
    {
        "name": "Raspberry Pi B",
        "price": 30.00,
        "inventory_qty": 2,
        "sku": "234234"
    }]
}
```

`actions.json`

```json
{
  "actions": [
    {
      "action_type": "itemfree",
      "amount": 1,
      "is_percentage": false,
      "target": {
        "sku": "234234"
      }      
    },
    {
      "action_type": "fixedprice",
      "amount": 2,
      "is_percentage": false,
      "target": {
        "sku": "120P90"
      }
    },
    {
      "action_type": "itemtotaldiscount",
      "amount": 10,
      "is_percentage": true,
      "target": {
        "sku": "A304SD"
      }      
    }
  ]
}
```

`promotions.json`

```json
{
  "promotions": [
    {
      "code": "BUY1MACGET1RASP",
      "description": "Buy a MacBook Pro get a free Raspberry Pi B",
      "priority": 1,
      "product": {
        "sku": "43N23P"
      },
      "action": {
        "action_type": "itemfree",
        "amount": 1,
        "is_percentage": false
      },
      "rule": {
        "rule_type": "itemTotal",
        "quantity": 1
      }
    },    
    {
      "code": "BUY3HOMESX2",
      "description": "Buy 3 Google Homes for the price of 2",
      "priority": 1,
      "product": {
        "sku": "120P90"
      },
      "action": {
        "action_type": "fixedprice",
        "amount": 2,
        "is_percentage": false
      },
      "rule": {
        "rule_type": "itemTotal",
        "quantity": 3
      }
    },
    {
      "code": "BUY3ALEXAGET10%OFF",
      "description": "Buy more than 3 Alexa Speakers get 10% discount on all Alexa Speakers",
      "priority": 1,
      "product": {
        "sku": "A304SD"
      },
      "action": {
        "action_type": "itemtotaldiscount",
        "amount": 10,
        "is_percentage": true
      },
      "rule": {
        "rule_type": "itemTotal",
        "quantity": 3
      }
    }
  ]
}

```

``carts.json``

```json
{
  "carts": [
    {
      "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f71",
      "items": [
        {
          "product": {
            "sku": "43N23P"
          },
          "quantity": 1
        }
      ]
    },    
    {
      "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f72",
      "items": [
        {
          "product": {
            "sku": "120P90"
          },
          "quantity": 3
        }
      ]
    },
    {
      "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f73",
      "items": [
        {
          "product": {
            "sku": "A304SD"
          },
          "quantity": 3
        }
      ]
    },
    {
      "code": "5814cb36-df99-4113-a3ab-7fb16faf8f8f",
      "items": [
        {
          "product": {
            "sku": "234234"
          },
          "quantity": 1
        }
      ]
    }    
  ]
}
```
## Admin
By default, the administration panel is exposed via [http://localhost:1337/admin].As previously mentioned the used of the admin panel is totally optional and not required to access API documentation and functionality.

## Test Suite
Test Suite can executed thru :
but be aware there are some issues when restoring a SQLiteDB regarding readonly locks,most of the tests dont persist domain information.

## Domain Entities

## Services

## TODOS

## Documentation
API documentation can be accessed via [http://localhost:1337/documentation].It is based on Swagger UI. All available end-points can be visualized and tested from here.

## Main End-Points
### [GET] /products
List all existing products

```http request
GET http://localhost:1337/products
Accept: application/json
```
#### Response
```json
[
    {
        "id": 1,
        "sku": "120P90",
        "name": "Google Home",
        "price": 49.99,
        "inventory_qty": 10
    },
    {
        "id": 2,
        "sku": "43N23P",
        "name": "MackBook Pro",
        "price": 5399.99,
        "inventory_qty": 5
    },
    {
        "id": 3,
        "sku": "A304SD",
        "name": "Alexa Speaker",
        "price": 109.5,
        "inventory_qty": 10
    },
    {
        "id": 4,
        "sku": "234234",
        "name": "Raspberry Pi B",
        "price": 30,
        "inventory_qty": 2
    }
]
```
### [GET] /actions

List all available actions.
```http request
GET http://localhost:1337/actions
Accept: application/json
```

#### Response
```json
[
    {
        "id": 1,
        "action_type": "itemfree",
        "amount": 1,
        "is_percentage": false,
        "target": {
            "id": 4,
            "sku": "234234",
            "name": "Raspberry Pi B",
            "price": 30,
            "inventory_qty": 2
        },
        "created_at": "2020-05-27T18:31:37.448Z",
        "updated_at": "2020-05-27T18:31:37.453Z"
    },
    {
        "id": 2,
        "action_type": "fixedprice",
        "amount": 2,
        "is_percentage": false,
        "target": {
            "id": 1,
            "sku": "120P90",
            "name": "Google Home",
            "price": 49.99,
            "inventory_qty": 10
        },
        "created_at": "2020-05-27T18:31:37.460Z",
        "updated_at": "2020-05-27T18:31:37.463Z"
    },
    {
        "id": 3,
        "action_type": "itemtotaldiscount",
        "amount": 10,
        "is_percentage": true,
        "target": {
            "id": 3,
            "sku": "A304SD",
            "name": "Alexa Speaker",
            "price": 109.5,
            "inventory_qty": 10
        },
        "created_at": "2020-05-27T18:31:37.470Z",
        "updated_at": "2020-05-27T18:31:37.473Z"
    }
]
```
### [GET] /promotions
```http request
GET http://localhost:1337/promotions
Accept: application/json
```
List all existing promotions

#### Response:

```json
[
    {
        "id": 1,
        "code": "BUY1MACGET1RASP",
        "description": "Buy a MacBook Pro get a free Raspberry Pi B",
        "priority": 1,
        "product": {
            "id": 2,
            "sku": "43N23P",
            "name": "MackBook Pro",
            "price": 5399.99,
            "inventory_qty": 5
        },
        "rule": {
            "id": 1,
            "rule_type": "itemTotal",
            "quantity": 1,
            "created_at": "2020-05-27T18:31:37.488Z",
            "updated_at": "2020-05-27T18:31:37.488Z"
        },
        "action": {
            "id": 1,
            "action_type": "itemfree",
            "amount": 1,
            "is_percentage": false,
            "target": 4,
            "created_at": "2020-05-27T18:31:37.448Z",
            "updated_at": "2020-05-27T18:31:37.453Z"
        },
        "created_at": "2020-05-27T18:31:37.542Z",
        "updated_at": "2020-05-27T18:31:37.545Z"
    },
    {
        "id": 2,
        "code": "BUY3HOMESX2",
        "description": "Buy 3 Google Homes for the price of 2",
        "priority": 1,
        "product": {
            "id": 1,
            "sku": "120P90",
            "name": "Google Home",
            "price": 49.99,
            "inventory_qty": 10
        },
        "rule": {
            "id": 2,
            "rule_type": "itemTotal",
            "quantity": 3,
            "created_at": "2020-05-27T18:31:37.492Z",
            "updated_at": "2020-05-27T18:31:37.492Z"
        },
        "action": {
            "id": 2,
            "action_type": "fixedprice",
            "amount": 2,
            "is_percentage": false,
            "target": 1,
            "created_at": "2020-05-27T18:31:37.460Z",
            "updated_at": "2020-05-27T18:31:37.463Z"
        },
        "created_at": "2020-05-27T18:31:37.551Z",
        "updated_at": "2020-05-27T18:31:37.554Z"
    },
    {
        "id": 3,
        "code": "BUY3ALEXAGET10%OFF",
        "description": "Buy more than 3 Alexa Speakers get 10% discount on all Alexa Speakers",
        "priority": 1,
        "product": {
            "id": 3,
            "sku": "A304SD",
            "name": "Alexa Speaker",
            "price": 109.5,
            "inventory_qty": 10
        },
        "rule": {
            "id": 3,
            "rule_type": "itemTotal",
            "quantity": 3,
            "created_at": "2020-05-27T18:31:37.495Z",
            "updated_at": "2020-05-27T18:31:37.495Z"
        },
        "action": {
            "id": 3,
            "action_type": "itemtotaldiscount",
            "amount": 10,
            "is_percentage": true,
            "target": 3,
            "created_at": "2020-05-27T18:31:37.470Z",
            "updated_at": "2020-05-27T18:31:37.473Z"
        },
        "created_at": "2020-05-27T18:31:37.561Z",
        "updated_at": "2020-05-27T18:31:37.564Z"
    }
]
```

### [GET] /carts
```http request
GET http://localhost:1337/carts
Accept: application/json
```
List all existing carts, for this particular application there were created 4 carts.

#### Response:

```json
[
    {
        "id": 1,
        "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f71",
        "state": "in_progress",
        "total": null,
        "subtotal": 5399.99,
        "discount": null,
        "created_at": "2020-05-27T18:31:37.504Z",
        "updated_at": "2020-05-27T18:31:37.641Z",
        "items": [
            {
                "id": 1,
                "product": 2,
                "quantity": 1,
                "subtotal": 5399.99,
                "cart": 1,
                "created_at": "2020-05-27T18:31:37.570Z",
                "updated_at": "2020-05-27T18:31:37.572Z"
            }
        ]
    },
    {
        "id": 2,
        "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f72",
        "state": "in_progress",
        "total": null,
        "subtotal": 149.97,
        "discount": null,
        "created_at": "2020-05-27T18:31:37.516Z",
        "updated_at": "2020-05-27T18:31:37.648Z",
        "items": [
            {
                "id": 2,
                "product": 1,
                "quantity": 3,
                "subtotal": 149.97,
                "cart": 2,
                "created_at": "2020-05-27T18:31:37.578Z",
                "updated_at": "2020-05-27T18:31:37.580Z"
            }
        ]
    },
    {
        "id": 3,
        "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f73",
        "state": "in_progress",
        "total": null,
        "subtotal": 328.5,
        "discount": null,
        "created_at": "2020-05-27T18:31:37.523Z",
        "updated_at": "2020-05-27T18:31:37.655Z",
        "items": [
            {
                "id": 3,
                "product": 3,
                "quantity": 3,
                "subtotal": 328.5,
                "cart": 3,
                "created_at": "2020-05-27T18:31:37.584Z",
                "updated_at": "2020-05-27T18:31:37.586Z"
            }
        ]
    },
    {
        "id": 4,
        "code": "5814cb36-df99-4113-a3ab-7fb16faf8f8f",
        "state": "in_progress",
        "total": null,
        "subtotal": 60,
        "discount": null,
        "created_at": "2020-05-27T18:31:37.529Z",
        "updated_at": "2020-05-27T18:31:37.661Z",
        "items": [
            {
                "id": 4,
                "product": 4,
                "quantity": 2,
                "subtotal": 60,
                "cart": 4,
                "created_at": "2020-05-27T18:31:37.591Z",
                "updated_at": "2020-05-27T18:31:37.593Z"
            }
        ]
    }
]
```

### [GET] /carts/:code
```http request
GET http://localhost:1337/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f71
Accept: application/json
```
Get a cart based on a given code.

#### Response:

```json
{
    "id": 1,
    "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f71",
    "state": "in_progress",
    "total": null,
    "subtotal": 5399.99,
    "discount": null,
    "created_at": "2020-05-27T18:31:37.504Z",
    "updated_at": "2020-05-27T18:31:37.641Z",
    "items": [
        {
            "id": 1,
            "product": {
                "id": 2,
                "sku": "43N23P",
                "name": "MackBook Pro",
                "price": 5399.99,
                "inventory_qty": 5
            },
            "quantity": 1,
            "subtotal": 5399.99,
            "cart": 1,
            "created_at": "2020-05-27T18:31:37.570Z",
            "updated_at": "2020-05-27T18:31:37.572Z"
        }
    ]
}
```
### [POST] /carts/
```http request
POST http://localhost:1337/carts/
Accept: application/json
```
Create a cart with a generated uuid as code (if no code given).

#### Response:
```json
{
    "id": 7,
    "code": "3aa2e3a4-d9f0-4da8-8e38-370f50669c91",
    "state": "created",
    "total": null,
    "subtotal": null,
    "discount": null,
    "created_at": "2020-05-27T20:40:41.709Z",
    "updated_at": "2020-05-27T20:40:41.709Z",
    "items": []
}
```

### [PUT] /carts/:code/products/:sku/add

```http request
PUT http://localhost:1337/carts/3aa2e3a4-d9f0-4da8-8e38-370f50669c91/products/43N23P/add
Accept: application/json
```
Add products{quantity} to a specific cart (quantity is 1 by default)

#### Response:
```json
{
    "id": 7,
    "code": "3aa2e3a4-d9f0-4da8-8e38-370f50669c91",
    "state": "in_progress",
    "total": null,
    "subtotal": 5399.99,
    "discount": null,
    "created_at": "2020-05-27T20:40:41.709Z",
    "updated_at": "2020-05-27T20:47:54.201Z",
    "items": [
        {
            "id": 6,
            "product": 2,
            "quantity": 1,
            "subtotal": 5399.99,
            "cart": 7,
            "created_at": "2020-05-27T20:47:54.168Z",
            "updated_at": "2020-05-27T20:47:54.176Z"
        }
    ]
}

```
### [PUT] /carts/:code/products/:sku/remove

```http request
PUT http://localhost:1337/carts/3aa2e3a4-d9f0-4da8-8e38-370f50669c91/products/43N23P/remove
Accept: application/json
```
Remove products{quantity} from a specific cart (quantity is null(all) by default)

#### Response:
```json
{
    "id": 7,
    "code": "3aa2e3a4-d9f0-4da8-8e38-370f50669c91",
    "state": "in_progress",
    "total": null,
    "subtotal": 0,
    "discount": null,
    "created_at": "2020-05-27T20:40:41.709Z",
    "updated_at": "2020-05-27T20:47:54.201Z",
    "items": []
}
```

### [PUT] /carts/:code/checkout

Checkout a cart. Update cart state and returns an Order object containing promotions applied and totals.

#### Checkout cart containing MacBook Pro, Raspberry Pi B -- Total: $5,399.99

```http request
PUT http://localhost:1337/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f71/checkout
Accept: application/json
```

#### Response:
```json
{
    "cart": {
        "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f71"
    },
    "items": [
        {
            "product": {
                "sku": "43N23P"
            },
            "quantity": 1,
            "subtotal": 5399.99,
            "discount": 0,
            "total": 5399.99
        },
        {
            "product": {
                "sku": "234234"
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
```
#### Checkout cart with 3 Google Homes -- Total: $99.98

```http request
PUT http://localhost:1337/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f72/checkout
Accept: application/json
```

#### Response:
```json
{
    "cart": {
        "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f72"
    },
    "items": [
        {
            "product": {
                "sku": "120P90"
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
```
#### Checkout cart with 3 Alexa Speakers -- Total: $295.65

```http request
PUT http://localhost:1337/carts/1f4aa898-3f26-4f4f-8df4-663e2bb20f73/checkout
Accept: application/json
```

#### Response:
```json
{
    "cart": {
        "code": "1f4aa898-3f26-4f4f-8df4-663e2bb20f73"
    },
    "items": [
        {
            "product": {
                "sku": "A304SD"
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
```

#### Checkout cart with 2 Raspberry Pie -- Total: $60 (No Promotions Applied)

```http request
PUT http://localhost:1337/carts/5814cb36-df99-4113-a3ab-7fb16faf8f8f/checkout
Accept: application/json
```

#### Response:
```json
{
    "cart": {
        "code": "5814cb36-df99-4113-a3ab-7fb16faf8f8f"
    },
    "items": [
        {
            "product": {
                "sku": "234234"
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
```
