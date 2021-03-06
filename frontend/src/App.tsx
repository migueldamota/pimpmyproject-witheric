import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FillScreen from "./components/FillScreen";
import "./styles/App.scss";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import Bubble from "./components/Bubble";
import useTranslation from "./hook/useTranslation";
import EnjoyYourDrink from "./components/EnjoyYourDrink";
import Input from "./components/Input";
import { useDrinks } from "./hook/usePage";

let timeout: any = null;
export default function App () {
	const { drinks } = useDrinks();
	const [loading, setLoading] = useState(true);
	const { translate, language, setLanguage } = useTranslation();

	const [fillDisabled, setFillDisabled] = useState(false);

	const [bubbles] = useState(Array.from({ length: 50 }, (e, i) => <Bubble key={i} />));

	const [enjoyDrinkScreen, setEnjoyDrinkScreen] = useState(false);

	const [filling, setFilling] = useState(false);
	const [fillScreen, setFillScreen] = useState(false);

	async function fillUp () {
		setFillDisabled(true);

		setFillScreen(true);
		setFilling(true);

		const response = await fetch(`http://localhost:8000/water`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				water: drinks.Wasser,
				cola: drinks.Cola,
			}),
		});
		const json = await response.json();
		setFillDisabled(false);

		if (true) {//json.finished) {
			setFillScreen(false);
			setEnjoyDrinkScreen(true);
			setFilling(false);

			timeout = setTimeout(() =>
				setEnjoyDrinkScreen(false), 3000);
		}
	}

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="loading">
				<h3>Starting...</h3>
			</div>
		);
	}

	return (
		<>
			<div className="gradient"></div>

			<button className="fullScreen" onClick={() => fullscreen()}>
				<FontAwesomeIcon icon={faExpand} />
			</button>

			<div className="bubbles">
				{ bubbles }
			</div>

			<h1 className="logo">HydroHomie</h1>

			{/* <div className="left">
				<div>
					<h4>{ translate("fill_your_drink") }</h4>
					<h2>Hydro Drink!</h2>
				</div>
			</div> */}

			<div className="right">

				{ !filling && <div className="arrows">
					<div className="arrow"></div>
					<div className="arrow"></div>
				</div> }

				<button onClick={() => fillUp()} disabled={fillDisabled}>{ filling ? translate("fill_screen.text") : translate("fill_up") }</button>
			</div>

			<div className="waterInput">
				<Input name="Wasser" />
				<Input name="Cola" background="#000" />

				{/* <input id="water-range" type="range" min="10" max="100" step="1"
					value={water}
					onChange={(event) => setWater(Number(event.target.value))} />

				<p className="waterLevel">
					<span>{ translate("water") }</span>
					{water}%
				</p> */}

				<div className="waterDrag">
					<div className="up" />
					<span>Ziehen</span>
					<div className="down" />
				</div>
			</div>

			<select onChange={(event) => setLanguage(event.target.value)} defaultValue={language}>
				<option value="de">Deutsch</option>
				<option value="en">English</option>
			</select>

			{ fillScreen && <FillScreen hideScreen={() => {
				setFilling(false);
				setFillScreen(false);
			}} water={30} /> }
			{ enjoyDrinkScreen && <EnjoyYourDrink hideScreen={() => {
				clearTimeout(timeout);
				setEnjoyDrinkScreen(false);
			}} /> }
		</>
	);
}



function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);

    var docElm = document.documentElement;
	return !isInFullScreen ? docElm.requestFullscreen() : document.exitFullscreen();
}


function sleep (ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
