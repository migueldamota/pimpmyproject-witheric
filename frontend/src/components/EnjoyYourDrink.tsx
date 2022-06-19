import { useEffect } from "react";
import useTranslation from "../hook/useTranslation";

import styles from "./styles/EnjoyYourDrinkScreen.module.scss";

export default function EnjoyYourDrink () {
    const { translate } = useTranslation();

    useEffect(() => {
        document.body.classList.add("ejdScreenOpen");

        return () => {
            document.body.classList.remove("ejdScreenOpen");
        }
    }, []);

	return (
		<div className={styles.enjoyDrinkScreen}>
			<h2>{ translate("enjoy_your_drink") }!</h2>
			<br />
			<h2>{ ":)" }</h2>
		</div>
	)
}
