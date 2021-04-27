import { IQuestionsService } from '../core-data/i-questions-service';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { AnyAction } from '@reduxjs/toolkit';
import { QuestionsService } from '../services/questions.service';
import { questionsEpic } from './questions/questions.epic';


export interface EpicDependencies {
    questionsService: IQuestionsService
}

export const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, EpicDependencies>({
    dependencies: {
        questionsService: QuestionsService.getInstance()
    }
});

export const rootEpic = combineEpics(
    questionsEpic,
);
