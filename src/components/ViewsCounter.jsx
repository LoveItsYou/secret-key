import loader from "../assets/loader.webp";
import { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  count: 0,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SetCount": {
      return {
        ...state,
        loading: false,
        error: "",
        count: action.value,
      };
    }
    case "Error": {
      return {
        ...state,
        loading: false,
        error: action.value,
        count: 0,
      };
    }
  }
};

const ViewsCounter = () => {
  const [{ loading, count }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchId = setTimeout(() => {
      const fetchIntervalId = setInterval(() => {
        (async () => {
          try {
            const fetchData = await (
              await fetch(
                "https://mpvbackend.vercel.app/api/mpv/views?project=secret-key",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
            ).json();

            const {
              data: { count },
            } = fetchData;

            if (fetchData.status === 200 && fetchData.success === true) {
              dispatch({
                type: "SetCount",
                value: count,
              });
            } else {
              throw Error(fetchData.message);
            }
          } catch (error) {
            dispatch({
              type: "Error",
              value: error.message,
            });
          }
        })();
      }, 10000);

      location.pathname !== "/" ? clearInterval(fetchIntervalId) : null;
      clearTimeout(fetchId);
    }, 1200);
  }, []);

  return (
    <div className="text-[rgba(var(--text))] flex gap-x-1 text-sm font-bold ">
      <p>App views:</p>
      {!loading && count ? (
        <p> {count}</p>
      ) : (
        <img src={loader} className="size-[20px]" />
      )}
    </div>
  );
};

export default ViewsCounter;
