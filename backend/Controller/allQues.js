
const Ques= require("../models/Questions")

const createQues = async (req,res)=>{
    try{
        const task = await Ques.create(req.body);
        res.status(200).json(task);

    }catch(error){
        res.status(500).json({msg:error.message});
    }
};

const getQues = async(req,res) =>{
    try{
        const task = await Ques.find()
        res.status(200).json(task)

    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const getQue = async(req,res) =>{
  try{
    const {id} = req.params;
    const task = await Ques.findById(id);
    if(!task){
        return res.status(404).json(`no task found with id :${id}`)
    }
    res.status(200).json(task);

  }catch(error){
    res.status(500).json({msg:error.message});
  }
}

const deleteQues = async (req,res) =>{
    try{
        const {id} = req.params;
        const task = await Ques.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json(`no task found with id :${id}`)
        }
        res.status(200).send("task deleted")
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}


const updateQues = async (req,res) =>{
    try{
     const {id} = req.params
     const task = await Ques.findByIdAndUpdate(
        {_id:id},req.body,{new:true,
        runValidators:true}
     )
     if(!task){
        return res.status(404).json(`no task found with id :${id}`)
    }
     res.status(200).json(task)
    }catch(error){
      res.status(500).json({msg:error.message})
    }
}


module.exports = {
    createQues,getQues,getQue,deleteQues,updateQues
}