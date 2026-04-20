class ProductBuilder {
  constructor() {
    this.id = 0;
    this.price = 0;
    this.stock = 0;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setPrice(price) {
    this.price = price;
    return this;
  }

  setStock(stock) {
    this.stock = stock;
    return this;
  }
}