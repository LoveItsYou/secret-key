import classes from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Layout;
