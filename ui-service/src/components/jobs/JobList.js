import { Row, Col, Table, Spinner } from "react-bootstrap";
import classes from "./JobList.module.css";
import Job from "./Job";

export default function JobList(props) {
    const {
        jobs,
        isFetching,
    } = props;
    return <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
                        {jobs && jobs.map(({id, numOfEmailsToBeSent, numOfEmailsSentSoFar, status})=>(
                            <Job 
                                id={id}
                                numOfEmailsToBeSent={numOfEmailsToBeSent}
                                numOfEmailsSentSoFar={numOfEmailsSentSoFar}
                                status={status}
                            />))}
                        {!jobs && (<tr>
                            <td colSpan={4}>No jobs found</td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </Col>
    </Row>
}