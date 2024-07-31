import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import api_png from "../assets/api.png";
import classes from "../styles/SecretKey.module.css";
import loader from "../assets/loader.webp";
import Copy from "./Copy";

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
        <div style={{ fontSize: "20px" }} className="select-none">
          <a href="https://devababil.com" target="_blank" title="Website">
            🤍
          </a>
        </div>
        <h2 className="select-none">Secret Key Generator</h2>

        <ul className={`${classes.link} select-none`}>
          <li>
            <a
              href="https://github.com/DevAbabil"
              target="_blank"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a
              href="https://api.codeababil.com/secret-key"
              target="_blank"
              title="API - URL"
            >
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
                <th className="select-none">Type</th>
                <th className="select-none">Key</th>
                <td></td>
                <th className="select-none">Length</th>
              </tr>
              {result.key && (
                <>
                  {Object.keys(result.key).map((keyName) => {
                    return (
                      <tr key={keyName}>
                        <td
                          className={`${classes.keyName} select-none font-bold`}
                        >
                          {keyName}
                        </td>
                        <td
                          className={`${classes.key} bg-[rgba(var(--primary),0.4)]`}
                          title={keyName}
                        >
                          {loading && (
                            <div
                              className={`${classes.loading}`}
                              style={{ display: loading && "block" }}
                            >
                              {loading && <img src={loader} />}
                            </div>
                          )}
                          {error && (
                            <div className={classes.error}>
                              Error to generate key
                            </div>
                          )}
                          <div className="flex justify-between px-1">
                            {!loading && !error && result && result.key[keyName]
                              ? result.key[keyName]
                                  .split("")
                                  .map((char, i) => <span key={i}>{char}</span>)
                              : null}
                          </div>
                        </td>
                        <td
                          className={`${classes.keyLength} ${
                            loading ? "opacity-60" : ""
                          } !w-[90px]`}
                        >
                          <Copy
                            text={result.key[keyName]}
                            disabled={loading}
                            loading={loading}
                          />
                        </td>
                        <td
                          className={`${classes.keyLength}  select-none`}
                          title={`${keyName} Length`}
                        >
                          {loading && <img src={loader} />}
                          {!loading &&
                            !error &&
                            result &&
                            result.key[keyName].toString().length}
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
          <button
            className={`${classes.button} select-none`}
            onClick={keyGenerateHandler}
          >
            Generate New Key
          </button>
        </>
      )}
    </div>
  );
};

export default SecretKey;
