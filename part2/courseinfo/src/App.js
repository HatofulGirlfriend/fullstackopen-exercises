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

const Total = ({ courseTotal }) => {
const sumTotalExercises = courseTotal.parts.reduce(
  (sum, part) => {
    return sum + part.exercises
  },
   0
);
console.log(sumTotalExercises)
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
      <Total courseTotal={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      },
    ],
  };

 return <Course course={course} />

};

export default App;

  // return (
  //   <div>
  //     <Header course={course} />
  //     <Content course={course} />
  //     <Total course={course} />
  //   </div>
  // );