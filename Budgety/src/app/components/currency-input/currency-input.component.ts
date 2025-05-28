import { Component ,signal, ViewChild} from '@angular/core';



@Component({
  selector: 'currency-input',
  standalone: true,
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})

export class CurrencyInputComponent {


  // PROPERTIES
  currencyInputString = signal<string>("");
  
  // METHODS
  getCurrencyInputString(): string {
    return this.currencyInputString();
  }

 // EVENT HANDLERS 
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.currencyInputString.set(inputElement.value); // Update the signal with the input value
  }


  //CONSTRUCTOR
  constructor () { }
}
