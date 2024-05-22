//app.routes.ts

import { Routes } from '@angular/router';
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details.component';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';

export const routes: Routes = [
  {
    path: 'blog/detail/:id',
    component: BlogItemDetailsComponent // Poprawienie komponentu na BlogItemDetailsComponent
  },
  {
    path: '',
    component: BlogHomeComponent // Domyślna ścieżka do strony głównej bloga
  }
];
