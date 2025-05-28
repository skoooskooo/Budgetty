import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show_Error(message: string): void {
    this.toastr.show(message, 'Error', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      toastClass: 'custom-error-toast'
    });
  }

  show_Success(message: string): void {
    this.toastr.show(message, '', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      toastClass: 'custom-success-toast'
    });
  }

  constructor(public toastr: ToastrService) { }

}
