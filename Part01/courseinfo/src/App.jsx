const Header = (arg) => {
  return (
    <>
      <h1>{arg.cTitle}</h1>
    </>
  )
}
const Content = (arg) => {
  return (
    <>
      <p>
        {arg.pName} {arg.exNum}
      </p>
    </>
  )
}
const Total = (arg) => {
  return (
    <>
      <p>
        Number of Exercises : {arg.exNum1 + arg.exNum2 + arg.exNum3}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]
  return (
    <div>
      <Header cTitle={course}/>
      <Content pName={parts[0]} exNum={exercises[0]}/>
      <Content pName={parts[1]} exNum={exercises[1]}/>
      <Content pName={parts[2]} exNum={exercises[2]}/>
      <Total exNum1={exercises[0]} exNum2={exercises[1]} exNum3={exercises[2]}/>
    </div>
  )
}

export default App