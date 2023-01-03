import { getProduct, IProduct } from '../core/components/data/getsData';
import { URL } from '../core/components/data/getsData';

export const getProductsInCart = async (cartObj: { [key: string]: number }) => {
  const resultArray: IProduct[] = [];
  for (const product in cartObj) {
    const productInfo = await getProduct(URL, product);
    resultArray.push(productInfo);
  }
  return resultArray;
};
