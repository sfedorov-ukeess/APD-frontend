import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  previousFocusedElement: any = null;
  @ViewChild('modalRef') modal: any;

  @Input("isOpen") isOpen: boolean = false;
  @Output("modalCloseRequest") modalCloseRequest= new EventEmitter<any>();
  ngAfterViewInit() {
    if(this.isOpen) {
      this.previousFocusedElement = window.document.activeElement;
      this.modal.nativeElement.querySelector("[autofocus]")?.focus();
    }
  }
  ngOnDestroy() {
    if(this.previousFocusedElement){
      this.previousFocusedElement.focus();
      delete this.previousFocusedElement;
    }
  }
  outClickHandler() {
    this.modalCloseRequest.emit();
  }
}
