export const URL: string = 'https://dummyjson.com/products';

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [string];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface DataObject {
  products: IProduct[];
}

async function getData(url: string, limit = 100) {
  return fetch(`${url}?limit=${limit}`)
    .then((response) => response.json())
    .catch((err) => console.log('Error from getData file, the error is: ', err));
}

export const data: DataObject = await getData(URL);

export const getProduct = async (url: string, id: string) => {
  const res = await fetch(`${url}/${id}`);
  return res.json();
};
