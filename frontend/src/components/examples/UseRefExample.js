import React, { useRef } from "react";

const UseRefExample = () => {
  // useRef can be used to get dom elements
  // easier than doing document.blah blah
  const myButton = useRef(null);

  const clickMyButton = () => myButton.current.click();

  return (
    <button ref={myButton} onClick={clickMyButton}>
      refButton
    </button>
  );
};

export default UseRefExample;
