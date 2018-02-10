import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from './product';

@Component({
    templateUrl: './app/products/product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
    @ViewChild(NgForm) productForm: NgForm;

    errorMessage: string;
    product: IProduct;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Attains parent data via observable so that whenever the data source is updated it is 
        // immediately updated on the child routes and components
        this.route.parent.data.subscribe(data => {
            this.product = data['product'];

        //  Reset Validation is required if the observable is supplied with new data
        if (this.productForm) {
            this.productForm.reset();
        }
        });

    }
}
