import { Question } from './question';
import { OpenTriviaBaseResponse } from './open-trivia-base-response';

export interface OpenTriviaQuestionsResponse extends OpenTriviaBaseResponse {
    results: Question[];
}
