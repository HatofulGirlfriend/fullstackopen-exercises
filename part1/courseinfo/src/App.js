const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.pizza} {props.pie}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part pizza={props.part1} pie={props.exercises1} />
      <Part pizza={props.part2} pie={props.exercises2} />
      <Part pizza={props.part3} pie={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name}
        exercises1={part1.exercises}
        part2={part2.name}
        exercises2={part2.exercises}
        part3={part3.name}
        exercises3={part3.exercises}
      />
      <Total totalExercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
