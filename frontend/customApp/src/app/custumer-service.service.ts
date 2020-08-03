import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustumerServiceService {

  private baseUrl = 'http://localhost:8080/api/'; 
  
  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  //Temporarily stores data from dialogs
  dialogData: any;
  constructor(private http: HttpClient) { }

  get data(): Customer[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}` +'customer-list');
  }

  createCustomer(customer: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'save-customer', customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete-customer/${id}`, 
    {responseType: 'text'});
  }

  getCustomer(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}customer/${id}`);
  }

  updateCustomer(value: any, id: number): Observable<Object> {
    console.log(id +""+ value);
    return this.http.post(`${this.baseUrl}update-customer/${id}`, value);
  }

  // use in the mat-data-table
  /**
   * A finder that helps get all customers 
   */
  findAllCustomers(): void {
    this.http.get<Customer[]>(this.baseUrl +'customer-list').subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
  }

  addCustomer(customer: Customer): void {
    this.http.post(this.baseUrl +'save-customer', customer).subscribe(data => {
      this.dialogData = customer;
    },
    (error: HttpErrorResponse) => {
      console.log("Error occurred: "+ error.name + ' '+ error.message);
    });
  }

  editCustomer(customer: Customer, id: number): void {
    this.http.post(`${this.baseUrl}update-customer/${id}`, customer).subscribe(data => {
      this.dialogData = customer;
    },
    (error: HttpErrorResponse) => {
      console.log("Error occurred: "+ error.name + ' '+ error.message);
    });
  } 

  removeCustomer(id: number): void {
    this.http.delete(`${this.baseUrl}delete-customer/${id}`, {responseType : 'text'}).subscribe(data => {
     console.log(data['']);
    },
    (error: HttpErrorResponse) => {
      console.log("Error occurred: "+ error.name + ' '+ error.message);
    });
  }

}
