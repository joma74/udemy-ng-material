import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"
import { ProductComponent } from "./product/product.component"
import { ProductsComponent } from "./products/products.component"
import { ProductsService } from "./products/products.service"

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
