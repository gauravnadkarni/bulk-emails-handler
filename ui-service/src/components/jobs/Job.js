import { Badge, ProgressBar } from "react-bootstrap";

export default function Job(props) {
    const {
        id,
        numOfEmailsToBeSent,
        numOfEmailsSentSoFar,
        status,
    } = props;

    let statusComponent = null;
    if(status) {
        statusComponent = <Badge pill bg="warning">No Status</Badge>
        const statusInLowerCase = status.toLowerCase();
        if(statusInLowerCase==="initiating") {
            statusComponent = <Badge pill bg="primary">{statusInLowerCase.toUpperCase()}</Badge>
        } else if(statusInLowerCase==="running") {
            statusComponent = <Badge pill bg="info">{statusInLowerCase.toUpperCase()}</Badge>
        } else if(statusInLowerCase==="success") {
            statusComponent = <Badge pill bg="success">{statusInLowerCase.toUpperCase()}</Badge>
        } else {
            statusComponent = <Badge pill bg="danger">{statusInLowerCase.toUpperCase()}</Badge>
        }
    }

    return (<tr>
                <td>{id}</td>
                <td>{numOfEmailsToBeSent}</td>
                <td>
                    <Badge pill bg="dark">
                        {numOfEmailsSentSoFar}
                    </Badge>
                </td>
                <td><ProgressBar variant="info" min={0} max={numOfEmailsToBeSent} now={numOfEmailsSentSoFar}/></td>
                <td>{statusComponent}</td>
            </tr>)        
}