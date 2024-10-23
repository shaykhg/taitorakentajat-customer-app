import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataShareService} from '../services/data-share.service';
import {APIService} from '../services/api.service';
import {AppConstants} from '../AppConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('serviceSlide')  slides: IonSlides;
  @ViewChild('inspirationSlide')  inspirationSlide: IonSlides;

   slideOpts = {
    initialSlide: 1,
    speed: 400,
     slidesPerView: 3,
     spaceBetween: 20
   };

   allServices = [];
   taitoBlog = [];
   inspirationBlog = [];

  constructor(private router: Router, private data: DataShareService, private api: APIService, private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllBlogs();
    this.getAllServices();
  }

  swipeNext(){
    this.slides.slideNext();
  }
  swipeNextInspiration(){
    this.inspirationSlide.slideNext();
  }


  changeTab(url) {
    console.log('I clicked here');
    this.data.getServiceUrl.next(false);
    this.router.navigateByUrl('/tabs/tab2?url=' + url).then(() => {
      this.data.getServiceUrl.next(true);
    });
  }

  getAllServices() {
    this.api.getServices().subscribe( data => {
      console.log('Services', data);
      data.forEach(el => {
        el.image.url =  AppConstants.BASE_URL + el.image.url;
      });
      this.allServices = data;
      this.change.detectChanges();
    }, error => {
      console.log('An error occurred while getting services', error);
    });
  }

  getAllBlogs() {
    this.api.getAllBlogs().subscribe(data => {
      data.forEach(el => {
        el.image.url =  AppConstants.BASE_URL + el.image.url;
        if (el.type === '1') {
          if (this.taitoBlog.length < 3) {
            this.taitoBlog.push(el);
          }
        } else {
          this.inspirationBlog.push(el);
        }
      });
      console.log('Blogs', this.inspirationBlog);
      this.change.detectChanges();
    }, error => {
      console.log('An error occurred while getting blogs', error);
    });
  }
}
