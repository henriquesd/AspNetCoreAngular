import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getProducts() {
        return this._http.get(this.myAppUrl + 'api/Product/Index')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getProductById(id: number) {
        return this._http.get(this.myAppUrl + "api/Product/Details/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveProduct(product) {
        return this._http.post(this.myAppUrl + 'api/Product/Create', product)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateProduct(product) {
        return this._http.put(this.myAppUrl + 'api/Product/Edit', product)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteProduct(id) {
        return this._http.delete(this.myAppUrl + "api/Product/Delete/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}