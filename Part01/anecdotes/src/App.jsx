import { useState } from 'react'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(0)
  // console.log(votes)
  const onNext = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const onVote = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)
    const mx = Math.max(...temp)
    // console.log(temp.findIndex(e => e === mx))
    setMax(temp.findIndex(e => e === mx))
  }
  const Button = (props) => (<><button onClick={props.handleClick}>{props.text}</button></>)
  const Heading = (props) => (<><h1>{props.text}</h1></>)
  const Content = (props) => (<><p>{props.text}</p></>)
  return (
    <div>
      <Heading text='Anecdotes of the day'/>
      <Content text={anecdotes[selected]}/>
      <Button handleClick={() => {onVote()}} text='vote'/>
      <Button handleClick={() => {onNext()}} text='next'/>
      <Heading text='Anecdotes with most votes'/>
      <Content text={anecdotes[max]}/>
      <Content text={'has ' + votes[max] + ' votes'}/>
    </div>
  )
}
export default App
