import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../model/RegisterUser';
import { Users } from '../model/User';
import { baseUrl } from 'src/environments/environment';
import { Invoice } from '../model/Invoice';
import { CartService } from './cart.service';
import { UsersList } from '../model/UserList';
import { JWTResponse } from '../model/JWTResponse';
import { catchError ,map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,private cartService:CartService) { }

  //DB calls
  //Update Password
  public updatePassword(user: RegisterUser) {
    return this.httpClient.put(`${baseUrl}user/register/`+user.username,user );
  }
  public getInvoiceForCustomer() {
    let mobileNumber = parseInt(localStorage.getItem('username'));
    let url = `${baseUrl}invoice/`+mobileNumber;
    return this.httpClient.get<Invoice>(url);
  }
  public dummyCall() {
    return this.httpClient.get(`${baseUrl}user/login/admin`, { headers: { authorization: this.createJWTHeader()  }, responseType: 'text' });
  }
  public validateLogin(user: RegisterUser) {
    console.log("we are authenticating this user get method: "+this.createBasicAuthToken(user.username, user.password));
    return this.httpClient.get(`${baseUrl}user/`, { headers: { authorization: this.createBasicAuthToken(user.username, user.password)  }, responseType: 'text' });
  }
  public getLoginAccessToken(user: RegisterUser) {
    console.log("we are authenticating this user post method : "+this.createBasicAuthToken(user.username, user.password));
    return this.httpClient.post<JWTResponse>(`${baseUrl}user/login/`, user ,{ headers: { authorization: this.createBasicAuthToken(user.username, user.password)  }})
    .pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
        return throwError(error.message || 'Server Error') ;
      })
    );
  }
  errorHandler(errorHandler: any) {
    throw new Error("Method not implemented.");
  }
  public saveRegisterUser(user:RegisterUser){
    return this.httpClient.post<string>(`${baseUrl}user/register`,user )
    .pipe(
      // eg. "map" without a dot before
      map(data => {
        return data;
      }),
      // "catchError" instead "catch"
      catchError(error => {
          return throwError(error.message || 'Server Error') ;
      })
    );
  }
  public getUser(moblieNumber){
    return this.httpClient.get<Users>(`${baseUrl}contact/`+moblieNumber);
  }
  public getAllUsers(){
    return this.httpClient.get<UsersList>(`${baseUrl}contact`);
  }
  public saveUser(user:Users){
    console.log("Inside add userr repo: "+user);
    return this.httpClient.post<Users>(`${baseUrl}contact`,user);
  }
  public getAllUsersWhatsappOnly(){
    return this.httpClient.get<UsersList>(`${baseUrl}contact/vwhatsapponly/`+true);
  }
  public getAllUsersNoWhatsapp(){
    return this.httpClient.get<UsersList>(`${baseUrl}contact/vwhatsapponly/`+false);
  }
  public getAllUsersOnThisDate(selecteddate){
    console.log(selecteddate);
    return this.httpClient.get(`${baseUrl}contact/vbyaddeddate/`+selecteddate);
  }
  public savefromExcelSheet(){
    return this.httpClient.post<any>(`${baseUrl}user/fromprop`, { title: 'Angular POST Request Example' });
  }
  //Static calls
  public saveToken(data: string) {
    //var json = JSON.parse(data);
    localStorage.setItem('token',data);
  }
  public createJWTHeader(){
    let token =localStorage.getItem('token');
    return 'Bearer ' + token;
  }
  createBasicAuthToken(username: Number, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }
  public checkAdmin() {
    let username = localStorage.getItem('username');
    if(Number(username) == 9003049525) {
      return true;
    }
    else if(Number(username) == 8260827074){
      return true;
    }
    else {
      return false;
    }
  }
  public loginUser(user: RegisterUser) {
      let mobileNumber = user.username;
      localStorage.setItem('username',mobileNumber.toString());
      return true;    
  }
  public checkLoggedin(){
    let uname = localStorage.getItem('username');
    if(Boolean(uname)){
      return true;
    } else {
      return false;
    }
  }
  
}
