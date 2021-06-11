import { AuthService } from './../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { country, state } from '../modules/registration-const';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerationForm: FormGroup;
  states: state []= [{
    id:1,
    name:"Uttar Pradesh"
  },
  {
    id:2,
    name:"Haryana"
  },
  {
    id:3,
    name:"Punjab"
  },
  {
    id:3,
    name:"Delhi"
  }]

  countries: country [] = [{
    id:1,
    name:"india"
  }]
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router: Router) { }

  ngOnInit() {
    console.log("hello")
    this.registerationForm = this.formBuilder.group({
      name:[],
      email:[null,Validators.compose([Validators.email,Validators.required])],
      phone:[],
      city:[],
      state:[],
      country:[],
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    })
  }


  registerUser(registrationData){
    console.log(registrationData, "registrationData")
    this.authService.registerUser(registrationData).subscribe(data=>{
      console.log(data, "hello")
      if(data){
        this.router.navigate(['/'])
      }
    })
  }

}
