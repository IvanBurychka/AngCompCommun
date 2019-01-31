import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from "@angular/forms";
import {CriteriaComponent} from "../shared/criteria/criteria.component";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    filterName: string;

    includeDetails: boolean = true;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    parentListFilter: string;

    // @ViewChild('filterElement') filterElementRef: ElementRef;
    // @ViewChildren('filterElement, nameElement') filterElementRefs: QueryList<ElementRef>;
    // @ViewChildren(NgModel) filter1ElementRefs: QueryList<NgModel>;

    // @ViewChild(NgModel) filterInput: NgModel;

    // private _listFilter: string;
    //
    // get listFilter(): string {
    //   return this._listFilter;
    // }
    //
    // set listFilter(filter: string) {
    //   this._listFilter = filter;
    //   this.performFilter(this._listFilter);
    // }

    constructor(private productService: ProductService) {
      // console.log(this.filterElementRef);
    }


    ngAfterViewInit(): void {
        // if (this.filterElementRef.nativeElement) {
        //     console.log('this.filterElementRef');
        //     console.log(this.filterElementRef);
        //     this.filterElementRef.nativeElement.focus();
        // }
        // this.filterInput.valueChanges.subscribe(
        //     () => this.performFilter(this.listFilter)
        // )

        this.parentListFilter = this.filterComponent.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
        // console.log(this.filterElementRef);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    onValueChange(filterBy: string): void {
      this.performFilter(filterBy);
    }
    // onFilterChange(filter: string) {
    //   this.listFilter = filter;
    //   this.performFilter(this.listFilter);
    //   console.log(filter);
    // }
}
