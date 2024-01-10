import { Injectable } from '@angular/core';
import { PhotoType } from './PhotoType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private apiUrl = 'http://localhost:3000/photos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<PhotoType[]> {
    return this.http.get<PhotoType[]>(this.apiUrl);
  }

  getPhoto(id: string): Observable<PhotoType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PhotoType>(url);
  }

  addPhoto(photo: PhotoType): Observable<PhotoType> {
    return this.http.post<PhotoType>(this.apiUrl, photo, this.httpOptions);
  }

  editPhoto(photo: PhotoType, id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, photo, this.httpOptions);
  }

  deletePhoto(id: string): Observable<PhotoType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<PhotoType>(url, this.httpOptions);
  }
}
