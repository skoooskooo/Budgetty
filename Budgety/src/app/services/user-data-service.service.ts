import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  //PROPERTIES
  APIURL ="http://localhost:8000/";

  example_data: any=[];

  ngOnInit(): void {
    this.example_data = this.get_exampleData();
  }

  get_exampleData(){
    this.http.get(this.APIURL + "get_exampleTable").subscribe((data) => {
      this.example_data = data;
    });
  }

  constructor(private http:HttpClient) { }
}
