import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      id: [],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]],
      mobile: ["", Validators.required],
      tenantId: ["", Validators.required]
    });
  }

  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.AuthService.SignUp(this.signupForm.value).subscribe(
        response => {
          alert("User successfully registered");
          this.router.navigate(["login"]);
        },
        error => {
          alert(error.error.message);
        }
      );
    }
  }
}
