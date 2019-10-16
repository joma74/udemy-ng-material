import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AngularFireAuthModule } from "@angular/fire/auth"
import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MaterialModule } from "../material/material.module"
import { LoginComponent } from "./login/login.component"
import { SignupComponent } from "./signup/signup.component"

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AngularFireAuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [],
})
export class AuthModule {}
