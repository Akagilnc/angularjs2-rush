import {Component, ElementRef, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'video-cmp',
  template: `
  <video [width]="width" [height]="height">
    <source [src]="sourceUrl"></source>
  </video>
  `
})
export class VideoComponent implements OnChanges {
  @Input('source') source:string;
  @Input() width:number = 320;
  @Input() height:number = 240;
  @Input() delay:number = 0;

  private sourceUrl: string;

  private videoElem:any;
  private sourceElem:any;

  constructor(private elementRef: ElementRef) {
    this.videoElem = this.elementRef.nativeElement.querySelector('video');
    this.sourceElem = this.elementRef.nativeElement.querySelector('source');
  }

  ngOnChanges() {
    if (this.source) {
      setTimeout(() => {
        this.sourceUrl = this.source;
        this.videoElem.load();
        this.videoElem.play();
      }, this.delay);
    }
  }
}