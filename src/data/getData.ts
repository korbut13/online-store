const URL: string = 'https://dummyjson.com/products?limit=100';

async function getData(url: string) {
	return fetch(url)
		.then(response => response.json())
		.catch(err => console.log('Error from getData file, the error is: ', err))
}

export const data = await getData(URL);
console.log(data);


