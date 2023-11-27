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

// // Import kar rahe hain kuch zaruri modules from Angular
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs'; // Observable ek component hai rxjs ka, jo asynchronous tasks jaise ki HTTP requests, user input handling, aur state changes ke liye common hai.
// import { Product } from '../common/product';
// import { map } from 'rxjs/operators'; // rxjs ka hissa hai - (Reactive Extensions for JavaScript), ye commonly asynchronous tasks ko handle karne mein use hota hai jaise ki HTTP requests, user input handling, aur state changes ko manage karna.

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private baseUrl = 'http://localhost:8080/api/products';
//   // HttpClient module ka ek instance (httpClient) inject kiya gaya hai constructor mein.

//   constructor(private httpClient: HttpClient) {

//   }

//   // getProductList() ek observable return karta hai jo product array ke sath connect hota hai.
//   getProductList(): Observable<Product[]> {
//    HttpClient ka get method use kiya gaya hai to get data from the specified URL (this.baseUrl).
//     Fir, rxjs ka pipe method use kiya gaya hai data ko manipulate karne ke liye.
//      Yahaan, map operator use kiya gaya hai jise data ko modify karke observable mein bhej sakte hain.
//     return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
//       map(response => response._embedded.products)
//       map ek operator hai jo observable se aaye data ko manipulate karne mein help karta hai.
//     );
//   }
// }

// Spring Data Rest ke _embedded entry se JSON ko extract karne ke liye ek interface banaya gaya hai.
// interface GetResponse {
//   _embedded: {
//     products: Product[];
//   }
// }
