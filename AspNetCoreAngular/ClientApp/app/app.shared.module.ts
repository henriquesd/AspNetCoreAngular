import { NgModule } from '@angular/core';

import { ProductService } from './services/productservice.service'
import { ColorService } from './services/colorservice.service'

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchProductComponent } from './components/fetchproduct/fetchproduct.component'
import { createproduct } from './components/addproduct/AddProduct.component'

import { FetchColorComponent } from './components/fetchcolor/fetchcolor.component'
import { createcolor } from './components/addcolor/AddColor.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchProductComponent,
        createproduct,
        FetchColorComponent,
        createcolor
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-product', component: FetchProductComponent },
            { path: 'register-product', component: createproduct },
            { path: 'product/edit/:id', component: createproduct },

            { path: 'fetch-color', component: FetchColorComponent },
            { path: 'register-color', component: createcolor},
            { path: 'color/edit/:id', component: createcolor },
            { path: '**', redirectTo: 'home' }


        ])
    ],
    providers: [ProductService, ColorService]
})

export class AppModuleShared {
}