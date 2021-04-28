import { IGetQuestionsParams } from './questions/i-get-questions-params';
import { Observable } from 'rxjs';
import { Question } from './questions/question';

export interface IQuestionsService {
    getQuestions: (params: IGetQuestionsParams) => Observable<Question[]>
}
