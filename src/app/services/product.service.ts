import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //Observable is a component of rxjs
import { Product } from '../common/product';
import { map } from 'rxjs/operators'; // rxjs - (Reactive Extensions for JavaScript) it is commonly used for handling asynchronous tasks like HTTP requests, handling user input, and managing state changes.

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products?size=100';
  constructor(private httpClient: HttpClient) {
    //inject instance - (httpClient) of HttpClient module
  }
  getProductList(theCategoryId : number): Observable<Product[]> {

    //need to build url based on category id
    const searchUrl ='${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}';
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
      //operators is a component of rxjs & map is a operator. These operators help in manipulating the data emitted by observables.
    );
  }
}

//unwrap the JSON from Spring Data Rest _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

