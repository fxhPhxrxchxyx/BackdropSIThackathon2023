import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import bg from "../assets/bg.png";
import { payload } from "../utils/payload";
import Marquee from "react-fast-marquee";
import logo from "../assets/1.png";
import light1 from "../assets/light1.png";
import light2 from "../assets/light2.png";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
const Backdrop = () => {
  let queue = Boolean(payload.now_playing.queue_by);
  const [bg, setBg] = useState<string>(
    "https://api.cshack.site/api/image/rand"
  );
  const fetchImage = () => {
    setInterval(() => {
      setBg("https://api.cshack.site/api/image/rand?salt=" + Math.random());
      console.log(111);
    }, 10000);
  };

  useEffect(() => {
    fetchImage();
  }, []);
  const ws = "wss://api.cshack.site/ws/backdrop";
  useWebSocket(ws, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });
  return (
    <Box>
      <Card>
        <CardMedia
          sx={{
            position: "relative",

            width: "100%",
            height: "100vh",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px)",
          }}
        />
        <div
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            position: "absolute",
            inset: "0px",
          }}
        ></div>
        <Stack>
          <Typography
            sx={{
              position: "absolute",
              top: "50px",
              width: "100%",
              left: "90px",
              fontFamily: "open sans",
              fontWeight: "bold",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              fontSize: "150px",
            }}
            color="white"
          >
            {payload.time}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: "230px",
              width: "100%",
              left: "130px",
              fontFamily: "open sans",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            variant="h3"
            color="white"
          >
            {payload.date}
          </Typography>
          <Stack>
            <img
              src={payload.weather.icon}
              style={{
                position: "absolute",
                top: "100px",
                left: "520px",
                width: "5%",
              }}
            ></img>
            <Typography
              sx={{
                position: "absolute",
                top: "180px",
                width: "100%",
                left: "520px",
                fontFamily: "open sans",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              variant="h4"
              color="white"
            >
              {payload.weather.temp}° • {payload.weather.status}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <div
            style={{
              position: "absolute",
              top: "340px",
              left: "108px",
              width: "6px",
              height: "105px",
              background: "white",
              borderRadius: "10px",
            }}
          ></div>
          <Stack>
            <Typography
              sx={{
                position: "absolute",
                top: "340px",
                left: "130px",
              }}
              variant="h3"
              color={"white"}
            >
              {payload.current_event.title}
            </Typography>
            <Typography
              sx={{ position: "absolute", top: "400px", left: "130px" }}
              variant="h4"
              color={"white"}
            >
              {payload.current_event.time}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <div
            style={{
              position: "absolute",
              top: "480px",
              left: "108px",
              width: "6px",
              height: "105px",
              background: "white",
              borderRadius: "10px",
            }}
          ></div>
          <Stack>
            <Typography
              sx={{
                position: "absolute",
                top: "480px",
                left: "130px",
              }}
              variant="h5"
              color={"white"}
            >
              Up next
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: "520px",
                left: "130px",
              }}
              variant="h5"
              color={"white"}
            >
              {payload.next_event.title}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: "550px",
                left: "130px",
              }}
              variant="h6"
              color={"white"}
            >
              {payload.next_event.time}
            </Typography>
            <img
              style={{
                position: "absolute",
                top: "705px",
                left: "100px",
                width: "85px",
                height: "85px",
              }}
              className="lightMove"
              src={light2}
            ></img>
            <img
              style={{
                position: "absolute",
                top: "720px",
                left: "115px",
                width: "60px",
                height: "60px",
              }}
              className="lightMove"
              src={light1}
            ></img>
            <img
              style={{
                position: "absolute",
                top: "620px",
                left: "140px",
                width: "150px",
                height: "150px",
              }}
              src={logo}
            ></img>
          </Stack>
        </Stack>
        <Typography
          sx={{
            position: "absolute",
            top: "580px",
            left: "1020px",
          }}
          variant="h5"
          color={"white"}
        >
          You can queue songs via{" "}
          <p
            style={{
              display: "inline",
              borderBottom: "2px solid #f04f7f",
            }}
          >
            music.cshack.site
          </p>
        </Typography>
        <Box
          sx={{
            width: "500px",
            height: "200px",
            position: "absolute",
            bottom: "80px",
            right: "90px",
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            padding: "15px 20px",
          }}
        >
          <Typography variant="h5" color={"white"} mb="10px">
            Now Playing
          </Typography>
          <Stack direction="row" gap="30px">
            <Box
              sx={{
                width: "95px",
                height: "95px",
              }}
            >
              <img
                src={payload.now_playing.cover_url}
                style={{
                  width: "100%",
                  backgroundSize: "cover",
                  borderRadius: "15px",
                }}
              ></img>
            </Box>
            <Stack direction="column">
              <Typography
                variant="h5"
                color={"white"}
                sx={{
                  width: "350px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  paddingRight: "10px",
                }}
              >
                <Marquee>
                  {payload.now_playing.title}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Marquee>
              </Typography>

              <Typography variant="h6" color={"white"}>
                {payload.now_playing.artist}
              </Typography>
              <Stack direction="row" gap="10px">
                <Typography variant="h6" color={"#D1D1D1"}>
                  {queue == true ? "Queued by" : ""}
                </Typography>

                <Stack>
                  <Typography
                    variant="h6"
                    color={"white"}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {queue == true ? `${payload.now_playing.queue_by}` : ""}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default Backdrop;
