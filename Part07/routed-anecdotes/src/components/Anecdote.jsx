const Anecdote = ({ anecdote, vote }) => {
  const style = {
    marginTop: '1.5rem'
  }
  const textStyle = {
    fontWeight: 'bold'
  }
  return (
    <div style={style} className="container">
      content: <span style={textStyle}>{anecdote.content}</span><br/>
      author: <span style={textStyle}>{anecdote.author}</span><br/>
      url: <span style={textStyle}>{anecdote.info}</span><br/>
      votes: <span style={textStyle}>{anecdote.votes}</span><br/>
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  )
}

export default Anecdote