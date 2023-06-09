import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const SUBSCRIPTION_EVENTS = {
  PRODUCT_CREATED: 'PRODUCT_CREATED',
};

export const createProductSubscription = {
  resolve: (payload: any) => payload.product,
  subscribe: withFilter(
    () => pubsub.asyncIterator(SUBSCRIPTION_EVENTS.PRODUCT_CREATED),
    (payload, variables) => {
      // Add your filtering logic here if needed
      return true;
    }
  ),
};

// Export the pubsub instance for use in other files
export default pubsub;
