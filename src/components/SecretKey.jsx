import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
            setError(false);
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
    <div className={classes.secretKey}>
      <div className={classes.header}>
        <div style={{ fontSize: "20px" }}>❤️</div>
        <h2>Secret Key Generator</h2>
        <div className={classes.link}>
          <a href="https://devababil.com/DevAbabil" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>

      <table className={classes.table} style={{ opacity: result.key && 1 }}>
        <tbody>
          <tr className={classes.tableHeader}>
            <th>Type</th>
            <th>Key</th>
          </tr>
          {result.key && (
            <>
              {Object.keys(result.key).map((keyName) => {
                return (
                  <tr key={keyName}>
                    <td className={classes.keyName}>{keyName}</td>
                    <td className={classes.key}>
                      {loading && (
                        <div
                          className={`${classes.loading}`}
                          style={{ display: loading && "block" }}
                        >
                          {loading && <img src={loader} />}
                        </div>
                      )}
                      {error && "Error to generate key"}
                      {!loading && !error && result && result.key[keyName]}
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      <button className={classes.button} onClick={keyGenerateHandler}>
        Generate New Key
      </button>
    </div>
  );
};

export default SecretKey;
