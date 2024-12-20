import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import { Blog, BlogFormData } from 'src/app/app-interface';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
 
  myForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    subtitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    body: new FormControl('', [Validators.required, Validators.minLength(10)]),
    reportType: new FormControl('', Validators.required),
    isPrimary: new FormControl(false, Validators.required),
    publisherName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    publisherJob: new FormControl('', Validators.required),
  });
  
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  
  types: string[] = ['Noticia', 'Artículo', 'Aviso', 'Entrevista'];

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blog | null // Datos recibidos del diálogo, si los hay
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

    if (this.data) {
      this.myForm.patchValue({
        title: this.data.title,
        subtitle: this.data.subtitle,
        body: this.data.body,
        reportType: this.data.report_type,
        isPrimary: this.data.is_primary,
        publisherName: this.data.publisher_name,
        publisherJob: this.data.publisher_job,
      });
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  
  getErrorMessage(): string {
    return 'Campo obligatorio o mal formateado';
  }

  
  close(): void {
    this.dialogRef.close();
  }

  
  saveForm(): void {
    if (this.myForm.valid) {
      const blogFormData: BlogFormData = {
        title: this.myForm.value.title ?? '',
        subtitle: this.myForm.value.subtitle ?? '',
        body: toHTML( this.myForm.value.body as any) ?? '',
        reportType: this.myForm.value.reportType ?? '',
        isPrimary: this.myForm.value.isPrimary ?? false,
        publisherName: this.myForm.value.publisherName ?? '',
        publisherJob: this.myForm.value.publisherJob ?? '',
      };
      
  
      console.log('Datos enviados al backend:', blogFormData);
  
      if (this.data?.id) {
        
        const blogId = encodeURIComponent(this.data.id);
        console.log('Actualizando blog con ID:', blogId);
  
        
        this.dialogRef.close({ id: blogId, formData: blogFormData });
      } else {
       
        console.log('Creando nuevo blog');
        this.dialogRef.close(blogFormData);
      }
    } else {
      console.error('Formulario inválido:', this.myForm.errors);
    }
  }
}  
