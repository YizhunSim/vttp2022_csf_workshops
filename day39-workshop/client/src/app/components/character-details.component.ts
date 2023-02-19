import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarvelCharacter } from '../models/CharacterModel';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  characterId!: number;
  routeSub$!: Subscription;
  character!: MarvelCharacter;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    // get character id from route
    this.routeSub$ = this.activatedRoute.params.subscribe((params) => {
      this.characterId = params['characterId'];
    });

    // retrieve character detail from server
    this.getCharacterById();
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  getCharacterById() : void {
    // retrieve character detail from server
    this.characterService
      .getCharacterById(this.characterId)
      .then((res) => {
        this.character = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
