import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const Time: FC<{
  text: number;
  unit: string;
  isLight?: boolean;
}> = ({ text, unit, isLight }) => {
  const checkText = text?.toString();

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Typography
          className={isLight ? "lightPlause" :""}
        sx={{ fontSize: "15rem", color: "white", fontWeight: "bold", zIndex:"100" }}
      >
        {checkText?.length == 1 ? "0" + text : text}
        {unit != "Seconds" ? ":" : ""}
      </Typography>
      <Typography
          className={isLight? "lightPlause" :""}
        sx={{
          fontSize: "2rem",
          color: "white",
          position: "relative",
          top: "-5rem",
          left: "-1em",
          zIndex:"100"
        }}
      >
        {unit}
      </Typography>
    </Stack>
  );
};

export default Time;
