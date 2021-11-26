import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/service/store.service';
import { Product } from 'src/app/model/Product';
import { Item } from 'src/app/model/Item';
import { UserCart } from 'src/app/model/UserCart';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  mobileNumber:any;
  cartList:Array<Item> =[];
  products:Array<Product> = [];
  showButton:boolean=true;
  productArray:Product[];
  productName:String;
  constructor(private storeService:StoreService, private cartService:CartService,private productService:ProductService) { }

  ngOnInit(): void {
    this.storeService.getAllStoreProducts()
    .subscribe(data => {
      console.log(data);
      this.productArray=data.products;
    });
  }
  onAddToCart(product:Product){
    product.productAddedToCart=true;
    console.log(product);
    this.cartService.onAddToCart(product);
  }
  userCart= new UserCart();
  saveCart(){
    this.userCart.mobileNumber=Number(localStorage.getItem('username'));
    this.userCart.items=this.cartService.getCartList();
    console.log(this.userCart);
    this.cartService.onSaveCart(this.userCart);
  }
  Search(){
    console.log("inside search()"+this.productName);
    if(this.productName ==""){
      this.ngOnInit();
    }else{
      return this.productArray = this.productArray.filter(res=>{
        return res.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
      })
    }
  }

}
