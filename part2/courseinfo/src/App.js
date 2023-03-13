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

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

const Course = ({ course }) => { 
  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts}/>
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