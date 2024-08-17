import { FaCheck } from "react-icons/fa6";
import Link from "next/link";

export default function PasswordUpdated(){
    return (
        <div className="password-updated">
            <div className="modal-content">
                <div className="check-container">
                    <div className="light-grey-container">
                        <div className="grey-container">
                            <div className="black-container">
                                <div className="white-container">
                                    <FaCheck />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-container">
                    <h3 className="bold">Password Changed Successfully</h3>
                    <div className="text">Your password has been updated successfully</div>
                </div>
                <button className='btn'>
                    <Link href='/login'>Back to Login</Link>
                </button>
            </div>
        </div>
    )
}
