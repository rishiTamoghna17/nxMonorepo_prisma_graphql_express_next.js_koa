import {Request,Response} from "koa"
import { Users } from "../modules/user/user.dto";

interface Context {

req:Request
res:Response;
user:Users | null
ctx: any;
}
export default Context;