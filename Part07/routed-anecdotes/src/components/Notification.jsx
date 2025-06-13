import { Alert } from "react-bootstrap"

const Notification = ({ text }) => {

    return (
        <div className="container">
            {(text &&
                <Alert variant="success">
                    {text}
                </Alert>
            )}
        </div>
    )
}

export default Notification