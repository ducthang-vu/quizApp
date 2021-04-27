import Axios from 'axios-observable';
import { mocked } from 'ts-jest/utils';
import { Observable, of } from 'rxjs';
import { OpenTriviaQuestionsResponse } from '../core-data/open-trivia-questions-response';
import { AxiosRequestConfig } from 'axios';
import { QuestionsService } from '../services/questions.service';
import { NumberQuestions } from '../core-data/number-questions';
import { GameDifficulty } from '../core-data/game-difficulty';
import { GameType } from '../core-data/game-type';
import { IGetQuestionsParams } from '../core-data/i-get-questions-params';


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

jest.doMock('axios-observable', () => ({
    Axios: jest.fn().mockImplementation(() => ({
        get: (url: string, config?: AxiosRequestConfig): Observable<OpenTriviaQuestionsResponse> => of(mockResponse)
    }))
}));


describe('questionsService', () => {

    it('getInstance should return instance of class with instance of axios', () => {
        const spy = jest.spyOn(Axios, 'create');
        const service = QuestionsService.getInstance();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            baseURL: 'https://opentdb.com/api.php'
        });
    });

    const service = QuestionsService.getInstance();

    it('getQuestions', async () => {
        const MockAxios = mocked(Axios, true);
        const params: IGetQuestionsParams = {
            amount: NumberQuestions.TEEN,
            difficulty: GameDifficulty.ANY,
            type: GameType.BOTH
        };
        const result = await service.getQuestions(params).toPromise();
        console.log(result)
        expect(result).toEqual(mockResponse.results);
        expect(MockAxios.get).toHaveBeenCalledTimes(1);
        expect(MockAxios.get).toHaveBeenCalledWith('', { params });
    });
});
