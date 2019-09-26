import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  products = ["A Flower", "A Book", "A sore"]
  productName = "A Tree"
  isDisabled = true

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.isDisabled = false
    }, 3000)
  }

  onAddProduct() {
    this.products.push(this.productName)
  }
}
