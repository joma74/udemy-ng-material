import { LOCALE_ID, NgModule } from "@angular/core"

import { registerLocaleData } from "@angular/common"
import localeDE from "@angular/common/locales/de"
import { AngularFireModule } from "@angular/fire"
import { AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { environment } from "../environments/environment"
import { AppComponent } from "./app.component"
import { AuthService } from "./auth/auth.service"
import { LoginComponent } from "./auth/login/login.component"
import { SignupComponent } from "./auth/signup/signup.component"
import { MaterialModule } from "./material/material.module"
import { HeaderComponent } from "./navigation/header/header.component"
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component"
import { AppRoutingModule } from "./routing/app-routing.module"
import { UIService } from "./shared/ui.service"
import { CurrentTrainingComponent } from "./training/current-training/current-training.component"
import { StopTrainingComponent } from "./training/current-training/stop-training.component"
import { NewTrainingComponent } from "./training/new-training/new-training.component"
import { PastTrainingsComponent } from "./training/past-trainings/past-trainings.component"
import { TrainingComponent } from "./training/training.component"
import { TrainingService } from "./training/training.service"
import { WelcomeComponent } from "./welcome/welcome.component"

registerLocaleData(localeDE)

@NgModule({
  declarations: [
    AppComponent,
    CurrentTrainingComponent,
    LoginComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
  entryComponents: [StopTrainingComponent],
})
export class AppModule {}
