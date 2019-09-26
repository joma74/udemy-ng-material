import { Subject } from "rxjs"

export class ProductsService {
  private products = ["A Flower", "A Book", "A Sore"]
  productsUdated = new Subject()

  addProduct(productName: string) {
    this.products.push(productName)
    this.productsUdated.next()
  }

  deleteProduct(productName: string) {
    this.products = this.products.filter((p) => p !== productName)
    this.productsUdated.next()
  }

  getProducts() {
    return [...this.products]
  }
}
