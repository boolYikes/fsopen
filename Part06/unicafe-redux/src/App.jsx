import { useState } from 'react'
import counterReducer from './reducer'
import { createStore } from 'redux'


const Heading = (props) => (<><h1>{props.text}</h1></>)
const StatisticLine = (props) => (
    <><tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr></>
)
const Statistics = ({ state }) => {
    if (state.good > 0 || state.neut > 0 || state.bad > 0){
        return (
            <>
                <table>
                    <tbody>
                        <StatisticLine text='good' value={state.good}/>
                        <StatisticLine text='neutral' value={state.neut}/>
                        <StatisticLine text='bad' value={state.bad}/>
                    </tbody>
                </table>
            </>
        )
    }else{
        return (
            <div>
        No feedback given
            </div>
        )
    }
}
const Button = (props) => (<><button onClick={props.handleClick}>{props.name}</button></>)


const App = () => {
    const store = createStore(counterReducer)
    store.dispatch({ type: 'GOOD' })
    store.dispatch({ type: 'OK' })
    store.dispatch({ type: 'BAD' })

    const handleClicks = (key) => {
        store.dispatch({ type: key })
    }

    return (
        <div>
            <Heading text='Give feedback'/>
            <Button handleClick={() => {handleClicks('GOOD')}} name='good'/>
            <Button handleClick={() => {handleClicks('OK')}} name='neutral'/>
            <Button handleClick={() => {handleClicks('BAD')}} name='bad'/>
            <Button handleClick={() => {handleClicks('ZERO')}} name='reset'/>
            <Heading text='Statistics'/>
            <Statistics state={store.getState()}/>
        </div>
    )
}

export default App
