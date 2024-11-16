import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Blog } from 'src/app/app-interface';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit {
  blog: Blog | null = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private service: MainService) {}

  ngOnInit(): void {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    if (blogId) {
      this.service.getBlogById(blogId).subscribe({
        next: (response) => {
          this.blog = response;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          console.error('Error al cargar la noticia');
        }
      });
    }
  }
}


