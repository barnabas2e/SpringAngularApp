import { CustumerServiceService } from './custumer-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';  
import { AppRoutingModule } from './app-routing.module';   
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  
import { AppComponent } from './app.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { AddDialogComponent } from './dialogs/add/add-dialog/add-dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete-dialog/delete-dialog.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent, //used in angular dataTable
    CustomerListComponent, //used in angular dataTable
    DataTableComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule, //used in angular dataTable
    AppRoutingModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,
    BrowserAnimationsModule, 
    MaterialModule
  ],
  providers: [CustumerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
