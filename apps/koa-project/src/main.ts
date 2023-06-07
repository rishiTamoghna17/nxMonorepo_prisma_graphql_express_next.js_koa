/* eslint-disable @typescript-eslint/no-var-requires */
import Koa from 'koa';
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
import { prisma } from '@xyz/mylib/prisma';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const json = require('koa-json');
import cors from '@koa/cors';
const passport = require('koa-passport')
const tough = require("tough-cookie");
const authenticateMiddleware = require('./middleware/authMiddleware')
const initializingPassport = require('./middleware/passport')
initializingPassport(passport)
const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(json());
app.use(cors());
app.use(passport.initialize());


router.post('/signup',async (ctx) => {
  try {
    const { email, name, password } = ctx.request.body;
    if (!name || !email || !password) {
      ctx.body = ({message:'Missing required fields'});
      ctx.status = 404;
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      ctx.status = 401;
      console.log("console",existingUser);

      ctx.body=({message: `${email} is already present`});
    }
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: await bcrypt.hash(password, 10),
      },
    });
    ctx.status = 201;
    ctx.body = { message: 'User created successfully' };
  } catch (err) {
    console.log(err);
    ctx.status = err.status;
    ctx.body = err.message;
  }
});

router.post(
  '/login',
  async (ctx) => {
    const { password, email } = ctx.request.body;

    // Check if the provided username and password match a user in the database
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      ctx.status = 400;
      ctx.body = {message:"user not exist"};
    }
    else if (user && (await bcrypt.compare(password, user.password))){
      const token = jwt.sign({
        userId: user.id.toString(),
        email: user.email,
      }, "very_import_token");
      ctx.set("authorization", token)
      ctx.status = 200;
      ctx.body = {message:"User log in successfully",name:user.name,email:user.email,id:user.id,token:token}; 
    }else{
      // console.log(await bcrypt.compare(password, user.password))
      ctx.status = 401;
      ctx.body = {message:"unauthenticated person"}
    }
  }
);

router.get('/user',passport.authenticate('jwt', { session: false }), async (ctx) => {
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

router.get('/user/:id', async (ctx) => {
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

router.put('/user/update/:id',passport.authenticate('jwt', { session: false }), async (ctx) => {
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

router.delete('/user/delete/:id',passport.authenticate('jwt', { session: false }), async (ctx) => {
  const id = ctx.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    ctx.status = 200;
    ctx.body = { message: 'user is deleted', user };
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
  console.log('Server listening on http://localhost:3000');
});
