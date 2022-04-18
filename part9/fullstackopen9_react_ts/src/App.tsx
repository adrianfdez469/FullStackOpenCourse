import Content from "./Content";
import Header from "./Header";
import Total from "./Total";
import courseParts from "./data"; 

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;