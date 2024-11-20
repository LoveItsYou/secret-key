import SiteViews from "react-siteviews";
import { memo } from "react";
import loader from "../assets/loader.webp";
import { toast, Bounce } from "react-toastify";

const ViewsCounter = () => {
  const visitedToast = () =>
    toast("Welcome to Secret-Key app", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return (
    <div className="flex justify-center items-center gap-1 text-[rgba(var(--text))] text-sm font-bold">
      <span>App Visited:</span>
      <SiteViews
        projectName="my-project"
        visited={() => {
          visitedToast();
        }}
        // getData={(value) => {
        //   console.log(value);
        // }}
        refresh="10"
        placeHolder={<img src={loader} alt="loader" className="size-[17px]" />}
      />
    </div>
  );
};

export default memo(ViewsCounter);
