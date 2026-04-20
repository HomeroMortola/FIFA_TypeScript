class BandannaBuilder extends ProductBuilder {
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
     * @returns {Bandanna}
     */
    build() {
        return new Bandanna(this);
    }
}

