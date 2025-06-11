import { Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link href='#' style={padding} to="/">anecdotes</Link>
      <Link href='#' style={padding} to="/create">create new</Link>
      <Link href='#' style={padding} to="/about">about</Link>
    </div>
  )
}

export default Menu