import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/observable"
import {map, catchError  }  from "rxjs/operators"

import { Subject } from "rxjs"

/*
  Generated class for the groceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class groceriesServiceProvider {
  items = [];
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseUrl = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log("Hello groceriesServiceProvider Provider");
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  getItems(): Observable<object[]> {
    return this.http.get(this.baseUrl + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }
  private extractData(res: Response){
    let body = res;
    return body || {}
  }
  private handleError(error: Response | any){
    return Observable.throw(error.status)
   }
  removeItem(index) {
    this.items.splice(index, 1);
  }
  addItem(item){
    this.items.push(item)
  }
  showItemPrompt(item){
    this.items.push(item)

  }
  editItemPrompt(item, index){
    this.items[index] = item

  }
}
