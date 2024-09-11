import { TiTimes } from "react-icons/ti";

export default function ResponseMsg({setStatus, status, responseMsg}){

    const handleResponseMsg = ()=> {
        setStatus(null)
    }

    return(
        <div
            className="response-msg" 
            style={{backgroundColor: status==='success' ? 'hsl(120, 70%, 50%)': status==='error' ? 'orangered': null}}
            >
                <span className="msg">{responseMsg}</span>
                <TiTimes size={25} onClick={handleResponseMsg} />
        </div>
    )
}
