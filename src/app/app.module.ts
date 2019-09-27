import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing/app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { ProductComponent } from "./product/product.component"
import { ProductsComponent } from "./products/products.component"
import { ProductsService } from "./products/products.service"

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
