import { AuthChecker } from "type-graphql";
import  Context  from "../type/context";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const passport =require  ("koa-passport");

export const authcheck:AuthChecker<Context> = ({ context }) => {
  return !!context.user;
};
  