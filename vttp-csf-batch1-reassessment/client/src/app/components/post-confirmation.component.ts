import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-confirmation',
  templateUrl: './post-confirmation.component.html',
  styleUrls: ['./post-confirmation.component.css']
})
export class PostConfirmationComponent {
  postingId !: string

  constructor(private activatedRoute : ActivatedRoute, private router: Router){
    this.postingId = this.activatedRoute.snapshot.params['postingId'];
  }

  backToHome() : void{
    this.router.navigate([''])
  }
}
