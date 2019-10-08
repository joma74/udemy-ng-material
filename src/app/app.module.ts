import { NgModule } from "@angular/core"

import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppComponent } from "./app.component"
import { LoginComponent } from "./auth/login/login.component"
import { SignupComponent } from "./auth/signup/signup.component"
import { MaterialModule } from "./material/material.module"
import { HeaderComponent } from "./navigation/header/header.component"
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component"
import { AppRoutingModule } from "./routing/app-routing.module"
import { CurrentTrainingComponent } from "./training/current-training/current-training.component"
import { StopTrainingComponent } from "./training/current-training/stop-training.component"
import { NewTrainingComponent } from "./training/new-training/new-training.component"
import { PastTrainingsComponent } from "./training/past-trainings/past-trainings.component"
import { TrainingComponent } from "./training/training.component"
import { WelcomeComponent } from "./welcome/welcome.component"

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
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
})
export class AppModule {}
