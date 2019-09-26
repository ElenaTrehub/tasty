import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ScreenService} from '../../services/screen/screen.service';

@Directive({
  selector: '[appSmallScreen]'
})
export class SmallScreenDirective implements OnInit{

  hasView = false;
  constructor(private screenService: ScreenService,
              private template: TemplateRef<object>,
              private viewContainer: ViewContainerRef
  ) {
    this.screenService.resize$.subscribe(() => this.onResize());
  }

  onResize() {
    this.scrennLarge = false;
  }
  ngOnInit() {
    this.onResize();
  }
  @Input()
  set scrennLarge(condition){
    condition = this.screenService.screenWidth < this.screenService.smallscreen;
    if (condition && !this.hasView){
      this.hasView = true;
      this.viewContainer.createEmbeddedView(this.template);
    } else if(!condition && this.hasView){
      this.hasView = false;
      this.viewContainer.clear();
    }

  }

}
