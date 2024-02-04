import Axios from 'axios-observable';
import { of } from 'rxjs';
import { OpenTriviaQuestionsResponse } from '../core-data/open-trivia-response/open-trivia-questions-response';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { QuestionsService } from '../services/questions.service';
import { NumberQuestions } from '../core-data/questions/number-questions';
import { GameDifficulty } from '../core-data/game-difficulty';
import { GameType } from '../core-data/game-type';
import { IGetQuestionsParams } from '../core-data/questions/i-get-questions-params';
import { AxiosFactory } from '../core-data/axios-factory';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';


const mockResponse: OpenTriviaQuestionsResponse = {
    response_code: 1,
    results: [
        {
            category: "General Knowledge",
            type: "multiple" as GameType,
            difficulty: "medium" as GameDifficulty,
            question: "This field is sometimes known as &ldquo;The Dismal Science.&rdquo;",
            correct_answer: "Economics",
            incorrect_answers: [
                "Philosophy",
                "Politics",
                "Physics"
            ]
        },
        {
            category: "Science: Computers",
            type: "boolean" as GameType,
            difficulty: "medium" as GameDifficulty,
            question: "The first computer bug was formed by faulty wires.",
            correct_answer: "False",
            incorrect_answers: [
                "True"
            ]
        }
    ]
};

describe('questionsService', () => {
    it('factory method', () => {
        expect(QuestionsService.getInstance()).toBeInstanceOf(QuestionsService);
    });

    const fakeAxiosFactory: AxiosFactory = () => ({
        get: (url: string, config?: AxiosRequestConfig): AxiosObservable<any> => of({ data: mockResponse } as AxiosResponse)
    } as Axios);
    const service = QuestionsService.getInstance(fakeAxiosFactory);

    it('getQuestions', async () => {
        const params: IGetQuestionsParams = {
            amount: NumberQuestions.TEEN,
            difficulty: GameDifficulty.ANY,
            type: GameType.BOTH
        };
        const result = await service.getQuestions(params).toPromise();
        expect(result).toEqual(mockResponse.results);
    });
});
