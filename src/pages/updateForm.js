import { useState } from "react";

// enum kind={

// }

export const UpdateForm = ({
  currentState,
  onChange,
  update,
  deleteThis,
  kind,
  itemName,
}) => {
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
            name="initialAmountOwed"
          />
          {kind === "debt" ? (
            <input
              onChange={onChange}
              placeholder={`update $${itemName}`}
              type="text"
              name="name"
            />
          ) : null}
          <button onClick={update}>update</button>
          <button onClick={toggle}>Done</button>
        </>
      ) : (
        <div>
          ${currentState}
          <button onClick={toggle}>edit</button>
          <button onClick={deleteThis}>delete</button>
        </div>
      )}
    </div>
  );
};
