declare var window: any;
declare var document: any;
declare var YT: any;
import {Component, ElementRef, OnChanges, Input, AfterViewInit, NgZone} from 'angular2/core';

@Component({
  selector: 'youtube-cmp',
  template: `
  <div id="ytplayer"></div>
  `
})
export class YoutubeComponent implements AfterViewInit, OnChanges {
  @Input('source') source:string = null;
  private player:any;
  private isPlayerReady:boolean;
  constructor(private ngZone: NgZone) {
    this.isPlayerReady = false;
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var self = this;
    window.onYouTubePlayerAPIReady = () => {
      if (self.player) return;
      self.player = new YT.Player('ytplayer', {
        playerVars: {
          rel: 0
        },
        events: {
          onReady: () => {
            self.isPlayerReady = true;
            self.playVideo();
          }
        }
      });
    }
  }

  ngOnChanges() {
    if (typeof(this.player) !='object' || !this.isPlayerReady) {
      return;
    }
    if (!this.source) {
      return this.player.pauseVideo();
    }
    return this.playVideo();
  }

  playVideo() {
    if (typeof(this.player) !='object' || !this.isPlayerReady || !this.source) {
      return;
    }

    this.player.loadVideoById(this.source);
    this.player.playVideo();

  }

  ngAfterViewInit() {
  }
}