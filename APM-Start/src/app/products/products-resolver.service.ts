import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { ProductService } from './product.service';

import { IProduct } from './product';

@Injectable()
export class ProductsResolver implements Resolve<IProduct[]> {
    constructor(private productService: ProductService, private router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct[]> {
        return this.productService.getProducts().map( products => {
            if (products) {
                return products ;
            }
            console.log(`Could not find list of products: productsResolver`);
            this.router.navigate(['/welcome']);
            return null;

        }).catch(error => {
            console.log(`Retrieval error:  ${error}`);
            this.router.navigate(['/welcome']);
            return Observable.of(null);
        });
    }
}
