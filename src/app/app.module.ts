import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { ProductComponent } from "./product/product.component"

import { NgxsModule } from "@ngxs/store"
import { environment } from "../environments/environment"

@NgModule({
  declarations: [AppComponent, ProductComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
