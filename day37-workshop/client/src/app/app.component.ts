import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  form !: FormGroup;
  blob !: Blob

  uploadStatus : string = 'Not Uploaded'

  @ViewChild('file') // gets the HTML element directly
  uploadedPicture !: ElementRef

  constructor(private fb: FormBuilder, private postSvc: PostService){

  }

  ngOnInit(): void {
      this.form = this.createForm();
  }

  submitForm(){
    // const formValues = this.form.value
    // console.info('>>> submitForm: ', formValues)

    // extract file image form HTML element directly
    console.info(this.uploadedPicture.nativeElement.files[0])

    const comments = this.form.get('comments')?.value
    const picture = this.uploadedPicture.nativeElement.files[0]

    // Call post service to send POST request
    this.postSvc.createPost(comments, picture)
    .then(res => {
      // this.uploadStatus = res
      console.info(res)
      this.uploadStatus = res.Message
    })
    .catch(error => {
      console.error(error)
    })

  }

  private createForm() : FormGroup{
    return this.fb.group(
      {
        comments: this.fb.control('', [Validators.required]),
        picture: this.fb.control('', [Validators.required]),


      }
    )
  }
}
