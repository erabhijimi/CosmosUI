import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/model/RegisterUser';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  user=new RegisterUser();
  loggedIn:boolean;
  msg:string;
  submited:boolean=false;
  token:string;
  
  constructor(private usersService:UsersService,private routes:Router) { }

  ngOnInit(): void {
  }
  onLoginUser(){
    this.submited=true; 
    this.usersService.getLoginAccessToken(this.user)
                      .subscribe(data=>{
                        console.log("got the access token"+data.jwtToken);
                        this.token = data.jwtToken;
                        this.usersService.saveToken(this.token);
                        this.loggedIn=this.usersService.loginUser(this.user);
                        //window.location.reload();
                        if(this.loggedIn){
                          this.routes.navigate(['/home']);
                      } 
                        
    });    
  }
}
