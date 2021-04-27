import { ActionsObservable, Epic } from 'redux-observable';
import { AnyAction } from '@reduxjs/toolkit';
import { fromQuestionsActions } from './questions.slice';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EpicDependencies } from '../epic';

export type MyEpic = Epic<AnyAction, AnyAction, any>;

export const questionsEpic: MyEpic =
    (action$: ActionsObservable<any>, _, { questionsService }: EpicDependencies) =>
        action$.pipe(
            filter(fromQuestionsActions.loadQuestions.match),
            mergeMap(action => questionsService.getQuestions(action.payload)),
            map(fromQuestionsActions.loadQuestionDone),
            catchError(() => of(fromQuestionsActions.loadQuestionError()))
        );
