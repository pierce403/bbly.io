import React, { Component } from "react";
//import { OverlayTrigger, Tooltip } from "react-bootstrap";

// import logo from "./logo.svg";
import "./App.css";

import { initIPFS, getTopBubbles } from "./IPFSManager";

import { BigBubbleModal } from "./components/BigBubbleModal";
import { VotePanel } from "./components/VotePanel";
import { BblyNavbar } from "./components/BblyNavbar";
import { BubbleBlowerModal } from "./components/BubbleBlowerModal";

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
        <BblyNavbar peerCount={this.state.peerCount} />
        <header className="App-header">
          <BubbleBlowerModal />
          <BigBubbleModal />
          <br />
          <ul className="list-group">
            {this.state.topBubbles.map(bubble => {
              return (
                <li key={bubble.id} className="list-group-item">
                  <Bubble bubble={bubble} />
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
    console.log("RENDERING");
    return (
      <div className="card border-secondary mb-3 m-3 text-left">
        <div
          className="card-body"
          //data-toggle="modal"
          //data-target=".bd-big-bubble-modal-lg"
        >
          <button className="btn btn-outline-secondary m-1">
            {this.props.bubble.score}
          </button>
          {this.props.bubble.title}
          <br />
          <VotePanel bubble={this.props.bubble} />
        </div>
      </div>
    );
  }
}

export default App;
