import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MainService } from 'src/app/services/main.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit { 
  blogs: any[] = [];  // Variable para almacenar los blogs

  constructor(public dialog: MatDialog, private services: MainService){}

  ngOnInit(): void {
    this.loadBlogs();  // Refactorizamos para reutilizar el método en otros lados
  }

  // Método para cargar todos los blogs
  loadBlogs(): void {
    this.services.getAll().subscribe({
      next: (response) => {
        console.log(response);
        this.blogs = response;  // Almacena los blogs en la variable blogs
      },
      error: (err) => {
        console.error('Error al obtener los blogs:', err);
      }
    });
  }

  

  // Método para eliminar un blog
  deleteBlog(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este blog?')) {  // Confirmación antes de eliminar
      this.services.deleteBlog(id).subscribe({
        next: () => {
          alert('Blog eliminado exitosamente.');
          this.loadBlogs();  // Vuelve a cargar los blogs después de la eliminación
        },
        error: (err) => {
          console.error('Error al eliminar el blog:', err);
          alert('Hubo un error al intentar eliminar el blog.');
        }
      });
    }
  }

  openForm() {
    const dialog = this.dialog.open(FormDialogComponent, {
      maxWidth: '100vw', 
      maxHeight: '100vh', 
      disableClose: true,
      data: {}
    });

    dialog.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        const formData = {
          title: data.title,
          subtitle: data.subtitle,
          body: data.body,
          report_type: data.reportType,
          is_primary: true,
          publisher_name: "hola",
          publisher_job: "hola",
        };

        this.services.createBlog(formData).subscribe({
          next: () => {
            alert('Blog creado exitosamente.');
            this.loadBlogs();  // Vuelve a cargar los blogs después de crear uno nuevo
          },
          error: () => {
            alert('Hubo un error al crear el blog.');
          }
        });
      }
    });
  }
}




