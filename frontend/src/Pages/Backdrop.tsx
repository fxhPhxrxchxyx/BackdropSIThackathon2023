import { Box } from "@mui/material";
import bg from "../assets/bg.png";
const Backdrop = () => {
  return (
    <Box
      sx={{
        width: "1920px",
        height: "1080px",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        filter: "blur(10px)",
      }}
    />
  );
};

export default Backdrop;
