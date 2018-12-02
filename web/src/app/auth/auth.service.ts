import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: string = "http://localhost:3030";
  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + "/authentication", {
        strategy: "local",
        email: email,
        password: password
      })
      .pipe(
        map(response => {
          if (response && response.accessToken) {
            localStorage.setItem("token", response.accessToken);
          }
          return response;
        })
      );
  }

  SignUp(data: any) {
    return this.http.post<any>(this.baseUrl + "/users", data).pipe(
      map(response => {
        return response;
      })
    );
  }

  isLoggedIn() {
    const token: string = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser() {
    const decodedToken = this.jwtHelper.decodeToken(localStorage.token);
    return decodedToken;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
