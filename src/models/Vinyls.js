class Vinyls extends Product {        
   /**
   * @param {VinylsBuilder} builder 
   */

    constructor(builder) {
        super(builder.id, builder.price, builder.stock);
        this.name_vinyls = builder.productName;
        this.artist = builder.autor;
        this.year = builder.year;
        this.genre = builder.genre;
        Object.freeze(this);
    }

}