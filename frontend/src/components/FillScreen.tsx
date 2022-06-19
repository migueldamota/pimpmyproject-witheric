import { useEffect, useState } from "react";
import useTranslation from "../hook/useTranslation";
import Bubble from "./Bubble";

import styles from "./styles/FillScreen.module.scss";

export default function FillScreen ({ water }: { water: number }) {
    const { translate } = useTranslation();
    const [dot, setDot] = useState("...");

    useEffect(() => {
        document.body.classList.add("fillScreenOpen");

        return () => {
            document.body.classList.remove("fillScreenOpen");
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

        // return () => {
        //     setDot("...");
        // }
    }, [dot]);

    return (
        <div className={styles.fillScreen}>
            <h3>{ translate("fill_screen.text") }{dot}</h3>

            <div className={styles.bubbles}>
				{ Array.from({ length: water }, (e, i) => <Bubble time={20} key={i} />) }
			</div>
        </div>
    )
}
