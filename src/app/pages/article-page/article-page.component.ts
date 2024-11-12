import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../models/article.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  articleId!: number;
  article?: Article;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      this.getArticleById(this.articleId);
    });
  }

  getArticleById(id: number): void {
    this.http.get<Article>(`http://localhost:3000/articles/${id}`).subscribe((article) => {
      this.article = article;
    });
  }
}
