import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/customer';
import { CustumerServiceService } from 'src/app/custumer-service.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Customer, 
    public customerService: CustumerServiceService) { }

    FormControl = new FormControl('', [
      Validators.required
    ])

    //check if the validation actually works
  getErrorMessage() {
    return this.FormControl.hasError('required') ? 'Field is required' :
    this.FormControl.hasError('email') ? "Not a valid email" : '';
  }

  submit() {
    // empty stuff
  }

  onNoClick() : void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.customerService.addCustomer(this.data);
  }
}
