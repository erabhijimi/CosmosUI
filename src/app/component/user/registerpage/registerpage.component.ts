import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { RegisterUser } from 'src/app/model/RegisterUser';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {
  errorMsg:String;
  user=new RegisterUser();
  togglePage:boolean=false;
  showErrorPage=false;
  constructor(private usersService:UsersService, private routes:Router) { }

  ngOnInit(): void {
  }
  successfullyRegisteredUser(){
    this.routes.navigate(['/loginpage']);
  }
  onLoginUser(){
    this.showErrorPage=false;
    this.routes.navigate(['/loginpage']);
  }
  onRegisterUser(){
    this.showErrorPage=false;
    this.usersService.saveRegisterUser(this.user)
    .subscribe((data)=>{
      console.log("Saved successfully "+data);
      this.togglePage=true;
    },(error)=>{
      console.log("Some issue"+error);
      this.errorMsg=error;
      this.showErrorPage=true;
    }
    );
      
  }

}
