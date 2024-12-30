import { useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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

const Copy = ({ text, loading, error, copyCount, ...rest }) => {
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
    let timeoutId;
    const handleCopy = () => {
      let copyText = document.createElement("input");
      copyText.value = state.text;
      copyText.select();
      navigator.clipboard.writeText(copyText.value);
    };

    if (state.copyClicked) {
      handleCopy();
      timeoutId = setTimeout(() => {
        dispatch({
          type: "RESET_COPY",
        });
      }, 2500);
    }

    (loading || error) &&
      dispatch({
        type: "RESET_COPY",
      });

    return () => clearTimeout(timeoutId);
  }, [state.text, state.copyClicked, loading, error]);

  return (
    <button
      type="button"
      onClick={() => {
        copyCount();
        dispatch({
          type: "COPY",
        });
      }}
      className={`px-3 rounded-md select-none ${
        error && "cursor-not-allowed"
      } ${loading && "cursor-wait"}`}
      disabled={loading || error || state.copyClicked}
      {...rest}
    >
      {state.copyClicked ? (
        <span className="inline-block relative before:content-['Copied'] before:absolute before:left-[23px] before:top-[-29px] before:bg-[rgba(var(--primary),0.95)] before:font-extrabold before:text-[rgba(56,150,56)] before:p-2 before:rounded-lg before:border before:border-[rgba(var(--mark),0.2)]">
          <FontAwesomeIcon
            icon={faCheck}
            className={`${
              state.copyClicked
                ? "font-extrabold  text-2xl text-[rgba(56,150,56)]"
                : ""
            }`}
          />
        </span>
      ) : (
        <span>
          <FontAwesomeIcon icon={faCopy} className="text-xl" />
        </span>
      )}
    </button>
  );
};

export default Copy;
