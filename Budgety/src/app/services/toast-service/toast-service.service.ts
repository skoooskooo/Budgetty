import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {


  showError(message: string): void {
    this.toastr.show(message, 'Error', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      toastClass: 'custom-error-toast'
    });
  }

  constructor(public toastr: ToastrService) { }
}
