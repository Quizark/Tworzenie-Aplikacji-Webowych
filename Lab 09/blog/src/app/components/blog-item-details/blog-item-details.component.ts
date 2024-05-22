//blog-item-details.component.ts

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
 selector: 'app-blog-item-details',
 standalone: true,
 imports: [HttpClientModule],
 providers: [DataService],
 templateUrl: './blog-item-details.component.html',
 styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = 'http://osnews.pl/wp-content/uploads/2016/06/it-grafika.jpg';
  public text: string = 'Tytuł';

 constructor(private service: DataService, private route: ActivatedRoute) {
 }

 ngOnInit() {
   let id: string = '';
   this.route.paramMap
     .subscribe((params: any) => {
       id = params.get('id');
     });

   this.service.getById(id).subscribe((res: any) => {
     this.image = res['image'];
     this.text = res['text'];
   });

 }
}
