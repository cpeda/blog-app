import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
  
  
  
})
export class BodyComponent {
  
 
  types: string[] = ['Noticia', 'Artículo', 'Aviso', 'Entrevista'];
  

  myForm = new FormGroup({
    
    title: new  FormControl('',  Validators.required), 
    subtitle: new FormControl('', Validators.required,),
    body: new FormControl('', Validators.required),

    
  });
  get title(): FormControl { 
    return this.myForm.controls['title'];
    
  }
  getErrorMessage():string{
    return 'campo obligatorio'; 
    
  }

 

    

  
}



