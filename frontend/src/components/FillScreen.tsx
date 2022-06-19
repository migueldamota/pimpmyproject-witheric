import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useTranslation from "../hook/useTranslation";
import Bubble from "./Bubble";

import styles from "./styles/Screen.module.scss";

interface Props {
    water: number
    hideScreen: () => void
}

export default function FillScreen ({ water, hideScreen }: Props) {
    const { translate } = useTranslation();
    const [dot, setDot] = useState("...");

    useEffect(() => {
        document.body.classList.add("fillScreenOpen", "gradientShow");

        return () => {
            document.body.classList.remove("fillScreenOpen", "gradientShow");
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (dot === "...") {
                setDot(".");
            } else if (dot === ".") {
                setDot("..");
            } else if (dot === "..") {
                setDot("...");
            }
        }, 500);
    }, [dot]);

    return (
        <div className={styles.screen}>
            <button className={styles.close}
                onClick={() => hideScreen()}>
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <h2>{ translate("fill_screen.text") }{dot}</h2>

            <div className={styles.bubbles}>
				{ Array.from({ length: water }, (e, i) => <Bubble time={20} key={i} />) }
			</div>
        </div>
    )
}
