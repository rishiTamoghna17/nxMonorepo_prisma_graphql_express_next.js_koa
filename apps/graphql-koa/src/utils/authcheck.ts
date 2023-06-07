import { AuthChecker } from "type-graphql";
import  Context  from "../type/context";
import passport from "koa-passport";

export const authcheck: AuthChecker<Context> = async ({ context }) => {
  // Use the Passport.js middleware to authenticate the user
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        reject(new Error("Unauthorized"));
      } else {
        context.user = user;
        resolve(true);
      }
    })(context.req, context.res);
  });
};
