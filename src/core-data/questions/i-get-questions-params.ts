import { NumberQuestions } from './number-questions';
import { GameDifficulty } from '../game-difficulty';
import { GameType } from '../game-type';

export interface IGetQuestionsParams {
    amount: NumberQuestions;
    difficulty?: GameDifficulty;
    type?: GameType;
}
