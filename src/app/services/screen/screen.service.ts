import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable()
export class ScreenService {
  private resizeSourse = new Subject<null>();
  public resize$ = this.resizeSourse.asObservable();

  screenWidth: number;
  screenHeight: number;
  smallscreen = 780;
  largescreen = 1024;

  constructor() {
    try {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        window.addEventListener('resize', (event) => this.onResize(event));

    }catch (e) {
      console.log(e);
    }// catch

  }// constructor
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.resizeSourse.next();
  }// onResize

  isSmall(): boolean {
    return this.screenWidth < this.smallscreen;
  }
}
