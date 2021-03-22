import "./App.css";
import React from "react";

function outputUpdate(vol) {
  document.querySelector("#volume").value = vol;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };

    this.handleVolume = this.handleVolume.bind(this);
  }

  handleVolume = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <div className="container">
            <div id="drum-config">
              <div className="column">
                <div className="toggle-btn">
                  <input
                    type="checkbox"
                    className="toggle"
                    id="poweroff"
                  ></input>
                  <label className="slider-poweroff" htmlFor="poweroff"></label>
                  <span className="tooltiptext power">Power on</span>
                </div>

                <div className="toggle-btn">
                  <input type="checkbox" className="toggle" id="bank"></input>
                  <label className="slider-bank" htmlFor="bank"></label>
                  <span className="tooltiptext bank">Bank</span>
                </div>
              </div>
              <div className="column">
                <div id="drum-name">
                  <span>
                    <strong>No Drum</strong>
                  </span>
                </div>
              </div>
            </div>
            <div id="drum-pad-container">
              <div className="row">
                <a href="#" className="drum-pad">
                  Q
                </a>
                <a href="#" className="drum-pad">
                  W
                </a>
                <a href="#" className="drum-pad">
                  E
                </a>
              </div>
              <div className="row">
                <a href="#" className="drum-pad">
                  A
                </a>
                <a href="#" className="drum-pad">
                  S
                </a>
                <a href="#" className="drum-pad">
                  D
                </a>
              </div>
              <div className="row">
                <a href="#" className="drum-pad">
                  Z
                </a>
                <a href="#" className="drum-pad">
                  X
                </a>
                <a href="#" className="drum-pad">
                  C
                </a>
              </div>
            </div>
            <div id="volume-box" className="column">
              <input
                type="range"
                min="0"
                max="100"
                value={this.state.value}
                id="volume"
                step="1"
                onChange={this.handleVolume}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Pad({ clip }) {


  
  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.currentTime = 0;
    audioTag.play();
  };

  return (
    <a href="#" className="drum-pad">
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </a>
  );
}

export default App;
