import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

import { initIPFS, broadcastThing } from "./IPFSManager";

class App extends Component {
  state = {
    toggle: true,
    bubbleList: [
      { title: "first thing", score: 0, id: "bubble" + Math.random() },
      { title: "second thing", score: 1, id: "bubble" + Math.random() },
      { title: "third thing", score: 2, id: "bubble" + Math.random() }
    ]
  };

  componentDidMount() {
    initIPFS({
      onAddBubble: bubble => {
        this.setState({ bubbleList: [...this.state.bubbleList, bubble] });
      }
    });
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  handleUpvote(bubbleId) {
    const newBubbleList = this.state.bubbleList.map(bubble => {
      if (bubble.id === bubbleId) {
        return { ...bubble, score: bubble.score + 1 };
      } else {
        return bubble;
      }
    });
    this.setState({ bubbleList: newBubbleList });
  }

  handleDownvote(bubbleId) {
    const newBubbleList = this.state.bubbleList.map(bubble => {
      if (bubble.id === bubbleId) {
        return { ...bubble, score: bubble.score - 1 };
      } else {
        return bubble;
      }
    });
    this.setState({ bubbleList: newBubbleList });
  }

  render() {
    const sortedBubbles = this.state.bubbleList.slice();
    sortedBubbles.sort((left, right) => {
      if (left.score > right.score) {
        return -1;
      } else if (left.score < right.score) {
        return 1;
      } else {
        return 0;
      }
    });
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          <BubbleBlower />
          <br />

          <ul className="list-group">
            {sortedBubbles.slice(0, 10).map(bubble => {
              return (
                <li key={bubble.id} className="list-group-item">
                  <Bubble
                    title={bubble.title}
                    score={bubble.score}
                    onUpvote={() => this.handleUpvote(bubble.id)}
                    onDownvote={() => this.handleDownvote(bubble.id)}
                  />
                </li>
              );
            })}
          </ul>

          {/* <button onClick={this.toggle}>show/hide</button>
          {this.state.toggle && (
            <p>
              Edit <code>src/App.js </code> and save potato.
            </p>
          )} */}
        </header>
      </div>
    );
  }
}

class Bubble extends Component {
  render() {
    return (
      <div className="card border-secondary mb-3 text-left">
        <div className="card-body">
          <button className="btn btn-outline-secondary">
            {this.props.score}
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={this.props.onUpvote}
          >
            <span className="fa fa-smile-o" />
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={this.props.onDownvote}
          >
            <span className="fa fa-frown-o" />
          </button>
          {this.props.title}
        </div>
      </div>
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
              onMouseEnter={() => console.log("enter")}
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
    console.log("A new story was submitted: " + this.state.value);
    broadcastThing(this.state.value);
    event.preventDefault();
  };
}

export default App;
