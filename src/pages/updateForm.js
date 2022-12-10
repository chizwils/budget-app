import { useState } from "react";

export const UpdateForm = ({ currentState, onChange, update }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      {isVisible ? (
        <>
          <input
            onChange={onChange}
            placeholder={`update $${currentState}`}
            type="text"
          />
          <button onClick={update}>update</button>
          <button onClick={toggle}>Done</button>
        </>
      ) : (
        <button onClick={toggle}>edit</button>
      )}
    </div>
  );
};
