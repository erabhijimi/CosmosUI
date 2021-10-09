import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/Product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categoryList=['Packet','Loose'];
  typeList=['Dali','Masala','Atta','Ditergent','Tooth Paste','Other'];
  unitList=['Kg','gm','ltr'];
  showCustDetails:boolean=false;
  expiaryList=['15 Days','30 Days','3 Months','6 Months','1 Year','Other'];
  product= new Product();
  get custId(){
    return this.addPurchaseForm.get('custId');
  }
  get custAddress(){
    return this.addPurchaseForm.get('custAddress');
  }

  addPurchaseForm = this.fb.group({
    custId:['',Validators.compose([Validators.minLength(10)])],
    custAddress: this.fb.group({
      custName:['',Validators.required],
      custAddressLine1:['',Validators.required],
      landmark:['',Validators.required]
    }),
    saleDate:[''],
    product:this.addProductDetails(),
    inventoryCreate: this.fb.group({
      quantityOfProduct:[''],
      mfgDate:[''],
      bestBeforeDays:[''],
      comments:[''],
    }) 
  });
  addProductDetails(): FormGroup {
    return this.fb.group({
      productName:['',Validators.required],
      productCategory:[''],
      productType:[''],
      productBrand:[''],
      productUnit:[''],
      productAmount:[''],
      productMRP:[''],
      productRealPrice:[''],
      productSellingPrice:['']      
    })
  }

  constructor(private productService: ProductService,private routes:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmitProduct(){
    console.log(this.addPurchaseForm.value);
    this.productService.saveQuickProduct(this.addPurchaseForm.value)
    .subscribe(data => {
      console.log("Saved successfully");
      this.routes.navigate(['/productmenu']);
      });
  }
  getCustDetails(){
    console.log("Calling the Address for this user:"+this.custId.value);
    this.productService.getCustDetails(this.custId.value)
    .subscribe(data => {
      this.custAddress.patchValue({
        custName:data.custName,
      custAddressLine1:data.custAddressLine1,
      landmark:data.landmark
      })
      console.log("Saved successfully"+data);
      });
    this.showCustDetails=true;

  }

}
