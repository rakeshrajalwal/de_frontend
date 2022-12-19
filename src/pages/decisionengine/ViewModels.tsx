import * as React from 'react';
import { render } from 'react-dom';

// import './styles.css';

function ViewModels() {
  const [counter, setCounter] = React.useState(60);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className="">
      <div>View models</div>
    </div>
  );
}

export default ViewModels;
