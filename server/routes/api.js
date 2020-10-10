const express = require('express');

const router = express.Router();

const JobPost = require('../models/jobPost');
const ApplicationPost = require('../models/jobApplication');

router.get('/',(req,res)=>{
    JobPost.find({})
        .then((data)=>{
                res.json(data)
        })
        .catch((error)=>{
            console.log('Error');
        })
})


router.post('/save', (req,res)=>{
    console.log('Body: ',req.body);
    const data = req.body;
    const newJobPost = new JobPost(data);
    //console.log(newJobPost)
    newJobPost.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Internal Server Error'});
            return;
        }
        return res.json({
                msg: 'Received Job Data!'
        })
        
    })

    
})

//application post
router.post('/application', (req,res)=>{
    console.log('Body: ',req.body);
    const data = req.body;
    const newApplicationPost = new ApplicationPost(data);
    //console.log(newApplicationPost)
    newApplicationPost.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Internal Server Error'});
            return;
        }
        return res.json({
                msg: 'Received Application!!'
        })
        
    })

    
})



router.get('/name',(req,res)=>{
    const data={
            key1: 'Shubham',
            key2: 5
    }
    res.json(data);
});


module.exports = router;