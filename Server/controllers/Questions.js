const Questions = require("../models/Questions");
require("dotenv").config();

exports.sendQuestions = async (req, res) => {
    try{
        const {
            company,
            branch,
            year,
            title: questionTitle,
            difficulty,
            questionDescription,
            link: questionLink

        } =req.body;

        // getting user_id
        // const id = req.user.userQuestionId;
        // || !id  

        // console.log(id);

        console.log(req.body);

        if ((!company || !branch  || !year || !questionTitle || !difficulty ||!questionDescription)) {     
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const questionDetails = await Questions.create({
            company:company,
            branch:branch,
            year:year,
            questionTitle:questionTitle,
            difficulty:difficulty,
            questionDescription:questionDescription,
            questionLink:questionLink
        });

        console.log("as", questionDetails);

        return res.status(200).json({
            success: true,
            message: "Questions updated successfully.",
            questionDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to update questions",
            err: err.message,
        })
    }

};

exports.getQuestions = async(req, res)=>{
    try{
        const question = await Questions.find();

        if(!question)
        {
            return res.status(404).json({
                success: false,
                message: "No questions found",
            });
        }
        return  res.status(404).json({
            success: true,
            message: "Questions Found successfully",
            question: question,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message + "error while fetching questions",
        });
    }
};


