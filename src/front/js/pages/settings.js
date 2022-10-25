import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { ChangePassword } from "../component/changepassword";
// import { HabitsModal } from "../component/habits_modal";
import { Theme } from "../component/theme";
import Avatar from "react-avatar";
import "../../styles/settings.css";

export const Settings = () => {
  const [userhabit, setUserHabit] = useState();
  const [timesaday, setTimesADay] = useState();
  const [typeofhabit, setTypeOfHabit] = useState();
  const [userName, setUserName] = useState("juliana achiame");
  const [typeoftheme, setTypeOfTheme] = useState();
  const [newhabit, setNewHabit] = useState();

  const { store, actions } = useContext(Context);


  const dataHabits = store?.habits;
  console.log(dataHabits);

  const listOFHabits = dataHabits.map((item, index) => {
    return <div key={index}>{item.name}</div>;
  });

  return (
    <div className="container">

      {/* part que executa o modal do Profile picture  -> modal 03*/}

      <div>
        {<Avatar name={userName} />}
      </div>

      <fieldset>
        <div className="row align-items-start">
          <legend>SETTINGS</legend>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-gear"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
          </div>
          <div className="col">Theme</div>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-square"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal00"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </div>

          <p></p>

          <legend>ACCOUNT</legend>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
          <div className="col">Profile name</div>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-square"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </div>

          <p></p>

          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-key-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </div>
          <div className="col">Password</div>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-square"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal02"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </div>

          <p></p>

          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-image"
              viewBox="0 0 16 16"
            >
              <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
            </svg>
          </div>
          <div className="col">Profile picture</div>
          <div className="col">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-square"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal03"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </div>

          <p></p>

          <legend>HABITS</legend>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-universal-access"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9V5.5Z" />
            </svg>
          </div>
          <div className="col">Habits</div>
          <div className="col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-square"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal04"
            >
              <path
                fill-rule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </div>

          <p></p>

          {/* part que executa o modal do Theme */}

          <Theme />

          {/* part que executa o modal do profile name - MANTER*/}

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    PROFILE NAME *
                  </h1>
                </div>
                <div className="modal-body">
                  <span className="border border-4 border-dark">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    ></input>
                  </span>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={actions.registerNameOfTheUser(userName)}
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

          {/* part que executa o modal do Password*/}

          <ChangePassword />

          {/* part que executa o modal do Habits*/}

          {/* <HabitsModal /> */}

          <div
            className="modal fade"
            id="exampleModal04"
            tabindex="-1"
            aria-labelledby="exampleModal04Label"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div>
                    <h5>HABIT NAME *</h5>
                    <span className="border border-4 border-dark">
                      <input
                        type="text"
                        id="userhabit"
                        name="userhabit"
                        onChange={(e) => setNewHabit(e.target.value)}
                        value={newhabit}
                      ></input>
                    </span>
                  </div>

                  <br></br>

                  <div>
                    <h5>TYPE OF HABIT*</h5>
                    <input
                      type="radio"
                      id="good"
                      name="scales"
                      onClick={() => {
                        setTypeOfHabit("Good");
                      }}
                    ></input>
                    <label for="scales">Good</label>

                    <input
                      type="radio"
                      id="bad"
                      name="scales"
                      onClick={() => {
                        setTypeOfHabit("Bad");
                      }}
                    ></input>
                    <label for="horns">Bad</label>
                  </div>

                  <br></br>

                  <div>
                    <h5>TIMES A DAY?</h5>
                    <span className="border border-4 border-dark">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setTimesADay(e.target.value)}
                        value={timesaday}
                      ></input>
                    </span>
                  </div>

                  <br></br>

                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={() => {
                      actions.registerNewHabit(newhabit, timesaday, typeofhabit);
                    }}
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
                <div>{listOFHabits}</div>
              </div>
            </div>
          </div>

        </div>
      </fieldset>
    </div>
  );
};

   