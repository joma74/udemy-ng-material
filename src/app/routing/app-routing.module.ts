import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../auth/auth-guard.service"
import { WelcomeComponent } from "../welcome/welcome.component"

const routes: Routes = [{ path: "", component: WelcomeComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
