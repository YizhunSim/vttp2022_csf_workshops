import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
})
export class CreateListingComponent {
  form!: FormGroup;

  @ViewChild('file') // gets the HTML element directly
  uploadedPicture!: ElementRef;

  constructor(private fb: FormBuilder, private postSvc: PostService, private router: Router) {}

  createForm() {
    return this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('',),
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      image: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  submitForm() {
    console.log(this.form.value);
    // console.log(this.uploadedPicture)
    this.postSvc.createPosting(this.form)
    .then(res => {
      console.log(res)
      // {
      //   "postingid":"33d61ea1",
      //   "postingDate":"Wed Feb 22 18:16:54 SGT 2023",
      //   "name":"fred",
      //   "email":"fred@gmail.com",
      //   "phone":"8765432",
      //   "title":"Post title 1",
      //   "description":"post description 1",
      //   "image":"https://blappy.sgp1.digitaloceanspaces.com/myobjects/b08e00d1"
      // }
      const post = res as Post
      this.postSvc.populatePostListing(post)
    })
    .catch(err => {
      console.error(err)
    })

    this.router.navigate(['post-listing', ])

  }

  clearForm() {
    this.form.reset();
  }
}
