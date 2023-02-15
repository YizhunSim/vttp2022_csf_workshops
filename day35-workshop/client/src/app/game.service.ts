import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Subject, take } from 'rxjs';
import { Game } from './models';

const BACKEND = 'http://localhost:8080';

@Injectable()
export class GameService {
  onSearchResults = new Subject<Game[]>();

  constructor(private httpClient: HttpClient) {}

  getGames(limit: number, offset: number): Promise<Game[]> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);

    return firstValueFrom<Game[]>(
      this.httpClient.get<any>(`${BACKEND}/api/games`, { params }).pipe(
        // take(1),
        map((v) => {
          const games: any[] = v.games;
          console.info(">>> Game Service: ", games)
          return games.map((g) => {
            return {
              id: g.gameId,
              name: g.name,
              year: g.year,
              ranking: g.ranking,
              usersRated: g.users_rated,
            } as Game;
          });
        })
      )
    );
  }
}
