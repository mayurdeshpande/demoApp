import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ProjectComponent } from "./project/project.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    data: {
      title: "Home"
    }
  },
  {
    path: "signup",
    component: SignupComponent,
    data: {
      title: "Sign Up"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login"
    }
  },
  {
    path: "projects",
    component: ProjectComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Projects"
    }
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    data: {
      title: "Page Not Found"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
