import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit, OnDestroy{
  form !: FormGroup
  routeSub$!: Subscription;
  characterId !: number;
  characterName !: string

  constructor(private fb : FormBuilder, private activatedRoute : ActivatedRoute, private characterService : CharacterService){

  }

  ngOnInit(): void {
      // Initialize the form
      this.clearForm();

      // Get characterId from current route
       // get character id from route
      this.routeSub$ = this.activatedRoute.params.subscribe((params) => {
      this.characterId = params['characterId'];

      // set character name based on characterId
      this.setCharacterName();
    });
  }

  ngOnDestroy(): void {
      this.routeSub$.unsubscribe();
  }


  submitForm() : void {
    console.info(this.form.value);
    const comment = this.form.get('comment')?.value

    // posting comment to server
    this.characterService.postComment(this.characterId, comment)
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.error(err)
    })

    this.clearForm()
  }

  clearForm() : void {
    this.form = this.createForm();
  }

  setCharacterName(){
    this.characterService.getCharacterById(this.characterId)
    .then(res => {
      this.characterName = res.name
    })
    .catch(err => {
      console.error(err)
    })
  }


  private createForm() : FormGroup {
    return this.fb.group({
      comment: this.fb.control('', [Validators.required])
    })
  }
}
