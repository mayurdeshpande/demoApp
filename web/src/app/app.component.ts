import { Component } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "demoApp";
  constructor(
    private router: Router,
    activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .forEach(e => {
        this.title = activatedRoute.root.firstChild.snapshot.data.title;
      });
  }
}
