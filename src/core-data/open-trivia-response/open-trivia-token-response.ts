import { OpenTriviaBaseResponse } from './open-trivia-base-response';

export interface OpenTriviaTokenResponse extends OpenTriviaBaseResponse {
    response_message: string;
    token: string;
}
