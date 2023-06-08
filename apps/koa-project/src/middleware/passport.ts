/* eslint-disable @typescript-eslint/no-var-requires */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { prisma } from '@xyz/mylib/prisma';

const initializingPassport = (passport: any) => {
    const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey : "very_import_token"
    }

    passport.use(new JwtStrategy(opts, function(jwt_payload,next) {
        const email = jwt_payload.email;
        console.log(email);
        prisma.user.findUnique({
            where: {
              email: email,
            },
          }).then((user: any) => {  // Adjusted the type of the resolved value to `any` or the appropriate type
            if (user) {
              return next(null, user);
            } else {
              return next(null, false);
              // or you could create a new account
            }
          }).catch((err: any) => {
            return next(err, false);
          });
        }));
      }
module.exports =initializingPassport

