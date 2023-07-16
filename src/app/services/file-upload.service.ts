import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = 'http://httpbin.org/post';
  
  constructor(private httpClient: HttpClient) { }

  upload(selectedFile: File): Observable<any>{
    const formData = new FormData();

    formData.append('file', selectedFile, selectedFile.name);

    return this.httpClient.post(this.baseUrl, formData);
  }
}
