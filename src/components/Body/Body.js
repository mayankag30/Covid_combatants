import React from "react";
import "./Body.css";
import Analysis from "../Analysis/Analysis";
import Report from "../Report/Report";

function Body(props) {
  return (
    <div className="body">
      <div className="body__data">
        <Report title="1st Dose" value={12422} bg="#A0937D" />
        <Report title="2nd Dose" value={23421} bg="#F2EDD7" />
        <Report title="Vac Rate" value={43245} bg="#1EAE98" />
      </div>
      <div className="body__predict">
        <Analysis />
        {/* <img
          alt="graph"
          src="https://cdn.corporatefinanceinstitute.com/assets/line-graph.jpg"
        /> */}
      </div>
    </div>
  );
}

export default Body;
