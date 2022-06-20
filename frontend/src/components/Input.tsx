import { useState } from "react";

import { useDrinks } from "../hook/usePage";
import styles from "./styles/Input.module.scss";

interface Props {
    name: string
    background?: string
}

export default function Input ({ name, background }: Props) {
    const { drinks, setDrinks } = useDrinks();

    return (
        <div className={styles.input}>
            <input id={`${name.toLowerCase()}-input`} type="range" min="10" max="100" step="1"
                
                /* @ts-ignore */
                value={drinks[name]}
                onChange={(event) => {
                    /* @ts-ignore */
                    drinks[name] = event.target.value;
                    setDrinks({...drinks});
                }}
                style={{ "--color": background } as any} />

            <p className={styles.level}>
                <span>{ name }</span>
                { /* @ts-ignore */ }
                {drinks[name]}%
            </p>
        </div>
    );
}
