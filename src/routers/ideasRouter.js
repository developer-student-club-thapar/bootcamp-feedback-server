const express = require('express');
const router = express.Router();
const Idea = require('../models/Ideas');


router.get("/ideas", async (req, res) => {
    try {
        const ideas = await Idea.find({}, { passphrase: 0 });
        res.json(ideas);
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.send(e.message);
    }
});

router.post("/ideas", async (req, res) => {
    try {
        const idea = new Idea(req.body);
        await idea.save();
        console.log(idea);
        res.json(idea);
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.send(e.message);
    }
});

router.delete("/ideas", async (req, res) => {
    try {
        await Idea.findOneAndDelete({ '_id': req.body._id });
        res.send('Deleted Successfully')
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.send(e.message);
    }
})

// router.delete("/deleteall/:pass", async(req,res)=>{
//   try{
//     if(req.params.pass === "dsc"){
//       await Idea.deleteMany({});
//       res.send('all records deleted'); 
//     }else{
//       res.send('wrong pass'); 
//     }
//   }catch(e){
//     console.log(e); 
//     res.send('error in deleting all records'); 
//   }
// })

module.exports = router;