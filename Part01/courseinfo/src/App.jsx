const Header = (prop) => {
  return (
    <>
      <h1>{prop.course.name}</h1>
    </>
  )
}
const Content = (prop) => {
  return (
    <>
      <p>Subject {prop.parts[0].name} exercises done: {prop.parts[0].exercises}</p>
      <p>Subject {prop.parts[1].name} exercises done: {prop.parts[1].exercises}</p>
      <p>Subject {prop.parts[2].name} exercises done: {prop.parts[2].exercises}</p>
    </>
  )
}
const Total = (prop) => {
  return (
    <>
      <p>Total exercises conducted: {prop.parts[0].exercises+prop.parts[1].exercises+prop.parts[2].exercises}</p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App