import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  

  constructor(private httpClient:HttpClient) {}
  host = 'http://localhost:8000'

  private url = this.host+'/login/';

    create(url,post){
      return this.httpClient.post<any>(url,post);
    }
}