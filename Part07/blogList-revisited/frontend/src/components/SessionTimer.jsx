import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SessionTimer = ({ token }) => {
  const [secondsLeft, setSecondsLeft] = useState(null);
  const expTime = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (exception) {
      return null;
    }
  };

  useEffect(() => {
    if (!token) return;
    const decoded = expTime(token);
    // console.log(token)
    if (!decoded?.exp) return;

    const expiry = decoded.exp * 1000; // ms
    const updateTimeLeft = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));
      setSecondsLeft(diff);
    };

    updateTimeLeft(); // Initial call
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [token]);

  if (secondsLeft === null) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div>
      <span>
        Session expires in: {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

SessionTimer.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SessionTimer;
