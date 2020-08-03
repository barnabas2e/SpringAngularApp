import { CustumerServiceService } from './../custumer-service.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Customer } from '../customer';
import { FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private  customerService: CustumerServiceService) { }

  customerArray: any[] =[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  customers: Observable<Customer[]>;
  customer: Customer = new Customer();
  deleteMessage = false;
  customerList: any;
  isUpdated = false;

  ngOnInit(): void {
    this.isUpdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };

    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
      this.dtTrigger.next();
    })
  }

  /**
   * delete customer by ID
   * 
   * @param id : id of the customer to delete
   */
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(data => {
      console.log(data);
      this.deleteMessage = true;
      this.customerService.getAllCustomers().subscribe(data => {
        this.customers = data
      })
    },

    error => console.log(error));
  }

  /**
   * update customer
   * 
   * @param id: id of the customer to update
   */
  updateCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(data => {
      this.customerList = data
    },
    error => console.log(error));
  }

  customerUpdateForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address:new FormControl()
  });

  updateCust(updCust) {
    this.customer = new Customer();
    this.customer.id = this.Id.value;
    this.customer.name = this.Name.value;
    this.customer.email = this.Email.value;
    this.customer.phone = this.Phone.value;
    this.customer.address = this.Address.value;

    console.log(this.Email.valid);

    this.customerService.updateCustomer(this.customer, this.customer.id).subscribe(
      data => {
      this.isUpdated = true;
      this.customerService.getAllCustomers().subscribe(data => {
        this.customers = data
      })
    },
    error => console.log(error));
  }


  get Id() {
    return this.customerUpdateForm.get('id');
  }

  get Name() {
    return this.customerUpdateForm.get('name');
  }

  get Email() {
    return this.customerUpdateForm.get('email');
  }

  get Phone() {
    return this.customerUpdateForm.get('phone');
  }

  get Address() {
    return this.customerUpdateForm.get('address');
  }

  changeIsUpdate() {
    this.isUpdated = false;
  }
}
