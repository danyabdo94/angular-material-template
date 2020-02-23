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
  selector: '[idDirective]'
})
export class idDirective {
  @Input('formData') formData: NgForm;
  @Input() minVal: any;
  @Input() numOfDecimalsAfterPoint: number;
  @Input() percentage: boolean;
  @Output() flagOfErr = new EventEmitter();
  flagback = false;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
    if (this.el.nativeElement.required) {
      this.el.nativeElement.insertAdjacentHTML(
        'afterend',
        '\n<div class="invalid-feedback"> Please Enter valid number. </div>'
      );
    }
  }

  @HostListener('input', ['$event.target.value']) onInput(value) {
    let regex = /^[0-9]+$/g;
    if (value.length <= this.el.nativeElement.max) {
      if (value == '' || value == null) {
        this.el.nativeElement.classList.remove('is-invalid');
        this.flagOfErr.emit(false);
      } else {
        if (regex.test(value) == false) {
          this.flagOfErr.emit(true);
          this.el.nativeElement.classList.add('is-invalid');
          this.formData.form.controls[this.el.nativeElement.name].setErrors({
            incorrect: true
          });
        } else {
          this.el.nativeElement.classList.remove('is-invalid');
          this.flagOfErr.emit(false);
        }
        if (isNaN(value) == true) {
          this.flagOfErr.emit(true);
          this.el.nativeElement.classList.add('is-invalid');
          this.formData.form.controls[this.el.nativeElement.name].setErrors({
            incorrect: true
          });
        } else if (value && value.length <= this.el.nativeElement.max) {
          // console.log("evenet" , this.regex.test(value)  )
          this.el.nativeElement.classList.remove('is-invalid');
          this.flagOfErr.emit(false);
          if (isNaN(value) == false) {
            // NEGATIVE NUMBER
            if (value < 0) {
              this.flagOfErr.emit(true);
              this.el.nativeElement.classList.add('is-invalid');
              this.formData.form.controls[this.el.nativeElement.name].setErrors(
                {
                  incorrect: true
                }
              );
            }
          } else if (value < this.minVal) {
            this.flagOfErr.emit(true);
            this.el.nativeElement.classList.add('is-invalid');
            this.formData.form.controls[this.el.nativeElement.name].setErrors({
              incorrect: true
            });
          } else {
            this.el.nativeElement.classList.remove('is-invalid');
            this.flagOfErr.emit(false);
          }
        }
        // MINA VALIDATION
        // Check for numbers after decimal point
        if (this.numOfDecimalsAfterPoint) {
          let strValue = <string>value;
          if (strValue.includes('.')) {
            let strAfterDecimal = strValue.substr(strValue.indexOf('.') + 1);
            if (strAfterDecimal.length > this.numOfDecimalsAfterPoint) {
              this.flagOfErr.emit(true);
              this.el.nativeElement.classList.add('is-invalid');
              this.formData.form.controls[this.el.nativeElement.name].setErrors(
                {
                  incorrect: true
                }
              );
            }
          }
        }
        // Check For Percentage Input
        if (this.percentage) {
          let numberValue = Number(value);
          if (numberValue > 100) {
            this.flagOfErr.emit(true);
            this.el.nativeElement.classList.add('is-invalid');
            this.formData.form.controls[this.el.nativeElement.name].setErrors({
              incorrect: true
            });
          }
          // else {
          //   this.el.nativeElement.classList.remove('is-invalid');
          //   this.flagOfErr.emit(false);
          // }
        }
      }
    } else {
      this.flagOfErr.emit(true);
      this.el.nativeElement.classList.add('is-invalid');
      this.formData.form.controls[this.el.nativeElement.name].setErrors({
        incorrect: true
      });
    }
  }
}
