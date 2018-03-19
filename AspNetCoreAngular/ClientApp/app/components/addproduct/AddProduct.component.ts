import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchProductComponent } from '../fetchproduct/fetchproduct.component';
import { ProductService } from '../../services/productservice.service';

import { ColorService } from '../../services/colorservice.service';

@Component({
    selector: 'createproduct',
    templateUrl: './AddProduct.component.html'
})

export class createproduct implements OnInit {
    productForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    colors: ColorService;

    constructor(private _fb: FormBuilder,
        private _avRoute: ActivatedRoute,
        private _productService: ProductService,
        private _router: Router,
        private _colorService: ColorService)
    {

        this._colorService.getColors().subscribe(data => this.colors = data,
            error => console.log(error));  

        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.productForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
            details: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
            colorId: ['', [Validators.required]],
            color: ['', [Validators.nullValidator]],
        })
    }
    ngOnInit() {
        if (this.id > 0) {
            this.title = "Edit";
            this._productService.getProductById(this.id)
                .subscribe(resp => this.productForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }
    save() {
        if (!this.productForm.valid) {
            return;
        }
        if (this.title == "Create") {
            this._productService.saveProduct(this.productForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-product']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            this._productService.updateProduct(this.productForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-product']);
                }, error => this.errorMessage = error)
        }
    }
    cancel() {
        this._router.navigate(['/fetch-product']);
    }
    get name() { return this.productForm.get('name'); }
    get details() { return this.productForm.get('details'); }
    get quantity() { return this.productForm.get('quantity'); }
    get colorId() { return this.productForm.get('colorId'); }
}