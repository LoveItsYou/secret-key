import classes from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <div className={classes.footer}>
      <div>
        A simple key generator App by this API -{" "}
        <a href="https://api.codeababil.com/secret-key" target="_blank">
          <span>https://api.codeababil.com/secret-key</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
