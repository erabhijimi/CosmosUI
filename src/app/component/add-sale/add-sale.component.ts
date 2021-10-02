import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup ,FormControl,FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {
  constructor(private fb:FormBuilder) { }
  get items(){
    return this.addSaleForm.get('items') as FormArray;
  }
  addAlternateItems(){
    this.items.push(this.addItemDetails());
  }
  addSaleForm = this.fb.group({
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
      unit:[''],
      MRP:[''],
      discount:[''],
      Total:[''],
      quantity:['']
    })
  }
  ngOnInit(): void{} 
  /* {
     this.addSaleForm = new FormGroup({
      custId: new FormControl(),
      custName: new FormControl(),
      custAddress: new FormGroup({
        custAddressLine1: new FormControl(''),
        landmark: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        pincode: new FormControl('') 
      }),
      saleDate: new FormControl()
    }) 
  } 
  */

}
