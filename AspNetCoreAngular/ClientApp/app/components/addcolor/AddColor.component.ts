import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchColorComponent } from '../fetchcolor/fetchcolor.component';
import { ColorService } from '../../services/colorservice.service';

@Component({
    selector: 'createcolor',
    templateUrl: './AddColor.component.html'
})

export class createcolor implements OnInit {
    colorForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _colorService: ColorService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.colorForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
        })
    }
    ngOnInit() {
        if (this.id > 0) {
            this.title = "Edit";
            this._colorService.getColorById(this.id)
                .subscribe(resp => this.colorForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }
    save() {
        if (!this.colorForm.valid) {
            return;
        }
        if (this.title == "Create") {
            this._colorService.saveColor(this.colorForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-color']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            this._colorService.updateColor(this.colorForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-color']);
                }, error => this.errorMessage = error)
        }
    }
    cancel() {
        this._router.navigate(['/fetch-color']);
    }
    get name() { return this.colorForm.get('name'); }
}