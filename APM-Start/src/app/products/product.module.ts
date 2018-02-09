import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductResolver } from './product-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}
