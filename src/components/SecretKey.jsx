import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import api_png from "../assets/api.png";

import classes from "../styles/SecretKey.module.css";
import loader from "../assets/loader.webp";

const SecretKey = () => {
  const [isCall, setIsCAll] = useState(true);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);

  useEffect(() => {
    if (isCall) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetch("https://api.codeababil.com/secret-key", {
            method: "GET",
            headers: { "content-type": "application/json" },
          });

          if (response.status === 200) {
            const data = await response.json();
            setLoading(false);
            setError(false);
            setResult(data);
            setInitialLoader(false);
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
        <div style={{ fontSize: "20px" }}>
          <a href="https://devababil.com" target="_blank" title="Website">
            🤍
          </a>
        </div>
        <h2>Secret Key Generator</h2>

        <ul className={classes.link}>
          <li>
            <a href="https://github.com/DevAbabil" target="_blank" title="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a href="https://api.codeababil.com/secret-key" target="_blank" title="API - URL">
              <img src={api_png} />
            </a>
          </li>
        </ul>
      </div>
      {initialLoader && <img className={classes.initialLoader} src={loader} />}
      {!initialLoader && (
        <>
          <table className={classes.table}>
            <tbody>
              <tr className={classes.tableHeader}>
                <th>Type</th>
                <th>Key</th>
                <th>Length</th>
              </tr>
              {result.key && (
                <>
                  {Object.keys(result.key).map((keyName) => {
                    return (
                      <tr key={keyName}>
                        <td className={classes.keyName}>{keyName}</td>
                        <td className={classes.key} title={keyName}>
                          {loading && (
                            <div className={`${classes.loading}`} style={{ display: loading && "block" }}>
                              {loading && <img src={loader} />}
                            </div>
                          )}
                          {error && <div className={classes.error}>Error to generate key</div>}
                          {!loading && !error && result && result.key[keyName]}
                        </td>
                        <td className={classes.keyLength} title={`${keyName} Length`}>
                          {loading && <img src={loader} />}
                          {!loading && !error && result && result.key[keyName].toString().length}
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
        </>
      )}
    </div>
  );
};

export default SecretKey;
