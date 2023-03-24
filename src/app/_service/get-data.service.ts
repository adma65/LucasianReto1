import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCharacterResults } from '../model/AllCharactersResult';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private baseUrl: String = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters() : Observable<AllCharacterResults>{
    console.log(`call: ${this.baseUrl}`);
    return this.http.get(`${this.baseUrl}`)
  }

  getNewPage(page: number) : Observable<AllCharacterResults>{
    console.log(`call: ${this.baseUrl}/?page=${page}`);
    return this.http.get(`${this.baseUrl}/?page=${page}`)
  }

}
