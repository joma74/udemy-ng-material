import { Component, OnInit, ViewChild } from "@angular/core"
import { MatSidenav } from "@angular/material"
import { AuthService } from "./auth/auth.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = "fitness-tracker"

  ngOnInit(): void {
    this.authService.initAuthListener()
  }

  /** DEPRECATED */
  @ViewChild("sidenav", { static: true })
  onToggle(sidenav: MatSidenav) {
    sidenav.toggle()
  }
}
