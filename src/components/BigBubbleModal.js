import React, { Component } from "react";

export class BigBubbleModal extends Component {
  render() {
    return (
      <div
        className="modal fade bd-big-bubble-modal-lg"
        id="big-bubble-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLiveLabel">
                BIG BUBBLE LYFE!!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <div className="input-group-prepend">
                  <button className="btn btn-outline-success" type="button">
                    <span className="fa fa-user-circle" />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control border-success"
                  id="newname"
                  placeholder="username"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-success" data-dismiss="modal">
                close
              </button>
              <button className="btn btn-outline-success">register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
