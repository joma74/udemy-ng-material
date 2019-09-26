import { Component, OnInit, OnDestroy } from "@angular/core"
import { log } from "util"
import { NgForm } from "@angular/forms"
import { ProductsService } from "./products.service"
import { Subscription } from "rxjs"

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
