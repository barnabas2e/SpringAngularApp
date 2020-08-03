import { CustumerServiceService } from 'src/app/custumer-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public customerService: CustumerServiceService) { }

onNoClick(): void {
  this.dialogRef.close();
}

confirmDelete(): void {
  this.customerService.removeCustomer(this.data.id);

 // this.customerService.deleteCustomer(this.data.id);
}

}
