import { NgModule } from "@angular/core"

import { FlexLayoutModule } from "@angular/flex-layout"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { LoginComponent } from "./auth/login/login.component"
import { SignupComponent } from "./auth/signup/signup.component"
import { MaterialModule } from "./material/material.module"
import { CurrentTrainingComponent } from "./training/current-training/current-training.component"
import { NewTrainingComponent } from "./training/new-training/new-training.component"
import { PostTrainingsComponent } from "./training/post-trainings/post-trainings.component"
import { TrainingComponent } from "./training/training.component"
import { WelcomeComponent } from "./welcome/welcome.component"

@NgModule({
  declarations: [
    AppComponent,
    CurrentTrainingComponent,
    LoginComponent,
    NewTrainingComponent,
    PostTrainingsComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
