import { useEffect, useReducer } from "react";

const initialState = {
  text: null,
  copyClicked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TEXT": {
      return {
        ...state,
        text: action.value,
      };
    }

    case "COPY": {
      return {
        ...state,
        copyClicked: true,
      };
    }

    case "RESET_COPY": {
      return {
        ...state,
        copyClicked: false,
      };
    }
  }
};

const Copy = ({ text, loading, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (text) {
      dispatch({
        type: "LOAD_TEXT",
        value: text,
      });
    }
  }, [text]);

  useEffect(() => {
    let intervalId;
    const handleCopy = () => {
      let copyText = document.createElement("input");
      copyText.value = state.text;
      copyText.select();
      navigator.clipboard.writeText(copyText.value);
    };

    if (state.copyClicked) {
      handleCopy();
      intervalId = setTimeout(() => {
        dispatch({
          type: "RESET_COPY",
        });
      }, 3000);
    }

    loading &&
      dispatch({
        type: "RESET_COPY",
      });

    return () => clearInterval(intervalId);
  }, [state.text, state.copyClicked, loading]);

  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: "COPY",
        })
      }
      className="bg-[rgba(var(--primary),0.5)] px-2 rounded-md select-none"
      {...rest}
    >
      {state.copyClicked ? (
        <span
          className={`${
            state.copyClicked ? "font-bold text-[rgba(var(--mark),1)]" : ""
          }`}
        >
          Copied
        </span>
      ) : (
        "Copy"
      )}
    </button>
  );
};

export default Copy;
