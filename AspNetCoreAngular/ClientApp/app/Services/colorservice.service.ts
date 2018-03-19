import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ColorService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getColors() {
        return this._http.get(this.myAppUrl + 'api/Color/Index')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getColorById(id: number) {
        return this._http.get(this.myAppUrl + "api/Color/Details/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveColor(color) {
        return this._http.post(this.myAppUrl + 'api/Color/Create', color)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateColor(color) {
        return this._http.put(this.myAppUrl + 'api/Color/Edit', color)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteColor(id) {
        return this._http.delete(this.myAppUrl + "api/Color/Delete/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}