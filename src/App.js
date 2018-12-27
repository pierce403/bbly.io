import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

import { initIPFS, broadcastThing, getTopBubbles } from "./IPFSManager";

class App extends Component {
  state = {
    peerCount: 0,
    toggle: true,
    topBubbles: getTopBubbles()
  };

  componentDidMount() {
    initIPFS({
      onBubbleChange: () => {
        this.setState({ topBubbles: getTopBubbles() });
      },
      onPeerChange: newCount => {
        this.setState({ peerCount: newCount });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <BblyNavbar />
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          peers: {this.state.peerCount}
          <BubbleBlower />
          <br />
          <ul className="list-group">
            {this.state.topBubbles.map(bubble => {
              return (
                <li key={bubble.id} className="list-group-item">
                  <Bubble
                    title={bubble.title}
                    score={bubble.score}
                    happy={bubble.happy}
                    sad={bubble.sad}
                    onHappy={() => {
                      broadcastThing(
                        JSON.stringify({
                          type: "vote",
                          emotion: "happy",
                          id: bubble.id
                        })
                      );
                    }}
                    onSad={() => {
                      broadcastThing(
                        JSON.stringify({
                          type: "vote",
                          emotion: "sad",
                          id: bubble.id
                        })
                      );
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </header>
      </div>
    );
  }
}

class Bubble extends Component {
  render() {
    return (
      <div className="card border-secondary mb-3 m-3 text-left">
        <div className="card-body">
          <button className="btn btn-outline-secondary m-1">
            {this.props.score}
          </button>

          <button
            className="btn btn-outline-secondary m-1"
            onClick={this.props.onHappy}
          >
            <span className="fa fa-smile-o"> {this.props.happy} </span>
          </button>
          <button
            className="btn btn-outline-secondary m-1"
            onClick={this.props.onSad}
          >
            <span className="fa fa-frown-o"> {this.props.sad} </span>
          </button>
          <span className="m-3">{this.props.title}</span>
        </div>
      </div>
    );
  }
}

class BblyNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondy">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#!">
          Navbar
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-md-0">
            <li className="nav-item active">
              <a className="nav-link" href="#!">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#!">
                Disabled
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
          </form>
        </div>
      </nav>
    );
  }
}

class BubbleBlower extends Component {
  state = { value: "" };

  render() {
    return (
      <div className="BubbleBlower">
        <form onSubmit={this.handleSubmit} className="from-inline">
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="story title"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
              //onMouseEnter={() => console.log("enter")}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn btn-outline-secondary"
          />
        </form>
      </div>
    );
  }

  handleChange = event => {
    // console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("A new story was submitted: " + this.state.value);
    broadcastThing(
      JSON.stringify({
        type: "story",
        title: this.state.value,
        id: "bubble-" + Math.round(Math.random() * 1000000)
      })
    );
  };
}

export default App;
