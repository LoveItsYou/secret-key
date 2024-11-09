import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import api_png from "../assets/api.png";
import classes from "../styles/SecretKey.module.css";
import loader from "../assets/loader.webp";
import Copy from "./Copy";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import ViewsCounter from "./ViewsCounter";

const SecretKey = () => {
  const [isCall, setIsCAll] = useState(true);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [copyCount, setCopyCount] = useState({});

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

  useEffect(() => {
    const temp = {};
    if (result.key) {
      Object.keys(result.key).forEach((type) => {
        if (!temp[type]) {
          temp[type] = 0;
        }
      });
    }

    setCopyCount(temp);
  }, [result]);

  const keyGenerateHandler = () => {
    setIsCAll(true);
  };

  const handleCopyCount = (key) => {
    setCopyCount((prevState) => {
      return {
        ...prevState,
        [key]: prevState[key] + 1,
      };
    });
  };

  return (
    <div
      className={`${classes.secretKey} ${
        loading && "cursor-wait"
      } mx-auto shadow-md shadow-[rgba(var(--primary))]`}
    >
      <div className={classes.header}>
        <div
          style={{ fontSize: "20px" }}
          className="select-none flex justify-between"
        >
          <a href="https://devababil.com" target="_blank" title="Website">
            <div className="flex items-center gap-1">
              🤍
              <div className="text-sm text-[rgba(var(--text))]">
                {" "}
                Mon Jun 17 2024, 6:53:11PM{" "}
              </div>
              <ViewsCounter />
            </div>
          </a>
        </div>
        <h2 className="select-none mr-[280px]">Secret Key Generator</h2>

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
      {initialLoader && (
        <div className="w-full h-[350px] flex items-center justify-center flex-col">
          <img className="w-[110px] h-auto block max-w-full" src={loader} />
          <span className="font-bold text-[rgba(var(--mark),0.8)]">
            Please wait...
          </span>
        </div>
      )}
      <div>
        {!initialLoader && (
          <>
            <table className={classes.table}>
              <tbody>
                {/* Table Header */}
                <tr className={classes.tableHeader}>
                  <th className="select-none">Type</th>
                  <th className="select-none">Key</th>
                  <th className="select-none">Copy</th>
                  <th className="select-none">Count</th>
                  <th className="select-none">Length</th>
                </tr>

                {/* Secret Key */}
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
                            {error && !loading && (
                              <div className={classes.error}>
                                Error to generate key
                              </div>
                            )}
                            <div className="flex justify-between px-1">
                              {!loading &&
                              !error &&
                              result &&
                              result.key[keyName]
                                ? result.key[keyName]
                                    .split("")
                                    .map((char, i) => (
                                      <span key={i} className="italic">
                                        {char}
                                      </span>
                                    ))
                                : null}
                            </div>
                          </td>

                          {/* Copy to clipboard  */}
                          <td
                            className={`${
                              classes.copy
                            } bg-[rgba(var(--primary),0.4)] text-center ${
                              loading ? "opacity-60" : ""
                            } !w-[90px]`}
                          >
                            <Copy
                              text={result.key[keyName]}
                              loading={loading}
                              error={error}
                              copyCount={() => handleCopyCount(keyName)}
                            />
                          </td>

                          <td
                            className={`${classes.copyCount} text-center border-t border-[rgba(var(--mark),0.3)] select-none w-[110px]`}
                          >
                            <span className="!w-[20px] inline-block">
                              {loading && (
                                <img src={loader} className="max-w-full" />
                              )}
                              <span
                                className={`${
                                  copyCount[keyName] > 0 &&
                                  copyCount[keyName] < 3
                                    ? "text-[rgba(var(--mark))] font-bold"
                                    : copyCount[keyName] >= 3
                                    ? "text-[yellow]"
                                    : ""
                                }`}
                              >
                                {!loading && copyCount[keyName]}
                              </span>
                            </span>
                          </td>

                          {/* Key length */}
                          <td
                            className={`${classes.keyLength}  select-none border-t border-[rgba(var(--mark),0.3)]`}
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
              className={`${classes.button} select-none ${
                loading && "opacity-60 cursor-wait"
              }`}
              disabled={loading}
              onClick={() => {
                keyGenerateHandler();
                setCopyCount({});
              }}
            >
              Generate New Key
            </button>
          </>
        )}
      </div>
      <div className="inline-block text-[rgb(var(--text))]  opacity-[0.55]">
        {Object.keys(copyCount).filter((keyName) => copyCount[keyName] > 3)
          .length > 0 && (
          <div className="px-2 py-3">
            <div>
              <span className="text-[yellow] px-1">
                <FontAwesomeIcon icon={faWarning} />
              </span>
              <span className="font-bold">Warning</span>
              {" : "}
              {Object.keys(copyCount).map(
                (keyName) => copyCount[keyName] > 3 && `${keyName}, `
              )}
              <span>
                - Copied more than <span className="text-[yellow]">3</span>{" "}
                times. We recomand to use a secret key only for one purpose.
              </span>
            </div>
            <div className="mt-1">
              <span className="text-[yellow] px-1">
                <FontAwesomeIcon icon={faWarning} />
              </span>
              <span className="font-bold">Warning : </span>
              <span>
                If you need multiple secret key. you can generate new secret key
                by pressing &apos;Generate New Key&apos; button.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretKey;
