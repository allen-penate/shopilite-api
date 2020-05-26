const fs = require("fs");
const Strapi = require("strapi");
const http = require('http');

let instance;

async function setupStrapi(entryNamesToOpen) {
  if (!instance) {
    //delete test database if exists
    const testDataBase = `${__dirname}/../../.tmp/test.db`;
    if (fs.existsSync(testDataBase)) {
      fs.unlinkSync(testDataBase);
    }

    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.runBootstrapFunctions();
    instance.services.db.init();
    instance.app
      .use(instance.router.routes()) // this code in copied from app/node_modules/strapi/lib/Strapi.js
      .use(instance.router.allowedMethods());
    instance.server = http.createServer(instance.app.callback());
  }

  return instance;
}

module.exports = { setupStrapi };