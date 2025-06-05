import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import { createStore } from 'redux'

describe('unicafe reducer', () => {
    let initialState
    beforeEach(() => {
        initialState = {
            good: 0,
            ok: 0,
            bad: 0
        }
    })

    test('should return a proper initial state when called with undefined state', () => {
        const store = createStore(counterReducer)
        store.dispatch({ type: 'GOOD' })
        store.dispatch({ type: 'ZERO' })
        // const newState = counterReducer(undefined, action)
        expect(store.getState()).toEqual(initialState)

        store.dispatch({ type: 'UNKNOWN_ACTION' })
        expect(store.getState()).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })
})