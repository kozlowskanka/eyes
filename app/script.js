import React from 'react';
import { render } from 'react-dom';
import AppDescription from './../components/AppDescription/AppDescription';

class App extends React.Component {

  state = {
    status: "off",
    time: 0,
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

      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        })
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
      };
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
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
          {(status !== 'off') && <button className="btn">Stop</button>}
          <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
        </div>
      )
    };
  }

render(<App />, document.querySelector('#app'));
