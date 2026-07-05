import React, { useEffect, useState } from "react";

const local_ts = new Date();

const openHour = {
    'day':1, // monday
    'hours':17,
}

const closingHour = {
    'day':4, // thursday
    'hours':15,
}


export default function InfoOpenHours() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const local_day = local_ts.getDay();
    const local_time = local_ts.getHours();
    if (
        (local_day > openHour.day && local_day < closingHour.day)
    ) {
        setShow(false)
    }

    console.log(local_day)
    console.log(local_day > openHour.day && local_day < closingHour.day)
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="w-full bg-brand-rose-light text-brand-text-primary">
        Warning: Menu is not updated! Wait until next Mon at 17:00!
    </div>
  )
}