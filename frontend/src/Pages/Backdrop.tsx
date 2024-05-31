import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import {Buffer} from 'buffer';
import Marquee from "react-fast-marquee";
import logo from "../assets/1.png";
import light1 from "../assets/light1.png";
import light2 from "../assets/light2.png";
// import qr from "../assets/linktree.png";
import { useEffect, useState } from "react";
import axios from "axios";

interface IState{
	time: string;
	whether: {
		icon: string;
		temp: number;
		status: string;
	};
	date: string;
	current_event: {
		title: string;
		time: string;
	}
	next_event: {
		title: string;
		time: string;
	};
	now_playing:{
		title: string;
		artist: string;
		cover_url: string;
		queue_by: string;
	}
}

const Backdrop = () => {
	// let queue = Boolean(payload.now_playing.queue_by);
	const [state, setState] = useState<IState | null>(null);
	const [bg, setBg] = useState<string>(
		"https://cdn.cshack24.thistine.com/rand"
	);
	const [time, setTime] = useState<{mintues:string, hours:string}>({
		mintues: new Date().getMinutes().toFixed(2).toString(),
		hours: new Date().getHours().toFixed(2).toString()
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTime({
				mintues: new Date().getMinutes().toFixed(2).toString(),
				hours: new Date().getHours().toFixed(2).toString()
			});
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

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
		axios.get("https://music.cshack24.thistine.com/api/backdrop/state").then((res) => {
			setState(res.data.data);
		});
		setInterval(() => {
			axios.get("https://music.cshack24.thistine.com/api/backdrop/state").then((res) => {
				setState(res.data.data);
			});
		}, 5000);
	}, []);

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
						filter: "blur(1px)",
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
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
							fontSize: "150px",
						}}
						color="white"
					>
						{time.hours}:{time.mintues}
					</Typography>
					<Typography
						sx={{
							position: "absolute",
							top: "240px",
							width: "100%",
							left: "90px",
							fontFamily: "open sans",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
						}}
						variant="h3"
						color="white"
					>
						{state?.date}
					</Typography>
					<Stack>
						<img
							src={state?.whether?.icon}
							style={{
								position: "absolute",
								top: "120px",
								left: "520px",
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
							{state?.whether?.temp}° • {state?.whether?.status}
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
							{state?.current_event?.title}
						</Typography>
						<Typography
							sx={{ position: "absolute", top: "400px", left: "130px" }}
							variant="h4"
							color={"white"}
						>
							{state?.current_event?.time}
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
								opacity: 0.8,
							}}
							variant="h5"
							color={"white"}
						>
							Up next
						</Typography>
						<Typography
							sx={{
								position: "absolute",
								top: "515px",
								left: "130px",
							}}
							variant="h5"
							color={"white"}
						>
							{state?.next_event?.title}
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
							{state?.next_event?.time}
						</Typography>
						<img
							style={{
								position: "absolute",
								top: "665px",
								left: "122px",
								width: "85px",
								height: "85px",
							}}
							className="lightMove"
							src={light2}
						></img>
						<img
							style={{
								position: "absolute",
								top: "680px",
								left: "135px",
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
								width: "110px",
								height: "110px",
							}}
							src={logo}
						></img>
					</Stack>
				</Stack>
				<Box sx={{ position: "absolute", bottom: 320, right: 170 }}>
					<Typography sx={{ color: "white", fontSize: 20, opacity: 1 }}>
						{/* <span style={{ opacity: 0.7 }}>You can request music at</span>{" "}
            <span
              style={{
                paddingBottom: "5px",
                borderBottom: "2px solid #e69ab1",
              }}
            >
              music.cshack.site
            </span> */}
						<Box sx={{ textAlign: "center" }}>
							<Box sx={{ fontSize: "32px" }}>CS hackratron Service</Box>
							<Box sx={{ backgroundColor: "white", padding: "10px 0px" }}>
								<img
									src={"https://utils.thistine.com/api/qr/v1/make?text=https%3A%2F%2Flinktr.ee%2Fthistine&size=300&disableBorder=true"}
									style={{ height: "300px", background: "color" }}
								></img>
							</Box>
						</Box>
					</Typography>
				</Box>
				<Box
					sx={{
						width: "500px",
						height: "180px",
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
					<Stack direction="row" gap="18px">
						<Box
							sx={{
								width: "110px",
								height: "110px",
							}}
						>
							<img
								src={state?.now_playing?.cover_url}
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
								{(state?.now_playing?.title ||"").length > 20 ? (
									<Marquee>
										{state?.now_playing?.title}
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Marquee>
								) : (
									state?.now_playing?.title
								)}
							</Typography>

							<Typography variant="h6" color={"white"}>
								{state?.now_playing?.artist}
							</Typography>
							<Stack direction="row" gap="10px">
								<Typography variant="h6" color={"#D1D1D1"}>
									{state?.now_playing?.queue_by ? "Queued by" : "From Radio"}
								</Typography>
								<Stack>
									<Typography
										variant="h6"
										color={"white"}
										style={{
											whiteSpace: "nowrap",
										}}
									>
										{state?.now_playing?.queue_by
											? `${state?.now_playing?.queue_by.substring(0, 20)}${
													state?.now_playing?.queue_by.length > 20 ? "..." : ""
											  }`
											: ""}
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
