import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(comments: string, picture: File) : Promise<any>{
    // construct form data
    const formData = new FormData()
    formData.set("comments", comments)
    formData.set("picture", picture)

    // Make POST request to server
    return firstValueFrom(this.http.post('/api/post', formData));

  }
}
