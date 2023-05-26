import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import bg from "../assets/bg-countdown.jpg";
import Time from "../components/time";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Countdown = () => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  function countdown() {
    let current = new Date();
    let deadline = new Date("2023-05-28T13:30:00");

    let totalSeconds = (deadline.getTime() - current.getTime()) / 1000;

    let timer = setInterval(() => {
      let remainingHours = Math.floor(totalSeconds / 3600);
      let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      let remainingSeconds = Math.floor(totalSeconds % 60);
      setHour(remainingHours);
      setMinute(remainingMinutes);
      setSecond(remainingSeconds);

      if (totalSeconds <= 0) {
        clearInterval(timer);
        console.log("Countdown complete!");
      }

      totalSeconds--;
    }, 1000);
  }
  useEffect(() => {
    countdown();
  });

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
            <Time text={hour} unit="Hours" />
            <Time text={minute} unit="Minutes" />
            <Time text={second} unit="Seconds" />
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
