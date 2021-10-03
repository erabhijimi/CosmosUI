import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  constructor(private fb:FormBuilder,private productService:ProductService) { }
  productNameSearch:String="";
  productArray:Product[];
  products:Array<Product> = [];
  showCustDetails:boolean=false;
  categoryList=['Packet','Loose'];
  typeList=['Dali','Masala','Atta','Ditergent','Tooth Paste','Other'];
  unitList=['Kg','gm','ltr'];
  expiaryList=['15 Days','30 Days','3 Months','6 Months','1 Year','Other'];
  get custId(){
    return this.addPurchaseForm.get('custId');
  } 
  get items(){
    return this.addPurchaseForm.get('items') as FormArray;
  }
  addAlternateItems(){
    this.items.push(this.addItemDetails());
  }
  addPurchaseForm = this.fb.group({
    custId:[''],
    custAddress: this.fb.group({
      custName:[''],
      custAddressLine1:[''],
      landmark:['']
    }),
    saleDate:[''],
    items:this.fb.array([
      this.addItemDetails()
    ])
  });
  addItemDetails(): FormGroup {
    return this.fb.group({
      productName:[''],
      productCategory:[''],
      productType:[''],
      productBrand:[''],
      productUnit:[''],
      productAmount:[''],
      productMRP:[''],
      productRealPrice:[''],
      productSellingPrice:[''],
      quantityOfProduct:[''],
      mfgDate:[''],
      bestBeforeDays:[''],
      comments:[''],
    })
  }
  ngOnInit(): void{
    this.productService.getAllProducts()
    .subscribe(data => {
      console.log(data);
      this.productArray=data.products;
    });
  } 
 
  getCustDetails(){
    this.showCustDetails=true;
    console.log("Need to search this number "+this.custId.value);
  }
  Search(productNameSearch){
    if(this.productNameSearch ==""){
      this.ngOnInit();
    }else{
      return this.productArray = this.productArray.filter(res=>{
        return res.productName.toLocaleLowerCase().match(this.productNameSearch.toLocaleLowerCase());
      })
    }
  }

}
