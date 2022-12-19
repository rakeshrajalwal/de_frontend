import * as React from 'react';
import { render } from 'react-dom';

// import './styles.css';

function RunSummaries() {
  const [counter, setCounter] = React.useState(60);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className="">
      <div>Countdown: {counter}</div>
    </div>
  );
}

export default RunSummaries;
