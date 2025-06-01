import Course from './components/Course'
import Title from './components/Title'
const App = () => {
  const title = 'Web development curriculum'
  const courses = [
    {
      id: 1,
      name: 'Half stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        },
        {
          name: 'Design principles',
          exercises: 6,
          id: 5
        }
      ] 
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        {
          name: 'APIs',
          exercises: 10,
          id: 3
        }
      ]
    }
  ]
  return (
    <div>
      <Title text={title}/>
      {courses.map((course) => 
        <Course key={course.id} course={course}/>
      )}
    </div>
  )
}

export default App