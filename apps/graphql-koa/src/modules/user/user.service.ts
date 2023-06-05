import { prisma } from '@xyz/mylib/prisma';

class userService{
    async createuser(input:any){
        return prisma.user.create({data:input})
    }
    
}
export default  userService;