import { Prisma, prisma } from "@xyz/mylib/prisma";
import { CreateProductInput, GetProductInputById } from "./product.dto";
import { ApolloError } from "apollo-server-koa";
import { Users } from "../user/user.dto";

class ProductService{
    async createProduct(input: CreateProductInput, user: Users["id"]) {
        const existingProduct = await prisma.product.findUnique({
          where: {
            title: input.title,
          },
        });
    
        if (existingProduct) {
          throw new ApolloError('Product already exists');
        }
    
        return prisma.product.create({
          data: {
            ...input,
            user: user ? { connect: { id:(user) } } : undefined,
          }as Prisma.ProductCreateInput,
        });
    }

    async getAllProducts(){
        //pagination add
        return await prisma.product.findMany();
    }

    async getProductById(title:GetProductInputById){
        const user=  await prisma.product.findUnique({
            where:{
                    id:Number(title.id),
                }
        })
        return user
    }
}
export default ProductService