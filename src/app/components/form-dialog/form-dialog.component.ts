import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


export interface Food {
  id: number;
  name: string;
  size:number;
  active: boolean;
}

interface city {
  value: string;
  viewValue: string;
}
@Component({
  
  selector: 'app-Form-dialog',
  templateUrl: './Form-Dialog.component.html',
  styleUrls: ['./Form-dialog.component.scss']
  
  
  
})
export class FormDialogComponent {
  constructor(private dialogRef: MatDialogRef<FormDialogComponent>) {}

  
 
  types: string[] = ['Noticia', 'Artículo', 'Aviso', 'Entrevista'];
  

  myForm = new FormGroup({
    title: new  FormControl('',  Validators.required), 
    subtitle: new FormControl(null, Validators.required,),
    body: new FormControl(null, [Validators.required]),
    reportType: new FormControl(null, Validators.required),
    isPrimary: new FormControl(false, Validators.required),
    // publisherName: new FormControl(null, Validators.required),
    // publisherJob: new FormControl(null, Validators.required),
    
  });

  get title(): FormControl { 
    return this.myForm.controls['title'];
    
  }
  getErrorMessage():string{
    return 'campo obligatorio'; 
    
  }

  saveForm (){
    if(this.myForm.valid){
      this.dialogRef.close(this.myForm.value);
    }

  }

 

    

  
}



