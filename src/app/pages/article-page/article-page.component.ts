import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article.model';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  article?: Article;
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.apiService.getArticleById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(article => this.article = article);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
