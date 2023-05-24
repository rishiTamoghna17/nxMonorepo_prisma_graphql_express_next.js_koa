/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import * as path from 'path';

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();
app.use(bodyParser());
router.get("/", async (ctx) => {
  return ctx.body = "hello world"
  })

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});