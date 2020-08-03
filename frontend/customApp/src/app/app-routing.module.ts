import { AddCustomerComponent } from './add-customer/add-customer.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Routes, RouterModule } from '@angular/router';  
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  { path: "", redirectTo: 'view-customer', pathMatch: 'full' },
  { path: 'view-customer', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'all-customers', component: DataTableComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
