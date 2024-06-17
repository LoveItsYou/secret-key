import { useEffect } from "react";
import { useState } from "react";

const useFetch = (API, method, headers) => {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(API, {
          method: method,
          headers: { ...headers },
        });

        if (response.status === 200) {
          const data = await response.json();
          setLoading(false);
          setResult(data);
        } else {
          throw new Error("There was an Error");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  return {
    result,
    error,
    loading,
  };
};

export default useFetch;
