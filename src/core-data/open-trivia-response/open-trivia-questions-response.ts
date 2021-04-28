import { Question } from '../questions/question';
import { OpenTriviaBaseResponse } from './open-trivia-base-response';

export interface OpenTriviaQuestionsResponse extends OpenTriviaBaseResponse {
    results: Question[];
}
