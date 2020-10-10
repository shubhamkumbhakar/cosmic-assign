import React, {useState} from 'react'
import axios from 'axios'
import './JobList.css'

const PostJob = ({getJobList, setModalIsOpen}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    var today = new Date();
    today.setDate(today.getDate() + 30);
    var date = today.toISOString().substr(0,10);

    const clearInputs=()=>{
        var form = document.getElementById("myForm");
        form.reset();   
    }

    const closeModal=()=>{
         setTimeout(()=>{
             setModalIsOpen(false)
         },3000)
    }
    const postData= (e)=>{
        e.preventDefault()
        //console.log(e.target.deadline.value)
        setIsLoading(true);
        const data={
            title: e.target.title.value,
            description: e.target.description.value,
            salary: e.target.salary.value,
            location: e.target.location.value,
            email: e.target.email.value,
            preference: e.target.preference.value,
            deadline: e.target.deadline.value
        }

        axios({
            url: 'https://cosmic-shubhamkumbhakar.herokuapp.com/api/save',
            method: 'POST',
            data: data
          })
             .then(()=>{
                console.log('Data Sent!!');
                clearInputs();
                getJobList();
                setIsLoading(false)
                setMessage('Job Posted Successfully. Thank you!!')
                closeModal();
             })
             .catch(()=>{
                 console.log('Server Error')
             })
    }

    const loadOrShowMessage=()=>{
        if(isLoading){
            return <p>Submitting Details..</p>
        }else{
            return <p>{message}</p>
        }
    }

    return (
        <div className="maindiv">
            <br/>
            <form onSubmit={postData} id="myForm">
                <label>Job Title:</label>
                <input type="text" name="title" className="inputs" placeholder="Ex: Software Developer" autoFocus required/>
                <br/>
                <label>Job Description:</label>
                <input type="text" name="description" className="inputs" placeholder="Description upto 300 characters" required/>
                <br/>
                <label>Salary:</label>
                <input type="number" name="salary" className="inputs" placeholder="Salary (per year in USD/INR)" min="4000" required/>
                <br/>
                <label>Location:</label>
                <input type="text" name="location" className="inputs" placeholder="Location (City, Country)" required/>
                <br/>
                <label>Email:</label>
                <input type="text" name="email" className="inputs" placeholder="Email" required/>
                <br/>
                <label>Joining preference:</label>
                <select name="preference" placeholder="Joining preference (immediate/x months)" className="inputs"  required>
                <option value="Immediate">Immediate</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="4 months">4 months</option>
                <option value="5 months">5 months</option>
                <option value="6 months">6 months</option>
                </select>
                
                <br/>
                <label>Apply Before:</label>
                <input type="date" name="deadline" className="inputs" defaultValue={date}/>
                <br/><br/>
                <div id="btncontainer">
                <input type="submit" value="Submit" className="sbtn"/>
                </div>
            </form>
            <br/>
            {loadOrShowMessage()}
        </div>
    )
}

export default PostJob
