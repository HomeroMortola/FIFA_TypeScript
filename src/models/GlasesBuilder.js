class GlasesBuilder extends ProductBuilder {

    constructor() {
        super();
        this.name = "";
        this.color = "";
    }



    /**
     * @param {string} productName
     */
    setName(productName) {
        this.productName = productName;
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
     * @returns {Glases}
     */
    build() {
        return new Glases(this);
    }
}

