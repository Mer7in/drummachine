import "./App.css";
import React from "react";
import drums from "./audio.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };

    this.handleVolume = this.handleVolume.bind(this);
    // this.playSound = this.playSound.bind(this);
  }

  handleVolume = (event) => {
    this.setState({ value: event.target.value });
  };

  // playSound = (e) =>{
  //   e.preventDefault();
  //   console.log('test 1 2 ');
  // }

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
                  <span>No Drum</span>
                </div>
              </div>
            </div>
            <div id="drum-pad-container">
              {drums.map((item) => (
                console.log(item),
                <Pad
                  key={item.id} 
                  onClick={this.playSound}
                  text={item.keyTrigger}
                  audio={item.url}
                  desc={item.desc}
                />
              ))}
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

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();

    this.state = {
      play: true,
      volume: 50,
    };
  }

  componentDidMount() {
    this.audio.current.addEventListener("ended", (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove("active");
    });
  }

  playSound = (e) => {
    e.preventDefault();
    const text=drums.filter(element =>element.keyTrigger===this.audio.current.id);

    const display = document.getElementById("drum-name");
    const displayChild=display.childNodes[0];
    displayChild.innerHTML=text[0].desc

    const parent = this.audio.current.parentNode;
    parent.classList.add("active");
    this.setState((state) => {
      state.play ? this.audio.current.play() : this.audio.current.pause();
    });
  };

  render() {
    const { text, audio, desc } = this.props;
    return (
      <a
        href="#"
        className="drum-pad"
        id={`drum-${text}`}
        onClick={this.playSound}
        onKeyDown={this.handleKey}
      >
        <audio ref={this.audio} className="clip" id={text} src={audio} />
        {text}
      </a>
    );
  }
}

document.addEventListener("keydown", (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);
  //console.log(audio);
  if (audio) {
    const parent = audio.parentNode;
    const text=drums.filter(element =>element.keyTrigger==id);
    const display = document.getElementById("drum-name");
    const displayChild=display.childNodes[0];
    displayChild.innerHTML=text[0].desc
    console.log(text)
    parent.classList.add("active");
    audio.play(); 
  }
});

//object filter prototype
Object.filter = function( obj, predicate) {
  let result = {}, key;

  for (key in obj) {
      if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
          result[key] = obj[key];
      }
  }

  return result;
};

export default App;
