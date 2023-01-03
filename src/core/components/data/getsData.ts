const URL: string = 'https://dummyjson.com/products?limit=100';

export default interface DataObject {
	products: [{
		brand: string,
		category: string,
		description: string,
		discountPercentage: number,
		id: number,
		images: [string],
		price: number,
		rating: number,
		stock: number,
		thumbnaill: string,
		title: string,
	}];
}

async function getData(url: string) {
	return fetch(url)
		.then(response => response.json())
		.catch(err => console.log('Error from getData file, the error is: ', err))
}

export const data: DataObject = await getData(URL);
