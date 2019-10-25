import { LOCALE_ID, NgModule } from "@angular/core"

import { registerLocaleData } from "@angular/common"
import localeDE from "@angular/common/locales/de"
import { AngularFireModule } from "@angular/fire"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { StoreModule } from "@ngrx/store"
import { environment } from "../environments/environment"
import { AppComponent } from "./app.component"
import { appReducers } from "./app.reducer"
import { AuthModule } from "./auth/auth.module"
import { AuthService } from "./auth/auth.service"
import { MaterialModule } from "./material/material.module"
import { HeaderComponent } from "./navigation/header/header.component"
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component"
import { AppRoutingModule } from "./routing/app-routing.module"
import { UIService } from "./shared/ui.service"
import { TrainingService } from "./training/training.service"
import { WelcomeComponent } from "./welcome/welcome.component"

registerLocaleData(localeDE)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SidenavListComponent,
  ],
  imports: [
    AppModule.angularFireModuleInst,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    // Required by TrainingService, which is required by AuthService
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
  ],
  providers: [
    AuthService,
    TrainingService,
    {
      provide: LOCALE_ID,
      useValue: navigator.language,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    UIService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // see https://github.com/angular/angular/issues/22829
  static angularFireModuleInst = AngularFireModule.initializeApp(
    environment.firebase,
  )
}
