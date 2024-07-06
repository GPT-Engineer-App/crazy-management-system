import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const TimeClock = ({ onClockIn, onClockOut }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [time, setTime] = useState(null);

  const handleClockIn = () => {
    const currentTime = new Date();
    setTime(currentTime);
    setClockedIn(true);
    onClockIn(currentTime);
  };

  const handleClockOut = () => {
    const currentTime = new Date();
    setTime(currentTime);
    setClockedIn(false);
    onClockOut(currentTime);
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Digital Time Clock</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-xl mb-4">
            {clockedIn ? `Clocked In: ${format(time, "PPpp")}` : "Not Clocked In"}
          </p>
          <Button onClick={clockedIn ? handleClockOut : handleClockIn}>
            {clockedIn ? "Clock Out" : "Clock In"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeClock;