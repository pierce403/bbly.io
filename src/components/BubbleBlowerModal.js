import React, { Component } from "react";

import { broadcastThing } from "../IPFSManager";

export class BubbleBlowerModal extends Component {
  state = { value: "" };
  render() {
    return (
      <div
        className="modal fade bd-reg-modal-lg"
        id="reg-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <form className="from-inline">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLiveLabel">
                  New Post
                </h5>
              </div>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0" />

              <div className="modal-body">
                <div className="input-group">
                  <input
                    id="blowerInput"
                    type="text"
                    className="form-control border-secondary"
                    placeholder="story title"
                    name="name"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="submit"
                  value="new post"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          </div>
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
        id: "bubble-" + Math.round(Math.random() * 1000000000)
      })
    );

    this.setState({ value: "" });
  };
}
