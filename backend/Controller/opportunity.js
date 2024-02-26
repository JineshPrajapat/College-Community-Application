
const Oppor= require("../models/Questions")

const createOppo = async (req,res)=>{
    try{
        const task = await Oppor.create(req.body);
        res.status(200).json(task);

    }catch(error){
        res.status(500).json({msg:error.message});
    }
};

const getOppor = async(req,res) =>{
    try{
        const task = await Oppor.find()
        res.status(200).json(task)

    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const getOppo = async(req,res) =>{
  try{
    const {id} = req.params;
    const task = await Oppor.findById(id);
    if(!task){
        return res.status(404).json(`no task found with id :${id}`)
    }
    res.status(200).json(task);

  }catch(error){
    res.status(500).json({msg:error.message});
  }
}

const deleteOppo = async (req,res) =>{
    try{
        const {id} = req.params;
        const task = await Oppor.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json(`no task found with id :${id}`)
        }
        res.status(200).send("task deleted")
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}


const updateOppo = async (req,res) =>{
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
    createOppo,getOppor,getOppo,deleteOppo,updateOppo
}