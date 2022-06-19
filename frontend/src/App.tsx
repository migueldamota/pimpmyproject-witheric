import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FillScreen from "./components/FillScreen";
import "./styles/App.scss";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import Bubble from "./components/Bubble";
import useTranslation from "./hook/useTranslation";
import EnjoyYourDrink from "./components/EnjoyYourDrink";

let timeout: any = null;
export default function App () {
	const { translate, language, setLanguage } = useTranslation();

	const [fillDisabled, setFillDisabled] = useState(false);
	const [water, setWater] = useState(50);

	const [bubbles] = useState(Array.from({ length: 30 }, (e, i) => <Bubble key={i} />));

	const [enjoyDrinkScreen, setEnjoyDrinkScreen] = useState(false);

	const [filling, setFilling] = useState(false);
	const [fillScreen, setFillScreen] = useState(false);

	async function fillUp () {
		setFillDisabled(true);

		setFillScreen(true);
		setFilling(true);

		await sleep(10000);
		// const response = await fetch(`http://localhost:8000/water?percentage=${water}`);
		// const json = await response.json();
		setFillDisabled(false);

		if (true) { //json.finished) {
			setFillScreen(false);
			setEnjoyDrinkScreen(true);
			setFilling(false);

			timeout = setTimeout(() => {
				setEnjoyDrinkScreen(false);
			}, 3000);
		}
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

			<div className="left">
				<div>
					<h4>{ translate("fill_your_drink") }</h4>
					<h2>Hydro Drink!</h2>
				</div>
			</div>

			<div className="right">

				{ !filling && <div className="arrows">
					<div className="arrow"></div>
					<div className="arrow"></div>
				</div> }

				<button onClick={() => fillUp()} disabled={fillDisabled}>{ filling ? translate("fill_screen.text") : translate("fill_up") }</button>
			</div>

			<input id="water-range" type="range" min="0" max="100" step="1"
				value={water}
				onChange={(event) => setWater(Number(event.target.value))} />
			<p>
				<span>{ translate("water") }</span>
				{water}%
			</p>

			<select onChange={(event) => setLanguage(event.target.value)} defaultValue={language}>
				<option value="de">Deutsch</option>
				<option value="en">English</option>
			</select>

			{ fillScreen && <FillScreen hideScreen={() => {
				setFilling(false);
				setFillScreen(false);
			}} water={water} /> }
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
