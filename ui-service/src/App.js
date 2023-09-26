import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import InputForm from "./components/InputForm";
import JobList from './components/jobs/JobList';
import { Container } from 'react-bootstrap';
import { isPositiveInt } from './utilities/generic';

const  JOB_DATA =[{
  id:1,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"success"
},{
  id:1,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"running"
},{
  id:1,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"failed"
},{
  id:1,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"running"
},{
  id:1,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"running"
}]

function App() {
  const [inputFormState,setInputFormState] = useState({
    numberOfEmails:0,
    isError:false,
    isCreating: false,
  });
  const [jobsState,setJobsState] = useState({jobs:[],isFetching:false});

  const {numberOfEmails, isError, isCreating} = inputFormState;
  const {jobs, isFetching} = jobsState;

  useEffect(()=>{
    if(isCreating!==false){
      return;
    }
    //make a call to fetch the jobs
    setJobsState((prevState)=>({...prevState,isFetching:true,jobs:JOB_DATA}));
    axios.get('/jobs-repo/jobs').then((data)=>{
      setJobsState((prevState)=>({...prevState,isFetching:false,jobs:data}));
    }).catch((err)=>{
      //handler error
    });
  },[isCreating]);

  useEffect(()=>{
    const socket = io("http://localhost");
    socket.on("job.update", (jobData) => { 
      setJobsState((prevState)=>{
        const {jobs} = prevState;
        if(!jobs || jobs.length===0) {
          return{
            ...prevState,
            jobs:[jobData],
          }
        }
        const job = jobs.find((job)=>(job.jobId===jobData.jobid));
        if(!job) {
          return {
            ...prevState,
            jobs:[...prevState.jobs,job],
          }
        }
        const jobsArray = jobs.map((job)=>{
          if(job.jobId===jobData.jobId) {
            return jobData;
          }
          return job;
        });
        return {...prevState,jobs:jobsArray};
      });
    });
    return ()=>{
      socket.disconnect();
    }
  },[]);

  return (
    <>
      <Container>
        <InputForm
          showError={isError}
          showLoading={isCreating}
          value={numberOfEmails} 
          onInputChange={(e)=>{
            const value = e.target.value;
            setInputFormState((prevState)=>({...prevState,numberOfEmails:value}));
          }}
          onButtonClick={()=>{
            console.log("hello")
            if(isPositiveInt(numberOfEmails)===false) {
              console.log("hi")
              setInputFormState((prevState)=>({...prevState,isError:true}));
              return;
            }
            setInputFormState((prevState)=>({...prevState,isError:false, isCreating:true}));
            // make a call to the backend
            setTimeout(()=>{
              setInputFormState((prevState)=>({...prevState,isCreating:false}));
            },3000)
          }}
        />
        <JobList
          jobs={jobs}
          isFetching={isFetching}
        />
      </Container>
    </>
  );
}

export default App;
