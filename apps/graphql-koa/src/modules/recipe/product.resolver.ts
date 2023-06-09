import {
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import ProductService from './product.service';
import {
  CreateProductInput,
  GetProductInputById,
  Products,
} from './product.dto';
import Context from '../../type/context';
import pubsub, { SUBSCRIPTION_EVENTS } from '../../subcriptions/pubsub';

@Resolver()
class ProductResolver {

  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }
  //***********create product ************//
  @Authorized()
  @Mutation(() => Products)
  createProduct(
    @Args(() => CreateProductInput) input: CreateProductInput,
    @Ctx() context: Context
  ) {
    const product = this.productService.createProduct(
      input,
      Number(input.userId) ?? context.user?.id
    );
    // console.log('Publishing PRODUCT_CREATED event');
    // Publish the created product to the subscription
    pubsub.publish(SUBSCRIPTION_EVENTS.PRODUCT_CREATED, { product })
    return product;
  }

  //*********** Subscription: Product created ************//
  @Subscription(() => Products, {
    topics: SUBSCRIPTION_EVENTS.PRODUCT_CREATED,
  })
  productCreated(@Root() product: Products) {
      console.log("Root subscription")
    return product;
  }

  //*********** Get all product ************//
  @Authorized()
  @Query(() => [Products])
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  //*********** Get product by ID ************//
  @Authorized()
  @Query(() => Products)
  getProductById(@Args(() => GetProductInputById) input: GetProductInputById) {
    return this.productService.getProductById(input);
  }
}
export default ProductResolver;
