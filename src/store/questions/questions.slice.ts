import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../core-data/questions/question';
import { IGetQuestionsParams } from '../../core-data/questions/i-get-questions-params';

interface QuestionsSlice {
    entities: Question[];
    loading: boolean;
    error: boolean;
}

const initialState: QuestionsSlice = {
    entities: [],
    loading: false,
    error: false
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        loadQuestions: (state, action: PayloadAction<IGetQuestionsParams>) => {
            state.entities = [];
            state.loading = true;
        },
        loadQuestionDone: (state, action: PayloadAction<Question[]>) => {
            state.loading = false;
            state.entities = action.payload
        },
        loadQuestionError: (state) => {
            state.loading = false;
            state.error = true;
        },
    },
});


export const fromQuestionsActions =  questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;
