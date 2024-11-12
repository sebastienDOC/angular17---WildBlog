import { Component, inject } from '@angular/core';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleThumbnailComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  http = inject(HttpClient);
  articles: Article[] = [];

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }

  constructor() {
    this.getArticles();
  }

  getArticles(): void {
    this.http.get<Article[]>('http://localhost:3000/articles').subscribe((articles) => {
      this.articles = articles;
    });
  }
}
