import { Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import ProductService from "./product.service";
import { CreateProductInput, GetProductInputById, Products } from "./product.dto";
import Context from "../../type/context";

@Resolver()
class ProductResolver{
    constructor(private produceService: ProductService) {
        this.produceService = new ProductService();
      }
        //***********create product ************//
      @Authorized()
      @Mutation(() => Products)
      createProduct(
        @Args(() => CreateProductInput) input: CreateProductInput,
        @Ctx() context: Context
      ) {
        return this.produceService.createProduct(input, input.userId ?? context.user?.id);
      }

      //*********** Get all product ************//
      @Authorized()
      @Query(()=>[Products])
      getAllProducts(){
        return this.produceService.getAllProducts()
      }

            //*********** Get all product ************//
    @Authorized()
      @Query(()=>[Products])
      getProductById(@Args(()=>GetProductInputById)input:GetProductInputById){
        return this.produceService.getProductById(input)
      }

}
export default ProductResolver;