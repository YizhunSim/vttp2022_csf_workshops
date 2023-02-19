import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarvelCharacter } from '../models/CharacterModel';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  nameStartsWith!: string; // retrieve from query parameters of current route
  routeSub$!: Subscription;
  currentLimit: number = 10;
  currentOffset: number = 0;
  characters: MarvelCharacter[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    //  subscribe to changes in current route
    this.routeSub$ = this.activatedRoute.queryParams.subscribe((params) => {
      this.nameStartsWith = params['nameStartsWith'];
    });

    this.getCharacters();
  }

  getCharacters() {
    // get list of characters starting with nameStartsWith
    this.characterService
      .getCharacters(this.nameStartsWith, this.currentLimit, this.currentOffset)
      .then((res) => {
        this.characters = res;
      })
      .catch(err => {
        console.error(err);
      })
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  onChangePage(changeBy: number): void {
    // change offset and make new request to server
    this.currentOffset = this.currentOffset + this.currentLimit * changeBy;
    this.characterService.getCharacters(
      this.nameStartsWith,
      this.currentLimit,
      this.currentOffset
    );

    this.getCharacters();
  }
}
