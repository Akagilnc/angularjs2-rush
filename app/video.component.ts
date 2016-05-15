import {Component, ElementRef, OnChanges, Input, AfterViewInit} from 'angular2/core';

@Component({
  selector: 'video-cmp',
  template: `
  <video width="{{width}}" height="{{height}}">
    <source src="{{sourceUrl}}">
  </video>
  `
})
export class VideoComponent implements OnChanges, AfterViewInit {
  @Input('source') source:string;
  @Input() width:number = 320;
  @Input() height:number = 240;
  @Input() delay:number = 0;

  private sourceUrl: string;

  private videoElem:any;
  private sourceElem:any;

  constructor(private elementRef: ElementRef) {

  }

  ngOnChanges() {
    this.playVideo();
  }

  playVideo() {
    if (this.source && this.videoElem && this.sourceElem) {
      console.log(this.source);
      setTimeout(() => {
        this.sourceUrl = this.source;

        setTimeout(() => {
          this.videoElem.load();
          this.videoElem.play();
        }, 50);

      }, this.delay);
    }
  }

  ngAfterViewInit() {
    this.videoElem = this.elementRef.nativeElement.querySelector('video');
    this.sourceElem = this.elementRef.nativeElement.querySelector('source');
    this.playVideo();
  }
}