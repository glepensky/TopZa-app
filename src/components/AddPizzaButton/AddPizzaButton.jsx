import React from "react";
import { useDispatch } from "react-redux";

function AddPizzaButton(props) {
  const dispatch = useDispatch();

  return (
    <button
      className={props.className}
      onClick={() => dispatch({ type: "Add Pizza" })}>
      Add Pizza
    </button>
  );
}

export default AddPizzaButton;
