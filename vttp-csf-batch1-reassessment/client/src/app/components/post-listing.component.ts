import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css'],
})
export class PostListingComponent implements OnInit, OnDestroy {
  post!: Post;

  postSub$!: Subscription;

  constructor(private router: Router, private postSvc: PostService) {
    this.postSub$ = this.postSvc.onPostCreated.subscribe(result => {
      this.post = result;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.postSub$.unsubscribe();
  }

  cancelForm() {
    this.router.navigate(['create-listing']);
  }

  submitForm() {
    console.info(`>>> post-listing.component.ts: submitForm()`, this.post);
    this.postSvc.confirmPosting(this.post)
    .then(res => {
      console.log(res)
      this.router.navigate(['post-confirmation', this.post.postingid]);
    }).catch(err => {
      console.error(err)
      alert(err.message)
    })

  }
}
