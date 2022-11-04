import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";

export const FinishDayAction = () => {
  const { store, actions } = useContext(Context);

  const HandleAction = async () => {
    if (!store.habits[0].editable) {
      return;
    }

    try {
      actions.setLoading(true);
      await actions.finishDay();
      actions.setLoading(false);
    } catch (error) {
      console.log("Finish day action error", error);
    }
  };

  return (
    <div className="FinishDayAction">
      <button
        className={`FinishDayAction-action Button Button--confirm ${
          !store.habits[0].editable ? "disabled" : ""
        }`}
        onClick={HandleAction}
        disabled={!store.habits[0].editable}
      >
        Finish day
      </button>
    </div>
  );
};
