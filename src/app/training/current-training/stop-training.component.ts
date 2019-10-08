import { Component, Inject } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"

@Component({
  selector: "app-stop-component",
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content
      ><p>You already got {{ data.progress }}%</p></mat-dialog-content
    >
    <mat-dialog-actions
      ><button mat-button [mat-dialog-close]="true">Yes</button
      ><button mat-button [mat-dialog-close]="false">
        No
      </button></mat-dialog-actions
    >
  `,
})
export class StopTrainingComponent {
  constructor(
    public dialogRef: MatDialogRef<StopTrainingComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
  ) {}
}
