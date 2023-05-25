import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import bg from "../assets/bg.png";
import { payload } from "../utils/payload";
const Backdrop = () => {
  return (
    <Box>
      <Card>
        <CardMedia
          sx={{
            position: "relative",
            width: "1920px",
            height: "1080px",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "blur(10px)",
          }}
        />
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
              src={payload.wheather.icon}
              style={{
                position: "absolute",
                top: "10%",
                left: "20%",
                width: "3%",
              }}
            ></img>
            <Typography
              sx={{
                position: "absolute",
                top: "15%",
                width: "100%",
                left: "20%",
                fontFamily: "open sans",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              variant="h6"
              color="white"
            >
              {payload.wheather.temp}° • {payload.wheather.status}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default Backdrop;
