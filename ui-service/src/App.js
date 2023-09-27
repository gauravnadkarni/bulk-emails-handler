import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import axios from 'axios';
import InputForm from "./components/InputForm";
import JobList from './components/jobs/JobList';
import { Container } from 'react-bootstrap';
import { isPositiveInt } from './utilities/generic';
import ToastComponent from './components/shared/toast';

const  JOB_DATA =[{
  jobId:1,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"success"
},{
  jobId:2,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"running"
},{
  jobId:3,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"failed"
},{
  jobId:4,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"running"
},{
  id:5,
  numOfEmailsToBeSent:25,
  numOfEmailsSentSoFar:20,
  status:"running"
}];

function App() {
  const [toast,setToast] = useState({isVisible:false, type:'secondary',message:''});
  const [inputFormState,setInputFormState] = useState({
    numberOfEmails:0,
    isError:false,
    isCreating: false,
  });
  const [jobsState,setJobsState] = useState({jobs:[],isFetching:false});

  const {numberOfEmails, isError, isCreating} = inputFormState;
  const {jobs, isFetching} = jobsState;

  const showToast = (type,message) => {
    setToast({isVisible:true, type,message});
    setTimeout(()=>{
      setToast({isVisible:false, type:'secondary',message:''});
    },5000);
  };

  const mergeJobState = (jobData) => { 
    setJobsState((prevState)=>{
      const {jobs} = prevState;
      if(!jobs || jobs.length===0) {
        return{
          ...prevState,
          jobs:[jobData],
        }
      }
      const job = jobs.find((job)=>(job.jobId===jobData.jobId));
      if(!job) {
        return {
          ...prevState,
          jobs:[...prevState.jobs,jobData],
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
  };

  /*useEffect(()=>{
    if(isCreating!==false){
      return;
    }
    //make a call to fetch the jobs
    setJobsState((prevState)=>({...prevState,isFetching:true}));
    axios.get('/jobs-repo/jobs').then((data)=>{
      setJobsState((prevState)=>({...prevState,isFetching:false,jobs:data.data}));
    }).catch((err)=>{
      showToast('danger','Unable to connect to jobs api');
    });
  },[isCreating]);*/

  useEffect(()=>{
    const socket = io("http://localhost");
    setJobsState((prevState)=>({...prevState,isFetching:true}));
    axios.get('/jobs-repo/jobs').then((data)=>{
      setJobsState((prevState)=>({...prevState,isFetching:false,jobs:data.data}));
    }).catch((err)=>{
      showToast('danger','Unable to connect to jobs service');
    });
    socket.on("job.created", mergeJobState);
    socket.on("job.updated", mergeJobState);
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
            if(isPositiveInt(numberOfEmails)===false) {
              setInputFormState((prevState)=>({...prevState,isError:true}));
              return;
            }
            setInputFormState((prevState)=>({...prevState,isError:false, isCreating:true}));
            // make a call to the backend to the job creation apid
            axios.post('/jobs-creator/jobs',{numOfEmailsToBeSent: parseInt(numberOfEmails)}).then((data)=>{
              const {data:{jobId}} = data;
              setInputFormState((prevState)=>({...prevState,numberOfEmails:0,isCreating:false}));
              showToast('success',`Email job is being created in the background with id ${jobId}`);
            }).catch(()=>{
              setInputFormState((prevState)=>({...prevState,isCreating:false}));
              showToast('danger','Error occured while processing');
            })
          }}
        />
        <JobList
          jobs={jobs}
          isFetching={isFetching}
        />
      </Container>
      <ToastComponent 
        message={toast.message} 
        type={toast.type}
        isVisible={toast.isVisible}
        onCloseClicked={()=>{
          setToast({isVisible:false, type:'secondary',message:''});
        }}
      />
    </>
  );
}

export default App;
