import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  uid:string;
  userData=[];
  constructor(private formBuilder:FormBuilder, private router: Router, private authService:AuthService ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:[null, Validators.compose([Validators.required,Validators.email])],
      password:[null,Validators.required],
    });
  }

  registration(){
    this.router.navigate(['/register']);
  }

  login(logindetails){
    this.authService.login(logindetails.email, logindetails.password).subscribe(data=>{
      console.log(data, "hhhh");
      console.log(localStorage.getItem('isLoggedIn'))
      this.router.navigate(['/home']);

     // if(data){
        
        //this.auth();
      //}
    });
  }

  auth(){
    let loggedinData = localStorage.getItem('isLoggedIn');
    this.uid = JSON.parse(loggedinData).user_id;
    this.authService.getUserData(this.uid).subscribe(user=>{
      this.userData = user.map(userItem=>({
          ...userItem.payload.val()
        }));
        console.log(this.userData, "filterData")
    });
  }

}
