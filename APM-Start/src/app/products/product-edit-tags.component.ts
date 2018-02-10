import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';

@Component({
    templateUrl: './app/products/product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    product: IProduct;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Attains parent data via observable so that whenever the data source is updated it is 
        // immediately updated on the child routes and components
        this.route.parent.data.subscribe(data => {
            this.product = data['product'];
        });


    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        this.product.tags.splice(idx, 1);
    }
}
