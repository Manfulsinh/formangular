import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import{MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'




@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit  {

freeshnessList=["Brand New","Second Hand","Refurbished"]
productForm !:FormGroup;
actionBtn: string = "Save"



constructor(private formBuilder: FormBuilder,

  @Inject(MAT_DIALOG_DATA) public ediData:any,
  private dialogRef :MatDialogRef<DialogComponent>) { }
  ngOnInit():void{



  this.productForm = this.formBuilder.group({
    No: ['', Validators.required],
    Name: ['', Validators.required],
    Weight: ['', Validators.required],
    RollNo: ['', Validators.required]
});

    



  if(this.ediData){
    this.actionBtn = "Update";
    this.productForm.controls['No'].setValue(this.ediData.No);
    this.productForm.controls['Name'].setValue(this.ediData.Name);
    this.productForm.controls['Weight'].setValue(this.ediData.Weight);
    this.productForm.controls['RollNo'].setValue(this.ediData.RollNo);
}


  }

  addProduct() {
    if(this.productForm.valid) {
        this.dialogRef.close(this.productForm.value);
    }
}



}