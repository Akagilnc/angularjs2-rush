import {Component,
        Input,
        Output,
        EventEmitter,
        ElementRef,
        ViewChild,
        AfterViewInit} from 'angular2/core';

@Component({
  selector: 'modal',
  template: `
    <div class="modal" tabindex="-1" role="dialog"
      (keydown.esc)="closeOnEscape ? close() : 0"
      [ngClass]="{ in: isOpened, fade: isOpened }"
      [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
      (click)="closeOnOutsideClick ? close() : 0">
      <div [class]="'modal-dialog ' + modalClass">
        <div class="modal-content" tabindex="0" *ngIf="isOpened">
          <div class="modal-header">
            <h4 class="modal-title" *ngIf="title">{{ title }}</h4>
            <ng-content select="modal-header"></ng-content>
          </div>
          <div class="modal-body">
            <ng-content select="modal-content"></ng-content>
          </div>
          <div class="modal-footer">
            <ng-content select="modal-footer"></ng-content>
            <button *ngIf="cancelButtonLabel" type="button" class="btn btn-default" (click)="close()">{{ cancelButtonLabel }}</button>
            <button *ngIf="submitButtonLabel" type="button" class="btn btn-primary" (click)="onSubmit.emit(undefined)">{{ submitButtonLabel }}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() modalClass: string;
  @Input() closeOnEscapse: boolean;
  @Input() closeOnClickOutside: boolean;
  @Input() title: string;
  @Input() hideCloseButton: boolean;
  @Input() closeOnEscape: boolean;
  @Input() closeOnOutsideClick: boolean;
  @Input() cancelButtonLabel: string;
  @Input() submitButtonLabel: string;
  @Output() onOpen = new EventEmitter(false);
  @Output() onClose = new EventEmitter(false);
  @Output() onSubmit = new EventEmitter(false);

  private modalRoot: HTMLElement;
  private isOpened = false;
  private backdropElement: HTMLElement;

  constructor(private elementRef: ElementRef) {

  }

  private createBackdrop() {
    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add('modal-backdrop', 'fade', 'in', 'hide');
    document.body.appendChild(this.backdropElement);
  }

  open(...args: any[]) {
    if (!this.modalRoot) return false;

    this.isOpened = true;
    this.onOpen.emit(args);
    this.backdropElement.classList.remove('hide');
    setTimeout(() => this.modalRoot.focus(), 0);
  }

  close(...args: any[]) {
    if (!this.modalRoot) return false;

    this.isOpened = false;
    this.onClose.emit(args);
    this.backdropElement.classList.add('hide')
  }

  ngAfterViewInit() {
    this.modalRoot = this.elementRef.nativeElement.querySelector('.modal');
    this.createBackdrop();
  }

}