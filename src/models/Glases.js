export class Glases extends Product {
        
   /**
   * @param {GlasesBuilder} builder 
   */

    constructor(builder) {
        super(builder.id, builder.price, builder.stock);
        this.name = builder.productName;
        this.color = builder.color;
        Object.freeze(this);
    }

}