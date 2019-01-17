import React, { Component } from "react";

export class BblyNavbar extends Component {
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
        <a
          className="navbar-brand"
          href="#!"
          data-toggle="modal"
          data-target=".bd-reg-modal-lg"
          onClick={this.handleNewClick}
        >
          New Post
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
          <span className="form-inline my-2 my-lg-0">
            peers: {this.props.peerCount}
          </span>

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

  handleNewClick = event => {
    //event.preventDefault();
    console.log("this was fun");
    document.getElementById("blowerInput").focus();
  };
}
