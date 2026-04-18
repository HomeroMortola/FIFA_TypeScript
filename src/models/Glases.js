class Glases {
        
   /**
   * @param {GlasesBuilder} builder 
   */

    constructor(builder) {
        this.id = builder.id;
        this.name = builder.productName;
        this.price = builder.price;
        this.stock = builder.stock;
        this.color = builder.color;
        Object.freeze(this);
    }

}