import axios from 'axios';

export class ItemObject {
    constructor(props) {
        this.id = props.name;
        this.product_category = props.category;
        this.unit_price = props.price;
        this.product_unit = props.unit;
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
    
    updateQuantityReset() {
        this.product_quantity = 0;
    }
}

function fetchData(file_name) {
    const promise = new Promise((resolve, reject) => {
        const api = process.env.REACT_APP_API
        const endpoint = process.env.REACT_APP_ENDPOINT_S3;

        const api_url = api + endpoint + file_name;
        axios.get(api_url, { method: 'GET', timeout: 1000})
        .then((response) => {
            if (response.status!==200) {
                // do something
                console.log('There was a problem with the fetch operation:', response);
            } else {
                // console.log("RES", response);
                return response.data;
            }
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
        })
        .then((data) => {
            return resolve(JSON.stringify(data));
        })
        ;
    }

    );
    return promise;
};

const getData = async (item) => {
    const data = await fetchData(item);
    return data;
}

export default getData;