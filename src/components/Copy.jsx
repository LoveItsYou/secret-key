import { useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

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

const Copy = ({ text, loading, error, ...rest }) => {
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
      }, 1000);
    }

    (loading || error) &&
      dispatch({
        type: "RESET_COPY",
      });

    return () => clearInterval(intervalId);
  }, [state.text, state.copyClicked, loading, error]);

  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: "COPY",
        })
      }
      className={`px-3 rounded-md select-none ${
        error && "cursor-not-allowed"
      } ${loading && "cursor-wait"}`}
      disabled={loading || error}
      {...rest}
    >
      {state.copyClicked ? (
        <span className="inline-block relative before:content-['Copied'] before:absolute before:left-[25px] before:top-[-20px] before:bg-[rgba(var(--primary),0.5)] before:text-[rgba(var(--mark))] before:p-2 before:rounded-lg">
          <FontAwesomeIcon
            icon={faCopy}
            className={`${
              state.copyClicked
                ? "font-extrabold text-[rgba(var(--mark),1)] text-2xl "
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
