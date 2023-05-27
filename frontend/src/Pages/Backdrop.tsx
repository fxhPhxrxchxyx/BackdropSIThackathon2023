import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import { payload } from "../utils/payload";
import Marquee from "react-fast-marquee";
import logo from "../assets/1.png";
import light1 from "../assets/light1.png";
import light2 from "../assets/light2.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Backdrop = () => {
	let queue = Boolean(payload.now_playing.queue_by);
	const [state, setState] = useState<string>({});
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
		axios.get("https://api.cshack.site/api/backdrop/state").then((res) => {
			setState(res.data.data);
		});
		setInterval(() => {
			axios.get("https://api.cshack.site/api/backdrop/state").then((res) => {
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
						{state.time}
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
						{state.date}
					</Typography>
					<Stack>
						<img
							src={state.whether?.icon}
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
							{state.whether?.temp}° • {state.whether?.status}
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
							{state.current_event?.title}
						</Typography>
						<Typography
							sx={{ position: "absolute", top: "400px", left: "130px" }}
							variant="h4"
							color={"white"}
						>
							{state.current_event?.time}
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
							{state.next_event?.title}
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
							{state.next_event?.time}
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
								width: "110px",
								height: "110px",
							}}
							src={logo}
						></img>
					</Stack>
				</Stack>
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
								src={state.now_playing?.cover_url}
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
								{state.now_playing?.title.length > 20 ? (
									<Marquee>
										{state.now_playing?.title}
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Marquee>
								) : (
									state.now_playing?.title
								)}
							</Typography>

							<Typography variant="h6" color={"white"}>
								{state.now_playing?.artist}
							</Typography>
							<Stack direction="row" gap="10px">
								<Typography variant="h6" color={"#D1D1D1"}>
									{state.now_playing?.queue_by ? "Queued by" : "From Radio"}
								</Typography>
								<Stack>
									<Typography
										variant="h6"
										color={"white"}
										style={{
											whiteSpace: "nowrap",
										}}
									>
										{state.now_playing?.queue_by
											? `${state.now_playing?.queue_by.substring(0, 20)}${
													state.now_playing?.queue_by.length > 20 ? "..." : ""
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
