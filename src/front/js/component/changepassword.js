import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";


export const ChangePassword = ({ items }) => {
    const { store, actions } = useContext(Context);
    const [changePassWord, setchangePassWord] = useState();

    return (
        <div
            className="modal fade"
            id="exampleModal02"
            tabindex="-1"
            aria-labelledby="exampleModal02Label"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="fs-5">CURRENT PASSWORD *</h2>
                  <div className="modal-body">
                    <span className="border border-dark">
                      <input type="text" id="username" name="username"></input>
                    </span>
                  </div>
                </div>

                <div className="modal-header">
                  <h2 className="fs-5">NEW PASSWORD *</h2>
                  <div className="modal-body">
                    <span className="border border-dark">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setchangePassWord(e.target.value)}
                        value={changePassWord}
                      ></input>
                    </span>
                  </div>
                </div>

                <div className="modal-header">
                  <h2 className="fs-5">CONFIRM PASSWORD *</h2>
                  <div className="modal-body">
                    <span className="border border-dark">
                      <input type="text" id="username" name="username"></input>
                    </span>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={actions.changePassWord(changePassWord)}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="btn btn-outline-dark rounded-0 me-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}