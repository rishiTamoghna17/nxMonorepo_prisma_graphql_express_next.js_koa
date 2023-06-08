import { Args, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import ProductService from "./product.service";
import { CreateProductInput, Products } from "./product.dto";
import Context from "../../type/context";

@Resolver()
class ProductResolver{
    constructor(private produceService: ProductService) {
        this.produceService = new ProductService();
      }

      @Authorized()
      @Mutation(() => Products)
      createProduct(
        @Args(() => CreateProductInput) input: CreateProductInput,
        @Ctx() context: Context
      ) {
        return this.produceService.createProduct(input, input.userId ?? context.user?.id);
      }
}
export default ProductResolver;