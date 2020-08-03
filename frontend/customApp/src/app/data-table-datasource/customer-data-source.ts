import { CustumerServiceService } from './../custumer-service.service';
import { Customer } from '../customer';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export class CustomerDataSource extends DataSource<Customer> {
   
   _filterChange = new BehaviorSubject('');
   
   get filter(): string {
       return this._filterChange.value;
   }

   set filter(filter: string) {
       this._filterChange.next(filter);
   }

   filteredData: Customer[] = [];
   renderedData: Customer[] = [];

   constructor(public _customerService: CustumerServiceService, 
                public _paginator: MatPaginator,
                public _sort: MatSort) {
        super();
          // Reset to the first page when the user changes the filter.
          this._filterChange.subscribe( () => this._paginator.pageIndex = 0);
    }
   
    connect(): Observable<Customer[]> {
       const displayDataChanges = [
           this._customerService.dataChange,
           this._sort.sortChange,
           this._filterChange,
           this._paginator.page
       ];

       // get all customers record
       this._customerService.findAllCustomers();

       return merge (...displayDataChanges).pipe(map(() => {
           //Filter data
           this.filteredData = this._customerService.data.slice().filter((customer: Customer) => {
               const searchString = (customer.name + ""+ customer.email + customer.phone + customer.address).toLowerCase();
               return searchString.indexOf(this.filter.toLowerCase()) !== -1;
           });
           
            // Sort filtered data
            const sortedData = this.sortData(this.filteredData.slice());

            // Grab the page's slice of the filtered sorted data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;

            }
       ));
    }
    

    disconnect() {
    }

     /** Returns a sorted copy of the database data. */
    sortData(data: Customer[]): Customer[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: String = '',
                propertyB: String = '';
        
            switch (this._sort.active) {
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
                case 'phone': [propertyA, propertyB] = [a.phone, b.phone]; break;
                case 'address': [propertyA, propertyB] = [a.address, b.address]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

}
