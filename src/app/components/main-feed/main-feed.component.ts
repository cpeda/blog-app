import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MainService } from 'src/app/services/main.service';
import { Blog, BlogFormData } from 'src/app/app-interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnInit {
  blogs: Blog[] = []; 
  isLoading = false; 
  isLoadingBlogs = false; 

  constructor(
    private dialog: MatDialog,
    private services: MainService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  
  showMessage(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  loadBlogs(): void {
    this.isLoadingBlogs = true;
    this.services.getAll().subscribe({
      next: (response) => {
        this.blogs = response;
        console.log('Blogs cargados exitosamente:', this.blogs);
        this.isLoadingBlogs = false;
      },
      error: () => {
        this.isLoadingBlogs = false;
        this.showMessage('Hubo un error al cargar los blogs.');
      }
    });
  }

  
  deleteBlog(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este blog?')) {
      this.services.deleteBlog(id).subscribe({
        next: () => {
          this.showMessage('Blog eliminado exitosamente.');
          this.loadBlogs();
        },
        error: () => {
          this.showMessage('Hubo un error al intentar eliminar el blog.');
        }
      });
    }
  }

  createBlog(): void {
    const dialog = this.dialog.open(FormDialogComponent, {
      maxWidth: '600px',
      maxHeight: '90vh',
      disableClose: true,
      data: {} 
    });

    dialog.afterClosed().subscribe((data?: BlogFormData) => {
      if (data) {
        console.log('Datos enviados al crear el blog:', data);
        this.services.createBlog(data).subscribe({
          next: () => {
            this.showMessage('Blog creado exitosamente.');
            this.loadBlogs();
          },
          error: () => {
            this.showMessage('Hubo un error al crear el blog.');
          }
        });
      }
    });
  }

  
  editBlog(blogId: number): void {
    this.services.getBlogById(blogId).subscribe({
      next: (response: Blog) => {
        const dialog = this.dialog.open(FormDialogComponent, {
          width: '600px',
          disableClose: true,
          data: {
            title: response.title,
            subtitle: response.subtitle,
            body: response.body,
            reportType: response.report_type,
            isPrimary: response.is_primary,
            publisherName: response.publisher_name,
            publisherJob: response.publisher_job,
            topnews: response.is_primary,
            typeNews: response.report_type,
            conten: response.body,
          }, 
        });
  
        dialog.afterClosed().subscribe((data?: BlogFormData) => {
          if (data) {
            const blogDataUpdate: BlogFormData = {
              title: data.title,
              subtitle: data.subtitle,
              body: data.body,
              reportType: data.reportType,
              isPrimary: data.isPrimary,
              publisherName: data.publisherName,
              publisherJob: data.publisherJob,
              topnews: data.topnews,
              typeNews: data.typeNews,
              conten: data.conten,
            };
  
            this.services.updateBlog(blogId, blogDataUpdate).subscribe({
              next: () => {
                this.showMessage('Blog actualizado exitosamente.');
                this.loadBlogs(); 
              },
              error: () => {
                this.showMessage('Hubo un error al actualizar el blog.');
              },
            });
          }
        });
      },
      error: () => {
        this.showMessage('Hubo un error al cargar los datos del blog para editar.');
      },
    });
  }
  
  getAllBlogs() {
    throw new Error('Method not implemented.');
  }
  
 
  goToBlog(blogId: number): void {
    this.router.navigate(['/blog', blogId]);
  }

  
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
    this.showMessage('Sesión cerrada exitosamente.');
  }
}










