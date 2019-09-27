import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Subscription } from "rxjs"
import { log } from "util"
import { ProductsService } from "./products.service"

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: string[] = []
  isDisabled = false
  private productSubscription: Subscription

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.products = this.productsService.getProducts()
    this.productSubscription = this.productsService.productsUdated.subscribe(
      () => {
        this.products = this.productsService.getProducts()
      },
    )
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe()
  }

  onAddProduct(f: NgForm) {
    if (f.valid) {
      this.productsService.addProduct(f.value.productName)
    }
  }

  onRemoveProduct(productName: string) {
    this.productsService.deleteProduct(productName)
  }
}
