class T_Shirt extends Product {        
   /**
   * @param {T_ShirtBuilder} builder 
   */
    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.productName, builder.image_url);
        this.size = builder.size;
        this.color = builder.color;
        Object.freeze(this);
    }

    getData() {
        return {
            id: this.id,
            name: this.productName,
            price: this.price,
            stock: this.stock,
            size: this.size,
            color: this.color,
            image_url: this.image_url
        }
    }
}