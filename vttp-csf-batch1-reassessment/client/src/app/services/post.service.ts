import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom, lastValueFrom, Subject } from 'rxjs';
import { Post } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService{
  onPostCreated : Subject<Post> = new Subject<Post>()

  SERVER_ENDPOINT = 'https://stale-move-production.up.railway.app'

  constructor(private http: HttpClient) {

  }

  createPosting(form: FormGroup) : Promise<any>{
    // construct form data
    const formData = new FormData()
    formData.set("name", form.get("name")?.value)
    formData.set("email", form.get("email")?.value)
    formData.set("phone", form.get("phone")?.value)
    formData.set("title", form.get("title")?.value)
    formData.set("description", form.get("description")?.value)
    formData.set("image", form.get("image")?.value)

    // Make POST request to server
    return firstValueFrom(this.http.post(`${this.SERVER_ENDPOINT}/api/post`, formData));

  }

  populatePostListing(post: Post) {
    this.onPostCreated.next(post)
  }

  // "postingid": "5935201b",
  // "postingDate": "Wed Feb 22 08:30:16 UTC 2023",
  // "name": "fred",
  // "email": "fred@gmail.com",
  // "phone": "8765432",
  // "title": "This is a post title",
  // "description": "Post coments yayyy",
  // "image": "https://blappy.sgp1.digitaloceanspaces.com/myobjects/afa4112d"

  confirmPosting(postListing : Post) {
    return lastValueFrom(this.http.put(`${this.SERVER_ENDPOINT}/api/posting/${postListing.postingid}`, postListing))
  }

}
