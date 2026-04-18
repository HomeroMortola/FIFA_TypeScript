class ProductBuilder {

    constructor() {
        this.id = null;
        this.name_vinyls= "";
        this.price = 0;
        this.stock = 0;
        this.year = 0;
        this.genre = "";
        this.artist = "";
    }

    /**
     * @param {number} id
     */

    setId(id) {
        this.id = id;
        return this;
    }


    /**
     * @param {string} VinylsName
     */
    setName(VinylsName) {
        this.VinylsName = VinylsName;
        return this;
    }

    /**
     * @param {number} price
     */
    setPrice(price) {
        this.price = price;
        return this;
    }

    /**
     * @param {number} stock
     */

    setStock(stock) {
        this.stock = stock;
        return this;
    }

    /**
     * @param {string} artist
     */

    setArtist(artist) {
        this.artist = artist;
        return this;
    }

    /**
     * @param {string} genre
     */

    setGenre(genre) {
        this.genre = genre;
        return this;
    }

    /**
     * @param {number} year
     */

    setYear(year) {
        this.year = year;
        return this;
    }


    /**
     * @returns {Vinyls}
     */
    build() {
        return new Vinyls(this);
    }
}

