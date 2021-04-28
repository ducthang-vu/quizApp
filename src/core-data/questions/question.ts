import { GameDifficulty } from '../game-difficulty';
import { GameType } from '../game-type';

export interface Question {
    category: string;
    type: GameType;
    difficulty: GameDifficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
