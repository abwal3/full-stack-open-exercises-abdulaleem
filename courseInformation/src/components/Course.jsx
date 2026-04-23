const Course = ({ course }) => {
  return <>
    <Header course={course} />
    <Content part={course.part} />
    <Total part={course.part} />
  </>
}


const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Content = ({ part }) => {
  return (
    <div>
      {part.map(part => (
        <Parts key={part.id} part={part} />
      ))}
      
    </div>
  )
}

const Parts = ({ part }) => {
  return <div>
    <p>{part.name} {part.exercises}</p>
  </div>
}

const Total = ({ part }) => {
  
  const total = part.reduce((sum, part) => sum + part.exercises, 0)
  
  return <p><b>total of {total} exercises</b></p>
}

export default Course