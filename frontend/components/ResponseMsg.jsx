'use client'

import { TiTimes } from "react-icons/ti";
import { useResponse } from "@/utils/context/ResponseContext";

export default function ResponseMsg() {
    const { responseMsg, error, removeResponse } = useResponse();

    return (
        responseMsg && (
            <div
                className="response-msg"
                style={{ backgroundColor: error ? 'orangered' : 'hsl(120, 70%, 50%)' }}
            >
                <span className="msg">{responseMsg}</span>
                <TiTimes size={25} onClick={removeResponse} />
            </div>
        )
    );
}
