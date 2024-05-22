//blog-home.component.ts

import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import {BlogComponent} from "../blog/blog.component";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';

@Component({
 selector: 'app-blog-home',
 standalone: true,
 imports: [SearchBarComponent, BlogComponent,FilterTextPipe],
 templateUrl: './blog-home.component.html',
 styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {

 public filterText: string = '';

 constructor() {
 }

 ngOnInit(): void {
 }

 getName($event: string): void {
   this.filterText = $event;
 }
}
