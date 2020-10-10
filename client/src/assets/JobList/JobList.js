import React, {useState, useEffect} from 'react'
import {FaAlignRight} from 'react-icons/fa'
import styles from './JobList.module.css'
import './JobList.css'
import Modal from 'react-modal'
import PostJob from './PostJob'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'



Modal.setAppElement('#root')


const JobList = ({handleLogout}) => {
    const [jobs, setJobs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [toggleOpen, setToggleOpen]= useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);

    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleToggle=()=>{
        setToggleOpen(!toggleOpen)
    }
    const offToggle=()=>{
        setModalIsOpen(true)
        setToggleOpen(false)
    }
    

    const getJobList =()=>{
        axios.get('https://cosmic-shubhamkumbhakar.herokuapp.com/api')
        .then((response)=>{
            const data = response.data;
            setJobs(data)
            console.log('Data Received')
        })
        .catch(()=>{
            console.log('Error retrieving Data!!')
        })
    }
    
    const handleApply =(e)=>{
        e.preventDefault();
        const data={
            jobid: id,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            link: document.getElementById("link").value
        }
        axios({
            url: 'https://cosmic-shubhamkumbhakar.herokuapp.com/api/application',
            method: 'POST',
            data: data
          })
             .then(()=>{
                if(data.name.length>2 && data.email.length>5 && data.link.length>10){
                    handleClose();
                    setTimeout(()=>{
                        alert('Application Sent!!');
                    },2000)
                }else{
                    alert('Invalid inputs. Fill again!')
                }
             })
             .catch(()=>{
                 console.log('Server Error')
             })

    }

    useEffect(()=>{
        getJobList();
    },[])

    return (
        <div id={styles.joblist}>
            <nav className={styles.navbar}>
            <div className={styles.navcenter}>
            <div className={styles.navheader}>
                <h2>Welcome!</h2>
                 <button type="button" className={styles.navbtn} onClick={handleToggle}>
                 <FaAlignRight className={styles.navicon}/>
                 </button>
            </div>
            <div id={styles.right} style={{textAlign:"end"}}>
                 <ul className={toggleOpen ? 'nav-menu active' : 'nav-menu'}>
                     <li><button className={styles.navbuttons} style={{width:"87px", backgroundColor:"#8976b0"}} onClick={offToggle}>Post a Job</button></li>
                     <li><button className={styles.navbuttons} style={{width:"62px", backgroundColor:"red"}} onClick={handleLogout}>Logout</button></li>
                 </ul>
             </div>   
            </div>
            </nav>

            



            
            <section id={styles.section}>
               
            {
                jobs.map((job, index) =>{
                        let link = `mailto:${job.email}`;
                        return(
                        <div key={index} className={styles.item}>
                            <h3>{job.title}</h3>
                             <p className={styles.p}><b>JD: </b>{job.description}</p>
                             <p><small>Apply Before: </small>{job.deadline}<br/>
                             <small>Salary:</small>{job.salary/100000}LPA   |  <small>Location:</small>{job.location}
                             <br/>
                             <small>Notice Period:</small>{job.preference}</p>
                             
                             <p>Email:<a href={link}> {job.email} </a></p>
                             <div className={styles.foobtncontainer}>
                                <div className={styles.footbtn}><button onClick={()=> handleClickOpen(job.date)}>Apply</button></div>
                            </div>
                        </div>
                    )
                })
                
            }
            </section>


            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Job ID: {id}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To apply for this job, please fill in the details.
                </DialogContentText>
                <TextField
                    autoFocus
                    
                    margin="dense"
                    id="name"
                    label="Full Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
                <TextField
                    
                    margin="dense"
                    id="link"
                    label="Link to Profile/Resume"
                    type="link"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApply} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
            
            <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)} className={styles.modal} overlayClassName={styles.modalo}>
                <header id={styles.head}>
                <h1 id={styles.h1}>Fill Job Details</h1>
                <button id={styles.btn} onClick={()=>setModalIsOpen(false)} >×</button>
                </header>

                <PostJob getJobList={getJobList} setModalIsOpen={setModalIsOpen}/>
            </Modal>
            <br/> <br/> <br/>
            
            
        </div>
    )
}

export default JobList
