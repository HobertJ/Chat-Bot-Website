import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Algorithm.css';

function Algorithm({handleChangeAlgorithm}) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bm');

  function handleAlgorithmChange(event) {
    setSelectedAlgorithm(event.target.value);
    handleChangeAlgorithm(selectedAlgorithm)
  }

  return (
    <div className="algorithm-container position-fixed bottom-0 start-0 p-3">
      <h4 className="choose-algorithm">CHOOSE ALGORITHM</h4>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="bm"
          value="bm"
          checked={selectedAlgorithm === 'bm'}
          onChange={handleAlgorithmChange}
        />
        <label htmlFor="bayerMoore" className="form-check-label">KMP</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="kmp"
          value="kmp"
          checked={selectedAlgorithm === 'kmp'}
          onChange={handleAlgorithmChange}
        />
        <label htmlFor="kmp" className="form-check-label">BOYER-MOORE</label>
      </div>
    </div>
  );
}

export default Algorithm;
