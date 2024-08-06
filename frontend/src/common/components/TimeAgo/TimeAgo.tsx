import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

interface TimeAgoProps {
  timestamp: string;
}

export const adjustUniversalTzToUserTz = (time: Date): Date => {
  const timezoneOffset = time.getTimezoneOffset();
  const localTime = new Date(time.getTime() - timezoneOffset * 60 * 1000);
  return localTime;
};

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");
  const [checkTime, setCheckTime] = useState<number>(1000);

  useEffect(() => {
    const calculateTimeAgo = () => {
      // console.log("now", new Date());
      const localNow = adjustUniversalTzToUserTz(new Date());
      // console.log("localNow", localNow);
      console.log("past", new Date(timestamp));
      const localPast = adjustUniversalTzToUserTz(new Date(timestamp));
      console.log("localPast", localPast);
      const diff = localNow.getTime() - localPast.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      if (years > 0) {
        setCheckTime(9999);
        return `${years} year${years > 1 ? "s" : ""} ago`;
      }
      if (months > 0) {
        setCheckTime(1000 * 60 * 60 * 24 * 30);
        return `${months} month${months > 1 ? "s" : ""} ago`;
      }
      if (days > 0) {
        setCheckTime(1000 * 60 * 60 * 24);
        return `${days} day${days > 1 ? "s" : ""} ago`;
      }
      if (hours > 0) {
        setCheckTime(1000 * 60 * 60);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      }
      if (minutes > 0) {
        setCheckTime(1000 * 60);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      }
      setCheckTime(1000 * 60);
      return `seconds ago`;
    };

    // const interval = setInterval(() => {
    //   setTimeAgo(calculateTimeAgo());
    // }, checkTime);

    setTimeAgo(calculateTimeAgo());

    // return () => clearInterval(interval);
  }, [checkTime, timestamp]);

  return <span style={{ color: "grey", fontStyle: "italic" }}>{timeAgo}</span>;
};

export default TimeAgo;
