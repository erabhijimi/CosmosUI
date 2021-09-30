import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from 'src/app/model/inventory';
import { InventoryService } from 'src/app/service/inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html'
})
export class AddInventoryComponent implements OnInit {
  inventory= new Inventory();

  expiaryList=['15 Days','30 Days','3 Months','6 Months','1 Year','Other'];
  constructor(private route:ActivatedRoute,private inventoryService:InventoryService,private routes:Router) { }

  ngOnInit(): void {
    this.readProductId();  
  }
  readProductId(){
    let id = parseInt(this.route.snapshot.params.id);
    this.inventory.productId=id;
  }
  onSubmitProductToInventory(){
    //save this Inventory to database
    //this.inventory.mfgDate=new Date();
    this.inventoryService.saveProductToInventory(this.inventory)
    .subscribe(data => {
      console.log("Saved successfully");
    });
    this.routes.navigate(['/inventory']); 
  }

}
