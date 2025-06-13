import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const AnecdoteList = ({ anecdotes }) => (
  <div className="container">
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => 
          <tr key={anecdote.id} >
            <td className="left">
              <Link to={`/${anecdote.id}`}>
                {anecdote.content}
              </Link> 
            </td>
            <td className="right">
              votes: {anecdote.votes}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

export default AnecdoteList