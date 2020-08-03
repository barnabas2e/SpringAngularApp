import { Customer } from './../customer';
import { CustumerServiceService } from './../custumer-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private custumerService: CustumerServiceService) { }

  customer: Customer = new Customer();
  submitted = false;

  ngOnInit(): void {
    this.submitted = false;
  }

  customerSaveForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.pattern("'[0-9]{3} [0-9]{3} [0-9]{4}")]),
    address: new FormControl()
  });

  saveCustomer(saveCustomer) {
    this.customer = new Customer();
    this.customer.name = this.Name.value;
    this.customer.email = this.Email.value;
    this.customer.phone = this.Phone.value;
    this.customer.address = this.Address.value;

    this.submitted = true;
    this.save();
  }

  save() {
    this.custumerService.createCustomer(this.customer)
      .subscribe(data => console.log(data), error => console.log(error));
    this.customer = new Customer();
  }

  get Name() {
    return this.customerSaveForm.get('name');
  }

  get Email() {
    return this.customerSaveForm.get('email');
  }

  get Phone() {
    return this.customerSaveForm.get('phone');
  }

  get Address() {
    return this.customerSaveForm.get('address')
  }

  resetAddCustomerForm() {
    this.submitted = false;
    this.customerSaveForm.reset();
  }
}
