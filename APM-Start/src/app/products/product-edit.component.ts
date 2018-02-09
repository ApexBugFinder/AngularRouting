import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    product: IProduct;

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute) {
                   
                }

    ngOnInit(): void {
    // only needs to pull data from the route resolver
    //  but this causes problem if you want to switch to Add Product and 
    // change the product from params being passed via routerLink
    // you would need an observable
    // SNAPSHOT
    //  this.onProductRetrieved(this.route.snapshot.data['product']);
    // OBSERVABle
    this.route.data.subscribe(data =>
        this.onProductRetrieved(data['product']));

    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => {
                            this.onSaveComplete(`${this.product.productName} was deleted`);
                        },
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }
   
    saveProduct(): void {
        if (true === true) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => {
                        this.onSaveComplete(`${this.product.productName} was saved`);
                },
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }

        // Navigate back to the product list
        this.router.navigate(['/products']);
    }
}
