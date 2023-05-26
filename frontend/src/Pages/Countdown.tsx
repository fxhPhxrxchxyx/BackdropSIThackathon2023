import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import bg2 from "../assets/bg-countdown.jpg";
import bg from "../assets/bg.png";
import Time from "../components/time";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";

const Countdown = () => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [bg, setBg] = useState<string>("https://api.cshack.site/api/image/rand");
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
  const fetchImage = () => {
    setInterval(() => {
      setBg("https://api.cshack.site/api/image/rand?salt=" + Math.random());
      console.log(111);
    }, 10000);
  };

  useEffect(() => {
    countdown();
    fetchImage();
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity as needed
          zIndex: "1",
        },
      }}
    >
      <Container sx={{ height: "100%" }}>
        <Stack
          justifyContent="center"
          alignItems={"center"}
          sx={{ height: "100%" }}
        >
          <Typography
            sx={{
              color: "white",
              position: "relative",
              top: "3rem",
              zIndex: "100",
            }}
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
              sx={{ width: 150, height: 150, zIndex: "100" }}
            />
            <Typography sx={{ color: "white", zIndex: "100" }} variant="h5">
              SIT Hackathon 2023
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Countdown;
