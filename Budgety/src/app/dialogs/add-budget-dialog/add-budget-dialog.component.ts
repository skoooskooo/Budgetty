import { Component, signal,ViewChild } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { FixedExpensesComponent } from '../../components/fixed-expenses/fixed-expenses.component';

@Component({
    selector: 'app-add-budget-dialog',
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        CurrencyInputComponent,
        FixedExpensesComponent
    ],
    templateUrl: './add-budget-dialog.component.html',
    styleUrl: './add-budget-dialog.component.css'
})
export class AddBudgetDialogComponent {

    @ViewChild(CurrencyInputComponent) currencyInput!: CurrencyInputComponent;
    Click_Ok(): void 
    {
        
    }


    
}
