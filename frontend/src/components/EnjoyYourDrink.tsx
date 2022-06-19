import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import useTranslation from "../hook/useTranslation";

import styles from "./styles/Screen.module.scss";

interface Props {
    hideScreen: () => void
}

export default function EnjoyYourDrink ({ hideScreen }: Props) {
    const { translate } = useTranslation();

    useEffect(() => {
        document.body.classList.add("ejdScreenOpen");

        return () => {
            document.body.classList.remove("ejdScreenOpen");
        }
    }, []);

	return (
		<div className={styles.screen}>
            <button className={styles.close}
                onClick={() => hideScreen()}>
                <FontAwesomeIcon icon={faTimes} />
            </button>

			<h2>{ translate("enjoy_your_drink") }!</h2>
			<h2>{ ":)" }</h2>
		</div>
	)
}
