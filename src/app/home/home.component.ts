import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  uid:string;
  userData:Array<any> = [];
  isAdminFlag:boolean;
  constructor( private authService: AuthService,
     public afAuth: AngularFireAuth,) { }

  ngOnInit() {
    let loggedinData = localStorage.getItem('isLoggedIn');
    this.uid = JSON.parse(loggedinData).user_id;
    //console.log(JSON.parse(localStorage.getItem('isLoggedIn')), "kjhkjh");
    //console.log(JSON.parse(loggedinData), "j")
    this.authService.getUserData(this.uid).subscribe(user=>{
      this.userData = user.map(userItem=>({
          ...userItem.payload.val()
        }));
        console.log(this.userData, "filterData")
    });
  }

  updateUserRole(email){
    console.log(email, "email");
    console.log(this.isAdminFlag, "flag")
    const userRole = (this.isAdminFlag) ? 'admin' : 'admin';
    const data = {email: email, role: userRole};
    this.authService.makeAdmin(data).subscribe(userDetails=>{
      console.log(userDetails,"jj");
    })
  }

  signout(){
    this.authService.logout();
  }

}
