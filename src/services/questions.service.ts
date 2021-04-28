import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { OpenTriviaQuestionsResponse } from '../core-data/open-trivia-response/open-trivia-questions-response';
import { IGetQuestionsParams } from '../core-data/questions/i-get-questions-params';
import { GameType } from '../core-data/game-type';
import { GameDifficulty } from '../core-data/game-difficulty';
import { IQuestionsService } from '../core-data/i-questions-service';
import { Observable } from 'rxjs';
import { Question } from '../core-data/questions/question';
import { axiosFactory } from './axios-factory';
import { AxiosFactory } from '../core-data/axios-factory';


export class QuestionsService implements IQuestionsService {
    static getInstance(factory: AxiosFactory = axiosFactory): QuestionsService  {
        const http = factory();
        return new QuestionsService(http)
    }

    constructor(private http: Axios) {}

    getQuestions(params: IGetQuestionsParams): Observable<Question[]> {
        if (params.type === GameType.BOTH) {
            delete params.type;
        }
        if (params.difficulty === GameDifficulty.ANY) {
            delete params.difficulty
        }
        return this.http.get<OpenTriviaQuestionsResponse>('', { params }).pipe(
            map(res => res.data.results)
        )
    }

}
