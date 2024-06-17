import { useState, useEffect } from "react";

import classes from "../styles/SecretKey.module.css";
import loader from "../assets/loader.webp";

const SecretKey = () => {
  const [isCall, setIsCAll] = useState(true);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isCall) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetch(
            "https://api.codeababil.com/secret-key",
            {
              method: "GET",
              headers: { "content-type": "application/json" },
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            setLoading(false);
            setResult(data);
          } else {
            throw new Error("There was an Error");
          }
        } catch (error) {
          setLoading(false);
          setError(true);
        }
        setIsCAll(false);
      })();
    }
  }, [isCall]);

  const keyGenerateHandler = () => {
    setIsCAll(true);
  };

  return (
    <>
      <h2 className={classes.heading}>Secret Key Generator</h2>
      <div className={classes.secretKey}>
        <ul style={{ opacity: result.key && 1 }}>
          {result.key && (
            <>
              {Object.keys(result.key).map((keyName) => {
                return (
                  <li key={keyName}>
                    <div className={classes.keyName}>{keyName}</div>
                    <div className={classes.key}>
                      {loading && (
                        <div
                          className={`${classes.loading}`}
                          style={{ display: loading && "block" }}
                        >
                          Loading...
                          {loading && <img src={loader} />}
                        </div>
                      )}
                      {error && "Error to generate key"}
                      {!loading && result && result.key[keyName]}
                    </div>
                  </li>
                );
              })}
            </>
          )}
          <button className={classes.button} onClick={keyGenerateHandler}>
            Generate New Key
          </button>
        </ul>
      </div>
    </>
  );
};

export default SecretKey;
