import { Component, OnInit } from "@angular/core"
import { log } from "util"

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products = ["A Flower", "A Book", "A Sore"]
  productName = "A Tree"
  isDisabled = false

  constructor() {}

  ngOnInit() {}

  onAddProduct() {
    this.products.push(this.productName)
  }

  onRemoveProduct(product: string) {
    log(`remove product >${product}< clicked`)
    this.products = this.products.filter((p) => p !== product)
  }
}
