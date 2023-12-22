enum KAFKA_TOPICS {
  KAFKA_TOPIC_PRODUCT_CREATE = 'create-product',
  KAFKA_TOPIC_PRODUCT_UPDATE = 'update-product',
  KAFKA_TOPIC_PRODUCT_DELETE = 'delete-product',
  KAFKA_TOPIC_ORDER_UPDATE_STOCK = 'update-stock',
  KAFKA_TOPIC_ORDER_UPDATE_STOCK_STATUS = 'update-stock-status',
}

enum UPDATE_STOCK_STATUS {
  SUCCESS = 'success',
  NOT_FOUND = 'not-found',
  NOT_ENOUGH = 'not-enough',
  FAILED = 'failed',
}

export {
  KAFKA_TOPICS,
  UPDATE_STOCK_STATUS,
}