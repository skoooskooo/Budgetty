import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyBudget } from '../../models/monthly-budget.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  //PROPERTIES
  APIURL ="http://localhost:8000/";

  example_data: any=[];

  ngOnInit(): void {
  }


  getMonthlyBudget(id: number) : Observable<any> {  
    const params = new HttpParams().set('id',id.toString());
    const value = this.http.get(`${this.APIURL}get_MonthlyBudget`, { params });
    console.log(value);
    return value;
  }

  insertMonthlyBudget(budget:MonthlyBudget ) : Observable<any> 
  {
    let params = new HttpParams();
    
    params = params.append('date_month', budget.date_month);
    params = params.append('monthly_budget_value', budget.monthly_budget_value.toFixed(4));
    params = params.append('initial_monthly_budget', budget.initial_monthly_budget.toFixed(4));
    params = params.append('week_1', budget.week_1.toFixed(4));
    params = params.append('week_2', budget.week_2.toFixed(4));
    params = params.append('week_3', budget.week_3.toFixed(4));
    params = params.append('week_4', budget.week_4.toFixed(4));
    params = params.append('week_5', budget.week_5.toFixed(4));

    return this.http.post(`${this.APIURL}insert_MonthlyBudget_Value`, {}, { params });
  }

  
  constructor(private http:HttpClient) { }
}
