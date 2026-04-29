export class Product {
    constructor(id, price, stock, productName, image_url, description, category) {
        this.id = id;
        this.price = price;
        this.stock = stock;
        this.productName = productName;
        this.image_url = image_url;
        this.description = description;
        this.category = category;
    }
}