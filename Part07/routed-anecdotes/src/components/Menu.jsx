import { Link } from "react-router-dom"
import { Nav, Navbar } from "react-bootstrap"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link href='#' style={padding} to="/">anecdotes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link href='#' style={padding} to="/create">create new</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link href='#' style={padding} to="/about">about</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu