import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import bg from "../assets/bg.png";
import { payload } from "../utils/payload";
import Marquee from "react-fast-marquee";
const Backdrop = () => {
  let queue = Boolean(payload.now_playing.queue_by);

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
            filter: "blur(10px)",
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
              top: "8%",
              width: "100%",
              left: "5%",
              fontFamily: "open sans",
              fontWeight: "bold",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            variant="h1"
            color="white"
          >
            {payload.time}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: "20%",
              width: "100%",
              left: "6%",
              fontFamily: "open sans",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            variant="h4"
            color="white"
          >
            {payload.date}
          </Typography>
          <Stack>
            <img
              src={payload.weather.icon}
              style={{
                position: "absolute",
                top: "10%",
                left: "23%",
                width: "3%",
              }}
            ></img>
            <Typography
              sx={{
                position: "absolute",
                top: "15%",
                width: "100%",
                left: "23%",
                fontFamily: "open sans",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              variant="h6"
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
              top: "30%",
              left: "6%",
              width: "6px",
              height: "85px",
              background: "white",
              borderRadius: "10px",
            }}
          ></div>
          <Stack>
            <Typography
              sx={{
                position: "absolute",
                top: "30%",
                left: "7%",
              }}
              variant="h4"
              color={"white"}
            >
              {payload.current_event.title}
            </Typography>
            <Typography
              sx={{ position: "absolute", top: "35%", left: "7%" }}
              variant="h6"
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
              top: "40%",
              left: "6%",
              width: "6px",
              height: "90px",
              background: "white",
              borderRadius: "10px",
            }}
          ></div>
          <Stack>
            <Typography
              sx={{
                position: "absolute",
                top: "40%",
                left: "7%",
              }}
              variant="body1"
              color={"white"}
            >
              Up next
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: "43%",
                left: "7%",
              }}
              variant="h6"
              color={"white"}
            >
              {payload.next_event.title}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: "46%",
                left: "7%",
              }}
              variant="body1"
              color={"white"}
            >
              {payload.next_event.time}
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "500px",
            height: "200px",
            position: "absolute",
            bottom: "10px",
            right: "30px",
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            padding: "15px 20px",
          }}
        >
          <Typography variant="h6" color={"white"} mb="10px">
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
                  {payload.now_playing.title}.
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
