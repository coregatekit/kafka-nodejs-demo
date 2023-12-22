import consumeCreateProduct from './create-product';
import consumeDeleteProduct from './delete-product';
import consumeUpdateProduct from './update-product';

function consume() {
  consumeCreateProduct();
  consumeUpdateProduct();
  consumeDeleteProduct();
}

export default consume;
