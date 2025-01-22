"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className=" flex justify-center p-10">
        <CircularProgressbar
            value={percentage}
            text={`${percentage}% Gastado`}
            styles={buildStyles({
                textColor: percentage>=100? '#DC2626': "#F59E0B",
                pathColor: percentage>=100? '#DC2626': "#F59E0B",
                trailColor: "#D6D6D6",
                textSize: "8",
            })}       
        />
    </div>
  )
}
