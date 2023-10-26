import React from "react";
import { useDispatch } from "react-redux";

function HallOfFame(props) {
  const dispatch = useDispatch();

  return (
    <button
      className={props.className}
      onClick={() => dispatch({ type: "Hall of Fame" })}>
      Hall Of Fame
    </button>
  );
}

export default HallOfFame;