import SiteViews from "react-siteviews";
import { memo, useEffect } from "react";
import loader from "../assets/loader.webp";

const ViewsCounter = () => {
  useEffect(() => {
    console.log("ViewsCounter rendred");
  }, []);
  return (
    <div className="flex justify-center items-center gap-1 text-[rgba(var(--text))] text-sm font-bold">
      <span>App Visited:</span>
      <SiteViews
        projectName="my-project"
        visited={() => {
          alert("Website visited");
        }}
        getData={(value) => {
          console.log(value);
        }}
        refresh="10"
        placeHolder={<img src={loader} alt="loader" className="size-[17px]" />}
      />
    </div>
  );
};

export default memo(ViewsCounter);
