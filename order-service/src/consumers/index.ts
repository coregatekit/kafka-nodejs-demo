import consumeCreateProduct from './create-product';
import consumeDeleteProduct from './delete-product';
import consumeUpdateProduct from './update-product';
import consumeUpdateStockStatus from './update-stock-status';

function consume() {
  consumeCreateProduct();
  consumeUpdateProduct();
  consumeDeleteProduct();
  consumeUpdateStockStatus();
}

export default consume;
