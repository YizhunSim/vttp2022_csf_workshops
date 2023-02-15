import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GameService } from '../game.service';
import { Game } from '../models';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{

  games : Game[] = []
  limitOptions : number[] = [5,10,15,20]
  currentLimit : number = 10
  currentOffset : number = 0

  constructor(private fb: FormBuilder, private gameSvc: GameService){

  }
  ngOnInit(): void {
    this.gameSvc.getGames(this.currentLimit, this.currentOffset)
    .then(result => {
      this.games = result
      console.info(">>> games: ", this.games)
    })
    .catch(error => {
      console.error(">>> error: ", error)
    })
  }

  onLimitChange(newLimit : MatSelectChange) : void{
    this.currentLimit = newLimit.value
    console.info(">>> currentLimit: ", this.currentLimit)

   this.ngOnInit()
  }

  onChangePage(changeBy: number){
    // changeBy = -1 if prev page || 1 if next page
    // current page: 2, limit: 10, offset: 10 (rows 11-20)
    // prev page: 1, limit: 10, offset: 10 + (10 * -1) = 0
    // next page: 3, limit: 10, offset: 10 + (10 * 1) = 20
    this.currentOffset = this.currentOffset + (this.currentLimit * changeBy)

    this.ngOnInit()
  }

  onPrevPage(){
    // set new offset
    // current page: 2, limit: 10, offset: 10 (rows 11-20)
    // prev page: 1, limit: 10, offset: 0 (rows 1 - 10)
    this.currentOffset = this.currentOffset - this.currentLimit

    this.ngOnInit()
  }
  onNextPage(){
    // set new offset
    // current page: 2, limit: 10, offset: 10 (rows 11-20)
    // next page: 3, limit: 10, offset: 20 (rows 21 - 30)
    this.currentOffset = this.currentOffset + this.currentLimit

    this.ngOnInit()
  }
}
