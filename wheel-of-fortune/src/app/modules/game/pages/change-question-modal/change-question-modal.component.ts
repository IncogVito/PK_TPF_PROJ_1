import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-question-modal',
  templateUrl: './change-question-modal.component.html',
  styleUrls: ['./change-question-modal.component.scss']
})
export class ChangeQuestionModalComponent implements OnInit {

  public questionForm: FormControl = new FormControl(undefined, Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: any,
              public readonly dialogRef: MatDialogRef<any, string>) {
  }

  ngOnInit(): void {
    this.questionForm.setValue(this.data.question);
  }

  saveValidated() {
    if (this.questionForm.valid) {
      this.dialogRef.close(this.questionForm.getRawValue());
    }
  }

  close() {
    this.dialogRef.close();
  }
}
