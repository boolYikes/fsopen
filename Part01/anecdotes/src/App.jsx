import { useState } from 'react'
const Heading = (props) => (<><h2>{props.text}</h2></>)
const Content = (props) => (<><h4>{props.text}</h4></>)
const Button = (props) => (<><button onClick={props.handleClick}>{props.name}</button></>)
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
  const handleClick = () => {
    const rand = Math.floor(Math.random() * (anecdotes.length))
    setSelected(rand)
  }
  const handleVote = () => {
    const temp = [...count]
    temp[selected] += 1
    setCount(temp)
    const newBest = temp.indexOf(temp.sort()[temp.length-1])
    //console.log(newBest)
    setBest(newBest)
  }
  const [selected, setSelected] = useState(Math.floor(Math.random() * (anecdotes.length)))
  const [count, setCount] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [best, setBest] = useState(0)
  return (
    <div>
      <Heading text='Anecdote of the day'/>
      <Content text={anecdotes[selected]}/>
      <Content text={'has ' + count[selected] + ' vote(s)'}/>
      <Button handleClick={() => {handleVote()}} name='vote'/>
      <Button handleClick={() => {handleClick()}} name='next anecdote'/>
      <Heading text='Anecdote with most votes'/>
      <Content text={anecdotes[best]}/>
      <Content text={'has ' + count[best] + ' vote(s)'}/>
    </div>
  )
}

export default App
