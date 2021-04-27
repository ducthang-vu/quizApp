import { IGetQuestionsParams } from './i-get-questions-params';
import { Observable } from 'rxjs';
import { Question } from './question';

export interface IQuestionsService {
    getQuestions: (params: IGetQuestionsParams) => Observable<Question[]>
}
