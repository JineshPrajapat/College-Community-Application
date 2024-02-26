
const Profile= require("../models/Profile")

const createPro = async (req,res)=>{
    try{
        const task = await Profile.create(req.body);
        res.status(200).json(task);

    }catch(error){
        res.status(500).json({msg:error.message});
    }
};

const getPros = async(req,res) =>{
    try{
        const task = await Profile.find()
        res.status(200).json(task)

    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const getPro = async(req,res) =>{
  try{
    const {id} = req.params;
    const task = await Profile.findById(id);
    if(!task){
        return res.status(404).json(`no task found with id :${id}`)
    }
    res.status(200).json(task);

  }catch(error){
    res.status(500).json({msg:error.message});
  }
}

const deletePro = async (req,res) =>{
    try{
        const {id} = req.params;
        const task = await Profile.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json(`no task found with id :${id}`)
        }
        res.status(200).send("task deleted")
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}


const updatePro = async (req,res) =>{
    try{
     const {id} = req.params
     const task = await Profile.findByIdAndUpdate(
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
    createPro,getPros,getPro,deletePro,updatePro
}