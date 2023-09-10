import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-diaolog',
  templateUrl: './edit-user-diaolog.component.html',
  styleUrls: ['./edit-user-diaolog.component.css'],
})
export class EditUserDiaologComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserDiaologComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  unvan: string;
  isAdmin: boolean;
  isNormal: boolean;
  id: number;
}
