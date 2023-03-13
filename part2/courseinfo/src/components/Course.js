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

  export default Course;