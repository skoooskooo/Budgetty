import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  
  constructor(private http:HttpClient) { }
}
