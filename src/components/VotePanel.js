import React, { Component } from "react";

import { broadcastThing } from "../IPFSManager";

export class VotePanel extends Component {
  render() {
    return (
      <span>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "awesome",
                id: this.props.bubble.id
              })
            );
          }}
          title="awesome"
        >
          <span className="fa fa-grin-stars">
            {" "}
            {this.props.bubble.awesome}{" "}
          </span>
        </button>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "hilarious",
                id: this.props.bubble.id
              })
            );
          }}
          title="hilarious"
        >
          <span className="fa fa-grin-squint-tears">
            {" "}
            {this.props.bubble.hilarious}
          </span>
        </button>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "enlightening",
                id: this.props.bubble.id
              })
            );
          }}
          title="enlightening"
        >
          <span className="fa fa-lightbulb">
            {" "}
            {this.props.bubble.enlightening}{" "}
          </span>
        </button>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "solidarity",
                id: this.props.bubble.id
              })
            );
          }}
          title="solidarity"
        >
          <span className="fa fa-fist-raised">
            {" "}
            {this.props.bubble.solidarity}{" "}
          </span>
        </button>{" "}
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "scammy",
                id: this.props.bubble.id
              })
            );
          }}
          title="scammy"
        >
          <span className="fa fa-dollar-sign">
            {" "}
            {this.props.bubble.scammy}{" "}
          </span>
        </button>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "poopy",
                id: this.props.bubble.id
              })
            );
          }}
          title="poopy"
        >
          <span className="fa fa-poop"> {this.props.bubble.poopy} </span>
        </button>
        <button
          className="btn btn-outline-secondary m-1"
          onClick={() => {
            broadcastThing(
              JSON.stringify({
                type: "vote",
                emotion: "hateful",
                id: this.props.bubble.id
              })
            );
          }}
          title="hateful"
        >
          <span className="fa fa-skull"> {this.props.bubble.hateful} </span>
        </button>
      </span>
    );
  }
}
