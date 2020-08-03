import { CustumerServiceService } from 'src/app/custumer-service.service';
import { CustomerDataSource } from './../data-table-datasource/customer-data-source';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { AddDialogComponent } from '../dialogs/add/add-dialog/add-dialog.component';
import { Customer } from '../customer';
import { EditDialogComponent } from '../dialogs/edit/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  displayedColumns = ['name', 'email', 'phone', 'address', 'actions'];
  customerDatabase: CustumerServiceService | null;
  customerDataSource: CustomerDataSource | null;
  index: number;
  id: number;
  
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public customerService: CustumerServiceService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }
  
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {customer: Customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside Customer Service
        this.customerDatabase.dataChange.value.push(this.customerService.getDialogData());
        this.refreshTable();
      }
    });
  }
  
  startEdit(i: number, id: number, name: string, email: string, phone: string, address: string) {
    this.id = id;
    // index row is used just for debugging purposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, name: name, email: email, phone: phone, address: address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside Customer Service by id
        const foundIndex = this.customerDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.customerDatabase.dataChange.value[foundIndex] = this.customerService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }
  
  deleteItem(i: number, id: number, name: string, email: string, phone: string, address: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, name: name, email: email, phone: phone, address: address}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.customerDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from Customer Service
        this.customerDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }
  
  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.customerDatabase = new CustumerServiceService(this.httpClient);
    this.customerDataSource = new CustomerDataSource(this.customerDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.customerDataSource) {
          return;
        }
        this.customerDataSource.filter = this.filter.nativeElement.value;
      });
  }
}
