import { Row, Col, Table, Spinner } from "react-bootstrap";
import classes from "./JobList.module.css";
import Job from "./Job";

export default function JobList(props) {
    const {
        jobs,
        isFetching,
    } = props;

    return (
        <div>
            <Table striped bordered hover className={classes.centerContent}>
                <thead>
                    <tr>
                        <th>Job Id</th>
                        <th>Number of emails to be sent</th>
                        <th>Number of emails sent so far</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {isFetching && (<tr>
                        <td colSpan={4}><div className={classes.centerSpinner}><Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner></div></td>
                    </tr>)}
                    {(jobs.length>0) && jobs.map(({jobId, numOfEmailsToBeSent, numOfEmailsSentSoFar, status})=>(
                        <Job 
                            key={`idx-${jobId}`}
                            id={jobId}
                            numOfEmailsToBeSent={numOfEmailsToBeSent}
                            numOfEmailsSentSoFar={numOfEmailsSentSoFar}
                            status={status}
                        />))}
                    {(jobs.length===0) && (<tr>
                        <td colSpan={4}>No jobs found</td>
                    </tr>)}
                </tbody>
            </Table>
        </div>)
}