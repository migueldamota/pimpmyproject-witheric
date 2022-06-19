import { createRef, useEffect } from "react";

import styles from "./styles/Bubble.module.scss";

interface Props {
    time?: number
}

export default function Bubble ({ time }: Props) {
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        // @ts-ignore
        const element = ref.current;
        if (!element) return;

        resetBubble(element);

        element.addEventListener("animationend", () => {
            resetBubble(element);
        });
    }, []);

    function resetBubble (element: HTMLDivElement) {
        element.classList.remove(styles.bubbleAnimation);

        setTimeout(() => {
            element.classList.add(styles.bubbleAnimation);
        }, 10);

        element.style.left = `${Math.random() * 100}%`;
        element.style.setProperty("--size", `${((Math.random() * 48) + 18)|0}px`);
        element.style.setProperty("--delay", `${((Math.random() * 8) + 2).toFixed(2)}s`);
        element.style.setProperty("--speed", `${time ?? 10}s`);

    }

    return <div ref={ref} className={styles.bubble} />;
}
