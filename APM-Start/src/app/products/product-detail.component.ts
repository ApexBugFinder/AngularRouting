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


    constructor(private productService: ProductService, private route: ActivatedRoute) {
        console.log('this is the id: ' + this.route.snapshot.params['id']);
     }

     ngOnInit(): void {
         // SNAPSHOT
        // let id = +this.route.snapshot.params['id'];
        // this.getProduct(id); 

        // OBSERVABLE
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );

     }
    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }
}
