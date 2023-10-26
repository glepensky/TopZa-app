import React from "react";
import { useDispatch } from "react-redux";

function AddPizza(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Search for Pizza</h1>
    <button
      className={props.className}
      onClick={() => dispatch({ type: "Add Pizza" })}>
      Add Pizza
    </button>

</div>
  );
}

export default AddPizza;
