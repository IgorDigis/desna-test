import { createReducer, on } from '@ngrx/store';
import { increase, decrease, reset, change } from '../actions/value-page.actions';

export interface State {
    first: number;
    second: number;
}

export const initialState: State = {
    first: -5,
    second: 10,
};

const _counterReducer = createReducer(
    initialState,
    on(change, state => state ),
    on(increase, state => ({ ...state, first: state.first + 1 })),
    on(decrease, state => ({ ...state, second: state.second - 1 })),
    on(reset, state => ({first: -5, second: 10})),
);

export function CounterReducer(state, action) {
    return _counterReducer(state, action);
}
