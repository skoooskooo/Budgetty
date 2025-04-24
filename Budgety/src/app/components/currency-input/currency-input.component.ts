import { Component ,signal} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent {
  //#region PROPERTIES
  currencyString = signal<string>("");
  //#endregion

  //METHODS 
  //#region METHODS
  Click_Ok(): void 
  { 
    this.TestBudgetString();
  }

  //YOU HAVE TO CREATEA A TOASTER SERVICE IN THE APP MODULE
  //AND IMPORT IT HERE TO USE IT AND ANYWHERE ELSE IN THE PROGRAM
  showError(message: string): void {
    this.toastr.error(message,'Error', 
      {
        positionClass: 'toast-top-right',
        timeOut: 3000, 
        easeTime:300,
        toastClass: 'custom-toast'
      });
  }

  TestBudgetString()
  {
    var regExp = /[a-zA-Z]/g;
            
    if(regExp.test(this.currencyString()))
    {
      this.showError("Please enter a valid currency value.");
      return;
    } 

    let currencyValue = parseFloat(this.currencyString());

    if (isNaN(currencyValue)) 
    {
      this.showError("Invalid currency value:");
      return;
    }

    //String is OK , Add to Database

  }


 //#endregion
  
 //EVENT HANDLERS 
 //#region EVENT HANDLERS
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.currencyString.set(inputElement.value); // Update the signal with the input value
  }
  //#endregion

  //CONSTRUCTOR
  constructor (public toastr: ToastrService) { }
}
