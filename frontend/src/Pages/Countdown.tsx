import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import bg from "../assets/bg-countdown.jpg";
import Time from "../components/time";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

interface Time {
  hour: number;
  minute: number;
  second: number;
}

const Countdown = () => {
  const [remainingTime, setRemainingTime] = useState<Time>({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const initializeCountdownTimer = () => {
    const currentTimestamp = new Date().getTime();
    const deadlineTimestamp = new Date("2023-05-28T13:30:00").getTime();
    let remainingTimeInSecond = Math.floor(
      (deadlineTimestamp - currentTimestamp) / 1000
    );
    const timer = setInterval(() => {
      setRemainingTime({
        hour: Math.floor(remainingTimeInSecond / 3600),
        minute: Math.floor((remainingTimeInSecond % 3600) / 60),
        second: remainingTimeInSecond % 60,
      });

      if (remainingTimeInSecond <= 0) {
        clearInterval(timer);
        console.log("Countdown complete!");
      }
      remainingTimeInSecond -= 1;
    }, 1000);
    return timer;
  };

  useEffect(() => {
    const timer = initializeCountdownTimer();
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container sx={{ height: "100%" }}>
        <Stack
          justifyContent="center"
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <Typography
            sx={{ color: "white", position: "relative", top: "3rem" }}
            variant="h4"
          >
            Hackathon Period Remaining
          </Typography>
          <Stack direction={"row"}>
            <Time text={remainingTime.hour} unit="Hours" />
            <Time text={remainingTime.minute} unit="Minutes" />
            <Time text={remainingTime.second} unit="Seconds" />
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Avatar
              alt="SIT Hackathon logo"
              src={logo}
              sx={{ width: 150, height: 150 }}
            />
            <Typography sx={{ color: "white" }} variant="h5">
              SIT Hackathon 2023
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Countdown;
