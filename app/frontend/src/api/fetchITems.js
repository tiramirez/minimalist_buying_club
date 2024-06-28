
export class ItemObject {
    constructor(props) {
        this.id = props.name;
        this.product_category = props.category;
        this.unit_price = props.price;
        this.product_name = props.name;
        this.product_quantity = 0;
    }

    updateQuantity(value) {
        this.product_quantity = value;
    }

    updateQuantityIncrease() {
        this.product_quantity = this.product_quantity + 1;
    }

    updateQuantityReduce() {
        if (this.product_quantity > 0) {
            this.product_quantity = this.product_quantity - 1;
        }
    }
}

// https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/
// https://stackoverflow.com/questions/49684217/how-to-use-fetch-api-in-react-to-setstate/

function fetchData() {
    const promise = new Promise((resolve, reject) => {
        // console.log('CHECKPOINT: myFunc')
        const api = process.env.REACT_APP_API_ITEMS
        const endpoint = 'sample_productsV2.json';

        const api_url = api + endpoint;
        fetch(api_url, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    // do something
                    console.log('There was a problem with the fetch operation:', response);
                } else {
                    // console.log("RES", response);
                    return response.json();
                }
                console.log('CHECKPOINT: fetch')
            })
            .then((data) => {
                return resolve(JSON.stringify(data));
            })
            .catch((error) => {
                console.error("There was an error", error);
                return reject(error);
            })
            ;

    }

    );
    return promise;
};

const getData = async () => {
    const data = await fetchData();
    return data;
}

export default getData;