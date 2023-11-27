import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit{
  products : Product[] = [];
  currentCategoryId: number = 1;
  constructor(private productService : ProductService,
              private route : ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts(){
    //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      const categoryIdFromRoute = this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = categoryIdFromRoute ? +categoryIdFromRoute : 1;
    }
    else{
      this.currentCategoryId = 1;
    }
    
    //now get the products for the given category id  
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}

// function listProducts() {
//   throw new Error('Function not implemented.');
// }
  // export class ProductListComponent implements OnInit{
  //   products : Product[] =  [];
  //   constructor(private productList : ProductService){
  
  //   }
  //   ngOnInit(){
  //     this.productList.getProductList().subscribe(
  //       data => {
  //         this.products = data;
  //       }
  //     )
  //   }
  // }