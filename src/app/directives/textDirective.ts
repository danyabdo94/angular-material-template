import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[textDirective]'
})
export class textDirective {
  @Input('formData') formData: NgForm;
  @Output() flagOfError = new EventEmitter();
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
    if (this.el.nativeElement.required) {
      this.el.nativeElement.insertAdjacentHTML(
        'afterend',
        '\n<div class="invalid-feedback"> Please Enter valid format</div>'
      );
    }
  }

  @HostListener('input', ['$event.target.value']) onInput(value) {
    const excludedRegex = /[,.?\|/`'"~!@#$%^&*()+={}[\];.,*\-]/g;
    if (value.length <= this.el.nativeElement.max) {
      if (value == '' || value == null) {
        this.el.nativeElement.classList.remove('is-invalid');
        this.flagOfError.emit(false);
      } else {
        if (excludedRegex.test(value)) {
          this.flagOfError.emit(true);
          this.el.nativeElement.classList.add('is-invalid');
          this.formData.form.controls[this.el.nativeElement.name].setErrors({
            incorrect: true
          });
        } else {
          this.flagOfError.emit(false);
          this.el.nativeElement.classList.remove('is-invalid');
        }
      }
    } else {
      this.flagOfError.emit(true);
      this.el.nativeElement.classList.add('is-invalid');
      this.formData.form.controls[this.el.nativeElement.name].setErrors({
        incorrect: true
      });
    }
  }
}
