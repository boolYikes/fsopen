import { useState } from 'react'
const Heading = (props) => (<><h1>{props.text}</h1></>)
const StatisticLine = (props) => (
  <><tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr></>
)
const Statistics = (props) => {
  if (props.count > 0){
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text='good' value={props.good}/>
            <StatisticLine text='neutral' value={props.neut}/>
            <StatisticLine text='bad' value={props.bad}/>
            <StatisticLine text='count' value={props.count}/>
            <StatisticLine text='average' value={props.avg}/>
            <StatisticLine text='positive' value={props.pos + ' %'}/>
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
  const [good, setGood] = useState(0)
  const [neut, setNeut] = useState(0)
  const [bad, setBad] = useState(0)
  const dic = [[good, setGood], [neut, setNeut], [bad, setBad]]
  const [count, setCount] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)
  const handleClicks = (setter) => {
    const newVal = dic[setter][0] + 1
    const newCount = newVal + dic[(setter+1)%3][0] + dic[(setter+2)%3][0]
    const newAvg = (newVal*1 + dic[(setter+1)%3][0]*0 + dic[(setter+2)%3][0]*-1) / newCount
    const newPos = setter == 0 ? newVal / newCount * 100 : good / newCount * 100
    dic[setter][1](newVal)
    setCount(newCount)
    setAvg(newAvg)
    setPos(newPos)
  }
  return (
    <div>
      <Heading text='Give feedback'/>
      <Button handleClick={() => {handleClicks(0)}} name='good'/>
      <Button handleClick={() => {handleClicks(1)}} name='neutral'/>
      <Button handleClick={() => {handleClicks(2)}} name='bad'/>
      <Heading text='Statistics'/>
      <Statistics good={good} neut={neut} bad={bad} count={count} avg={avg} pos={pos}/>
    </div>
  )
}

export default App
