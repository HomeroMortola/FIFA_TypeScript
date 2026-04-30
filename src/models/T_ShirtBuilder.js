import { T_Shirt } from './T_Shirt.js';
import { ProductBuilder } from './ProductBuilder.js';
export class T_ShirtBuilder extends ProductBuilder {

    constructor() {
        super();
        this.size = "";
        this.color = "";
    }


    /**
     * @param {string} size
     */
    setSize(size) {
        this.size = size;
        return this;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        this.color = color;
        return this;
    }


    /**
     * @returns {T_Shirt}
     */
    build() {
        return new T_Shirt(this);
    }
}

