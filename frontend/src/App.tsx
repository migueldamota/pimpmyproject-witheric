import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FillScreen from "./components/FillScreen";
import "./styles/App.scss";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import Bubble from "./components/Bubble";

export default function App () {
	const [water, setWater] = useState(50);
	const [fillScreen, setFillScreen] = useState(false);

	async function fillUp () {
		console.log("hi");
		
		setFillScreen(true);

		const response = await fetch(`http://10.0.0.102:8000/water?percentage=${water}`);		
		const json = await response.json();

		if (json.finished) {
			setFillScreen(false);
		}
	}

	return (
		<>

			<button className="fullScreen" onClick={() => fullscreen()}>
				<FontAwesomeIcon icon={faExpand} />
			</button>

			<div className="bubbles">
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
				<Bubble />
			</div>

			<h1 className="logo">HydroHomie</h1>

			<div className="left">
				<div>
					<h4>Set your</h4>
					<h2>Hydro Drink!</h2>
				</div>
			</div>

			<div className="right">

				<div className="arrows">
					<div className="arrow"></div>
					<div className="arrow"></div>
				</div>

				<button onClick={() => fillUp()}>Auffüllen</button>
			</div>

			<input id="water-range" type="range" min="0" max="100" step="1"
				value={water}
				onChange={(event) => setWater(Number(event.target.value))} />
			<p>
				<span>Water</span>
				{water}%
			</p>

			{ fillScreen && <FillScreen /> }
		</>
	);
}



function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
		docElm.requestFullscreen();
    } else {
		document.exitFullscreen();
    }
}
