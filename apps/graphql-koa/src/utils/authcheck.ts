import { AuthChecker } from "type-graphql";
import  Context  from "../type/context";

export const authcheck:AuthChecker<Context> = ({ context }) => {
  return !!context.user;
};
  