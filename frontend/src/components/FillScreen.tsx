import { useEffect, useState } from "react";

export default function FillScreen ({ hideFullScreen }: { hideFullScreen: () => void }) {
    const [dot, setDot] = useState("...");

    useEffect(() => {
        document.body.classList.add("fillScreenOpen");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (dot === "...") {
                setDot(".");
            } else if (dot === ".") {
                setDot("..");
            } else if (dot === "..") {
                setDot("...");
                hideFullScreen();
        document.body.classList.add("fillScreenOpen");
    }
        }, 500);

        // return () => {
        //     setDot("...");
        // }
    }, [dot]); 

    return (
        <div className="fillScreen">
            <h3>Filling up{dot}</h3>
        </div>
    )
}
