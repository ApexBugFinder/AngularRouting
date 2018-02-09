import { Component, OnInit} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;


    
    constructor(private route: ActivatedRoute) {
        console.log('this is the id: ' + this.route.snapshot.params['id']);
     }

     ngOnInit(): void {
       // component no longer pulls data from the product service or need getProduct method
       // it now gets all the data from the resolver in the route
        this.product = this.route.snapshot.data['product'];
     }
}
