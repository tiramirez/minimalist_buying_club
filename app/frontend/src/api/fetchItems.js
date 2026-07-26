export class ItemObject {
    constructor(props) {
        this.id = props.id ?? props.name;
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

import { getDeviceId, setActiveExperiment } from '../utils/abVariant';

async function fetchData() {
    const did = getDeviceId();
    const api_url = import.meta.env.VITE_API + `products?did=${did}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        const response = await fetch(api_url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        if (json.experiment) {
            setActiveExperiment(json.experiment.id, json.experiment.variant, json.experiment.expires_at);
        }
        return JSON.stringify(json?.data ?? json);
    } catch (error) {
        clearTimeout(timeout);
        console.log('Error', error.message);
        return null;
    }
}

export default fetchData;

export async function fetchNewsletter() {
    const api_url = import.meta.env.VITE_API + 'newsletter';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        const response = await fetch(api_url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        return JSON.stringify(json?.data ?? json);
    } catch (error) {
        clearTimeout(timeout);
        console.log('Error', error.message);
        return null;
    }
}
