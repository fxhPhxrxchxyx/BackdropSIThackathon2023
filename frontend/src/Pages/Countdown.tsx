import { Box, Container, Stack, Typography } from "@mui/material";
import Time from "../components/time";
import {useEffect, useMemo, useState} from "react";
import logo from "../assets/1.png";
import fire from "../assets/fire.gif"
import axios from "axios";
import {Buffer} from "buffer";

interface Time {
	hour: number;
	minute: number;
	second: number;
}

const timeMax = 29 * 60 * 60;

const Countdown = () => {
	const [bg, setBg] = useState<string>(
		"https://cdn.cshack24.thistine.com/rand"
	);
	const [remainingTime, setRemainingTime] = useState<Time>({
		hour: 0,
		minute: 0,
		second: 0,
	});

	const seconds = useMemo(()=> (remainingTime.hour * 60 *60) + (remainingTime.minute*60) + remainingTime.second,
		[remainingTime.hour, remainingTime.minute, remainingTime.second])

	const percent = useMemo(()=> seconds >timeMax ? 1 :  1 - (timeMax-seconds)/timeMax, [seconds])


	const initializeCountdownTimer = () => {
		const currentTimestamp = new Date().getTime();
		const deadlineTimestamp = new Date("2024-06-02T13:30:00").getTime();
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
	const fetchImage = () => {
		setInterval(() => {
			axios.get("https://cdn.cshack24.thistine.com/rand?salt=" + Math.random(), {
				responseType:"arraybuffer"
			}).then((res)=> {
				setBg("data:image/png;base64,"+Buffer.from(res.data, "binary").toString("base64"))
			})
			// setBg("https://cdn.cshack24.thistine.com/rand?salt=" + Math.random());
			console.log(111);
		}, 10000);
	};

	useEffect(() => {
		fetchImage();
		const timer = initializeCountdownTimer();
		return () => clearInterval(timer);
	}, []);

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				backgroundColor:"black",
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
					backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the color and opacity as needed
					zIndex: "1",
				},
			}}
		>
			<Box sx={{ backgroundColor: "white", padding: "10px 10px", position:"fixed", bottom:10,right:10,display:"flex", justifyContent:"center",alignItems:"center", gap:2, flexDirection:"column"}}>
				<Typography>Hackathon Services</Typography>
				<img
					src={"https://utils.thistine.com/api/qr/v1/make?text=https%3A%2F%2Flinktr.ee%2Fthistine&size=300&disableBorder=true"}
					style={{ height: "120px",width:"120px", background: "color" }}
				></img>
			</Box>
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
						<Time text={remainingTime.hour} unit="Hours" />
						<Time text={remainingTime.minute} unit="Minutes" />
						<Time text={remainingTime.second} unit="Seconds" />
					</Stack>
					<Stack direction={"row"} alignItems={"center"} gap={5}>
						{/*<Avatar*/}
						{/*	alt="SIT Hackathon logo"*/}
						{/*	src={logo}*/}
						{/*	sx={{ width: 150, height: 150, zIndex: "100" }}*/}
						{/*/>*/}
						<Box position={"relative"} >
							<img src={fire} alt="fire" width={150} style={{position:"absolute",
								mixBlendMode:"screen",
								left:-110,
								transform: `translate(-50%,0) scale(${percent > 0.5 ? percent : 0.5})`,
								top:-30,
								opacity: percent,
								transition: "transform 0.5s, opacity 0.5s",
								rotate: "-90deg"}} />
							<img src={logo} alt="SIT Hackathon logo" width={150} />
						</Box>
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
