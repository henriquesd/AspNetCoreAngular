import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorService } from '../../services/colorservice.service'

@Component({
    selector: 'fetchcolor',
    templateUrl: './fetchcolor.component.html'
})

export class FetchColorComponent {

    public colorList: ColorData[];

    constructor(public http: Http, private _router: Router, private _colorService: ColorService) {
        this.getColors();
    }
    getColors() {
        this._colorService.getColors().subscribe(
            data => this.colorList = data
        )
    }
    delete(colorId) {
        var ans = confirm("Do you want to delete the color with Id: " + colorId);
        if (ans) {
            this._colorService.deleteColor(colorId).subscribe((data) => {
                this.getColors();
            }, error => console.error(error))
        }
    }
}
interface ColorData {
    id: number;
    name: string;
}