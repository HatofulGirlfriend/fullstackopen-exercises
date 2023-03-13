const Header = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const Content = ({ courseParts }) => {
  return (
    <>
    {courseParts.map(part =>
      <Part key={part.id} name={part.name} exercise={part.exercises} />
    )}
    </>
  );
};

const Total = ({ courseParts }) => {
const sumTotalExercises = courseParts.reduce(
  (sum, part) => {
    return sum + part.exercises
  },
   0
);
  return (
    <p>
      <strong>total of {sumTotalExercises} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => { 
  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts}/>
      <Total courseParts={course.parts}/>
    </div>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }
  ]

//  return <Course course={courses} />
  return (
  <>
    {courses.map(course =>
      <Course key={course.id} course={course} />
    )}
  </>
  )

};

// {courseParts.map(part =>
//   <Part key={part.id} name={part.name} exercise={part.exercises} />
// )}

export default App;
