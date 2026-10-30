import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "America/Chicago",
});

// A real clock in the lab's timezone (Houston, US Central). Decorative
// instrument readout, so it is aria-hidden and never announced each second.
export default function Clock({ className = "" }) {
  const [t, setT] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span aria-hidden="true" className={`tnum ${className}`}>
      {t}
    </span>
  );
}
