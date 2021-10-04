import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  constructor(private fb:FormBuilder,private productService:ProductService) { }
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
    custId:['',[Validators.minLength(3),Validators.required]],
    custAddress: this.fb.group({
      custName:['',Validators.required],
      custAddressLine1:['',Validators.required],
      landmark:['',Validators.required]
    }),
    saleDate:[''],
    items:this.fb.array([
      this.addItemDetails()
    ])
  });
  addItemDetails(): FormGroup {
    return this.fb.group({
      productName:['',Validators.required],
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
  productNameList: String[];
  Search(){
    /* console.log("inside search()"+productNameSearch);
    if(productNameSearch ==""){
      this.ngOnInit();
    }else{
      return this.productArray = this.productArray.filter(res=>{
        return res.productName.toLocaleLowerCase().match(productNameSearch.toLocaleLowerCase());
      })
    } */
  }

}
