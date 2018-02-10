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
    // dataIsValid is a key value array that passes whether or not the particular form 
    // has passed validation
    private dataIsValid: { [key: string]: boolean} = {};

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
        if (this.isValid(null)) {
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

    //  Function is called to check to see if the form is valid, it calls the validation function to check to see if 
    // all the values in the in the model are valid, if not the save button is disabled
    isValid(path: string): boolean {
        this.validate();

        // the path parameter allows you to check to validate each form separately whether it is the tags form or the 
        // basic information form
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    // validation function checks the model which is wired to the user's inputs for validation errors

    validate(): void {
        // Clear validation object 
        this.dataIsValid = {};

        // 'info' tab
        if (this.product.productName && this.product.productName.length >= 3 && this.product.productCode) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if ( this.product.category && this.product.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
