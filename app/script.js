import React from 'react';
import { render } from 'react-dom';

const AppDescription = () => (
  <div>
    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
    <p>This app will help you track your time and inform you when it's time to rest.</p>
  </div>
);

let timeForWork = 10;
let timeForRest = 5;

class App extends React.Component {

  state = {
    status: "off",
    timer: null,
  }

  formatTime = time => {

    let formatedTime;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    
    if(minutes < 10) {
      minutes = '0' + minutes;
    }

    if(seconds < 10) {
      seconds = '0' + seconds;
    }

    formatedTime = minutes + ' : ' + seconds;
    
    return formatedTime;
  };

  step = () => {
    this.setState({time: this.state.time - 1});

    if (this.state.time === 0) {
      this.playBell();

      const { status } = this.state;

      this.setState({
        status: status === 'work' ? 'rest' : 'work',
        time: status === 'work' ? timeForRest : timeForWork
      })
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: timeForWork,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(this.state.timer),
    });
  };

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
      
    const { status, time } = this.state;
      return (
        <div>
          <h1>Protect your eyes</h1>
          {status === 'off' && <AppDescription/>}
          {(status === 'work') && <img src="./images/work.png" />}
          {(status === 'rest') && <img src="./images/rest.png" />}
          {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
          {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
          {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
          <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
        </div>
      )
    };
  }

render(<App />, document.querySelector('#app'));
