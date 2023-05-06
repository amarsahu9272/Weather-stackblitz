import * as React from 'react';
import './style.css';

import { useState } from 'react';
import './style.css';
import { BiSearchAlt } from 'react-icons/bi';
import { RiCharacterRecognitionLine } from 'react-icons/ri';
import { IoMdSunny, IoMdPartlySunny } from 'react-icons/io';

export default function App() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [recent, setRecent] = useState([]);
  const [show, setShow] = useState(false);

  function captureValue(e) {
    setSearch(e.target.value);
  }

  async function fetchApi(search) {
    if (!search) {
      alert('Please Enter city name');
    } else {
      console.log(search);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f1e54a75b1c4bed47a561452a949c466`
      );

      const data = await res.json();
      console.log(data);
      setResult(data);
      if (data.message) {
        return;
      } else {
        // recent.push(data)
        setRecent([data, ...recent]);
        // console.log(recent,"recfet")
      }
    }
    setSearch('');
  }

  return (
    <div className="main">
      <div className="navbar">
        <h3 className="heading">
          <RiCharacterRecognitionLine className="iconNav" />{' '}
          <h3 className="headingText"> Weather Application </h3>
        </h3>
      </div>

      <div className="wrapper">
        <div className="searchbar">
          <input
            value={search}
            className="input"
            placeholder="Seacrh by City"
            onChange={captureValue}
          />
          <button onClick={() => fetchApi(search)}>
            <BiSearchAlt /> Search
          </button>
        </div>

        {result ? (
          <div>
            <div className="allCard">
              <div className={result.main?.temp > 20 ? 'cardTemp' : 'card'}>
                {result.message ? (
                  <p className="city">{result.message.toUpperCase()} </p>
                ) : (
                  <div>
                    {result.main?.temp > 20 ? (
                      <IoMdSunny className="sunIcon" />
                    ) : (
                      <IoMdPartlySunny className="sunIcon" />
                    )}

                    <p className="city">{result.name}</p>
                    <p className="p">Country Code : {result.sys?.country}</p>
                    <p className="p">
                      Temp : {Math.round(result.main?.temp)}&#8451;
                    </p>
                    <p className="p">
                      RealFeel : {result.main?.feels_like} &#8451;
                    </p>
                    <p className="p"> Humidity : {result.main?.humidity} %</p>
                  </div>
                )}
              </div>

              <div className="recentSearch">
                <p className="recentText"> Recent Search : </p>
                {recent.slice(1, 3).map((x) => (
                  <div className={x.main?.temp > 20 ? 'cardTemp' : 'card'}>
                    {x.main?.temp > 20 ? (
                      <IoMdSunny className="sunIcon" />
                    ) : (
                      <IoMdPartlySunny className="sunIcon" />
                    )}
                    <p className="city">{x.name}</p>
                    <p className="p"> Country : {x.sys?.country}</p>
                    <p className="p">
                      Temp : {Math.round(x.main?.temp)}&#8451;
                    </p>
                    <p className="p">RealFeel : {x.main?.feels_like} &#8451;</p>
                    <p className="p"> Humidity : {x.main?.humidity} %</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h3 className="city">Welcome to Weather App </h3>
        )}
      </div>
    </div>
  );
}
