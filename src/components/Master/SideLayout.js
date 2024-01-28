import { Fragment } from "react";
import UserDropDown from "./UserDropDown";

const SideLayout = (props) => {
  return (
    <Fragment>
      <div className="bg-slate-900 h-screen  text-white">
        <div className="container pt-5">
          <UserDropDown />
        </div>
        <div className="p-3">{props.children}</div>
      </div>
    </Fragment>
  );
};

export default SideLayout;
