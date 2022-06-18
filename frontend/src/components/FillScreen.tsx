import { useEffect, useState } from "react";

export default function FillScreen () {
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
        <div className="fillScreen">
            <h3>Filling up{dot}</h3>
        </div>
    )
}
