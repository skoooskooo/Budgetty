import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyBudget } from '../../models/monthly-budget.model';
import { Expense } from '../../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  //PROPERTIES
  APIURL ="http://localhost:8000/";

  example_data: any=[];

  ngOnInit(): void {
  }


  public getMonthlyBudget(id: number) : Observable<any> {  
    const params = new HttpParams().set('id',id.toString());
    const value = this.http.get(`${this.APIURL}get_MonthlyBudget`, { params });
    console.log(value);
    return value;
  }

  insertMonthlyBudget(budget: MonthlyBudget): Observable<any> {
    return this.http.post(`${this.APIURL}insert_MonthlyBudget`, budget);
  }


  public insert_Fixed_Expenses(expenses: Expense[]): Observable<any> {
    return this.http.post(`${this.APIURL}insert_FixedExpenses`, expenses);
  }

  constructor(private http:HttpClient) { }
}
