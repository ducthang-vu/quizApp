import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamePhase } from '../../core-data/GamePhase';

interface GameSlice {
    score: number;
    phase: GamePhase;
}

const initialState: GameSlice = {
    score: 0,
    phase: GamePhase.MAIN
}


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addScore: (state) => {
            state.score += 1
        },
        setPhase: (state, action: PayloadAction<GamePhase>) => {
            state.phase = action.payload;
        }
    },
});


export const fromGameActions =  gameSlice.actions;
export const gameReducer = gameSlice.reducer;
