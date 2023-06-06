import jwt from "jsonwebtoken";
export function veryfyjwt<T>(token: string):T | null{
    try{
const decodedToken = jwt.verify(token,"very-secrete") as T
return decodedToken;
    }catch(e){
        return null;
    }
}