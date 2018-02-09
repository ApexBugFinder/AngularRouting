import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductResolver } from './product-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            { path: 'products/:id', component: ProductDetailComponent, resolve: {product: ProductResolver} },
            { path: 'products/:id/edit', component: ProductEditComponent, resolve: { product: ProductRe} }
        ])
    ],
    exports: [ RouterModule ]
})
export class ProductRoutingModule { }
