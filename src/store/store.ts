import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { questionsReducer } from './questions/questions.slice';
import { gameReducer } from './game/game.slice';
import { epicMiddleware, rootEpic } from './epic';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const store = configureStore({
    reducer: {
        questions: questionsReducer,
        game: gameReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            thunk: false
        }),
        epicMiddleware
    ]
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

epicMiddleware.run(rootEpic);
