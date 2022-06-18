import { createRef, useEffect } from "react";

export default function Bubble () {
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        // @ts-ignore
        const element = ref.current;
        if (!element) return;
        element.style.left = `${Math.random() * 100}%`;
        element.style.setProperty("--size", `${((Math.random() * 64) + 10)|0}px`);
        element.style.setProperty("--delay", `${((Math.random() * 1)).toFixed(2)}s`);
    }, []);

    return <div ref={ref} className="bubble" />;
}
