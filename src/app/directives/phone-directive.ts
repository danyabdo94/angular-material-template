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
  selector: '[OnlyNumber]'
})
export class OnlyNumber {
  @Input('formData') formData: NgForm;
  @Input() minVal = '';
  @Output() flagerrorPhone = new EventEmitter();
  //this is regex for  egypt Moblie number example 010/011/012/015-11111111
  // regex = /^[0]{1}[1]{1}[1|2|5|0]{1}[0-9]{8}$/g;
  constructor(private el: ElementRef) {
    if (this.el.nativeElement.required) {
      this.el.nativeElement.insertAdjacentHTML(
        'afterend',
        '\n<div class="invalid-feedback">Please Enter valid phone number.</div>'
      );
    }
  }
  @HostListener('input', ['$event.target.value']) onInput(value) {
    // console.log(value);
    const includedRegex = /^[\+]?[(]?[0-9]{3,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
    if (value.length <= this.el.nativeElement.max) {
      if (value === '' || value === null) {
        this.el.nativeElement.classList.remove('is-invalid');
        this.flagerrorPhone.emit(false);
      } else {
        if (includedRegex.test(value)) {
          this.el.nativeElement.classList.remove('is-invalid');
          this.flagerrorPhone.emit(false);
        } else {
          this.flagerrorPhone.emit(true);
          this.el.nativeElement.classList.add('is-invalid');
          this.formData.form.controls[this.el.nativeElement.name].setErrors({
            incorrect: true
          });
        }
      }
    } else {
      // console.log('Too long');
      this.flagerrorPhone.emit(true);
      this.el.nativeElement.classList.add('is-invalid');
      this.formData.form.controls[this.el.nativeElement.name].setErrors({
        incorrect: true
      });
    }
  }

  // @HostListener('input', ['$event.target.value']) onInput(value) {
  //   if (value.length <= this.el.nativeElement.max) {
  //     if (value == '' || value == null) {
  //       this.el.nativeElement.classList.remove('is-invalid');
  //       this.flagerrorPhone.emit(false);
  //     } else if (value != '' || value != null) {
  //       if (this.regex.test(value) == false) {
  //         this.flagerrorPhone.emit(true);
  //         this.el.nativeElement.classList.add('is-invalid');
  //         this.formData.form.controls[this.el.nativeElement.name].setErrors({
  //           incorrect: true
  //         });
  //       }
  //       if (isNaN(value) == true) {
  //         this.flagerrorPhone.emit(true);
  //         this.el.nativeElement.classList.add('is-invalid');
  //         this.formData.form.controls[this.el.nativeElement.name].setErrors({
  //           incorrect: true
  //         });
  //       } else if (value && value.length <= this.el.nativeElement.max) {
  //         // console.log("evenet" , this.regex.test(value)  )
  //         this.el.nativeElement.classList.remove('is-invalid');
  //         this.flagerrorPhone.emit(false);
  //         if (isNaN(value) == false) {
  //           if (value < 0) {
  //             this.flagerrorPhone.emit(true);
  //             this.el.nativeElement.classList.add('is-invalid');
  //             this.formData.form.controls[this.el.nativeElement.name].setErrors(
  //               {
  //                 incorrect: true
  //               }
  //             );
  //           }
  //         } else if (value < this.minVal) {
  //           this.flagerrorPhone.emit(true);
  //           this.el.nativeElement.classList.add('is-invalid');
  //           this.formData.form.controls[this.el.nativeElement.name].setErrors({
  //             incorrect: true
  //           });
  //         } else {
  //           this.el.nativeElement.classList.remove('is-invalid');
  //           this.flagerrorPhone.emit(false);
  //         }
  //       }
  //     }
  //   } else {
  //     this.flagerrorPhone.emit(true);
  //     this.el.nativeElement.classList.add('is-invalid');
  //     this.formData.form.controls[this.el.nativeElement.name].setErrors({
  //       incorrect: true
  //     });
  //   }
  // }
}
