class Vinyls {        
   /**
   * @param {VinylsBuilder} builder 
   */

    constructor(builder) {
        this.id = builder.id;
        this.name_vinyls = builder.productName;
        this.artist = builder.autor;
        this.price = builder.price;
        this.stock = builder.stock;
        this.year = builder.year;
        this.genre = builder.genre;
        Object.freeze(this);
    }

}