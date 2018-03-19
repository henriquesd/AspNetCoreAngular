import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/productservice.service'

@Component({
    selector: 'fetchproduct',
    templateUrl: './fetchproduct.component.html'
})

export class FetchProductComponent {

    public productList: ProductData[];

    constructor(public http: Http, private _router: Router, private _productService: ProductService) {
        this.getProducts();
    }
    getProducts() {
        this._productService.getProducts().subscribe(
            data => this.productList = data
        )
    }
    delete(productId) {
        var ans = confirm("Do you want to delete the product with Id: " + productId);
        if (ans) {
            this._productService.deleteProduct(productId).subscribe((data) => {
                this.getProducts();
            }, error => console.error(error))
        }
    }
}
interface ProductData {
    id: number;
    name: string;
    details: string;
    quantity: number;
}