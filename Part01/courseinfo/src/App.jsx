const Header = (arg) => {
  return (
    <>
      <h1>{arg.cTitle}</h1>
    </>
  )
}
const Content = (arg) => {
  const p = arg.parts
  const e = arg.exercises
  return (
    <>
      <Part pName={p[0]} exNum={e[0]}/>
      <Part pName={p[1]} exNum={e[1]}/>
      <Part pName={p[2]} exNum={e[2]}/>
    </>
  )
}
const Part = (arg) => {
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
      <Content parts={parts} exercises={exercises}/>
      <Total exNum1={exercises[0]} exNum2={exercises[1]} exNum3={exercises[2]}/>
    </div>
  )
}

export default App