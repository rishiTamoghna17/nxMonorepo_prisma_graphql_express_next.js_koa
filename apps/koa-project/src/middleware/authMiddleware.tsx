const jwt = require('jsonwebtoken');

const authenticateMiddleware = async (ctx, next) => {
  try {
    const token = ctx.headers['authorization'].substring(7); // Assuming JWT is passed in the Authorization header
    if (!token) {
      ctx.status = 401; // Unauthorized
      ctx.body = { message: 'Missing authorization token' };
      return;
    }
    const decoded = await jwt.verify(
      token,
      'very_import_token');

      await next();
  } catch (error) {
    ctx.status = 500; // Unauthorized
    ctx.body = error.message;
  }
};

module.exports = authenticateMiddleware;
