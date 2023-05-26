import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const Time: FC<{
  text: number;
  unit: string;
}> = ({ text, unit }) => {
  const checkText = text?.toString();

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Typography
        sx={{ fontSize: "15rem", color: "white", fontWeight: "bold" }}
      >
        {checkText?.length == 1 ? "0" + text : text}
        {unit != "Seconds" ? ":" : ""}
      </Typography>
      <Typography
        sx={{
          fontSize: "2rem",
          color: "white",
          position: "relative",
          top: "-5rem",
          left: "-1em",
        }}
      >
        {unit}
      </Typography>
    </Stack>
  );
};

export default Time;
