import React, { useEffect, useState } from 'react';
import './App.css';

const JSONObj = ({ dataRespObj }) => {
  const mapObj = Object.keys(dataRespObj || {});

  const objRenderer = (objData) => <JSONObj dataRespObj={objData} />;

  const renderCaseType = (value) => {
    const typeOfValue = typeof value;

    if ( typeOfValue === 'string' || typeOfValue === 'number') {
      return <span>{value}</span>
    } else if (typeOfValue === 'object') {
      return <span>{objRenderer(value)}</span>
    } else {
      return null;
    }
  }

  return (
    <div>
      {
        mapObj.map(key => {
          return (
            <div>
              <div>{key} - {renderCaseType(dataRespObj[key])}</div>
            </div>
          )
        })
      }
    </div>
  );
};

function App() {
  const [dataResp, setDataResp] = useState([]);

  useEffect(() => {
    fetch('./data/values.json').then(res => res.json()).then(d => setDataResp(d));
  }, []);

  console.log(dataResp.response);

  return (
    <div className="App">
      <header className="App-header">
        {!dataResp.response ? 'Loading' : <JSONObj dataRespObj={dataResp.response} />}
      </header>
    </div>
  );
}

export default App;
