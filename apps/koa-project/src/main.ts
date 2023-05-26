import Koa from "koa";
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.post("/signup", async (ctx) => {
  try {
    const { email, name, password } = ctx.request.body;
    const data = ctx.request.body;
    if (!name || !email || !password) {
      ctx.throw(400, "Missing required fields");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) ctx.throw(400, `${email} is already present`);

    await prisma.user.create({ data: data });
    ctx.status = 201;
    ctx.body = { message: "User created successfully" };
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.get("/user", async (ctx) => {
  try {
    const users = await prisma.user.findMany();
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.get("/user/:id", async (ctx) => {
  const id = ctx.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) ctx.status = 400;
    ctx.body = `user number ${id} not present`;
    
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.put("/user/update/:id", async (ctx) => {
  const id = ctx.params.id;
  const { email, name, password, role } = ctx.request.body;
  const data = ctx.request.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.delete("/user/delete/:id", async (ctx) => {
  const id = ctx.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    ctx.status = 200;
    ctx.body = {message:"user is deleted",user}
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
