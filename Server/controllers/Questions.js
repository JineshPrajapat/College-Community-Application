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

        console.log(req.body);

        // Getting user ID from authenticated request
        const userId = req.user.id;
        
        if ((!userId || !company || !branch  || !year || !questionTitle || !difficulty ||!questionDescription)) {     
            console.log("no user id found",userId);
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const questionDetails = await Questions.create({
            userQuestionId: userId,
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
        const question = await Questions.find().sort({ createdAt: -1 });
        if(!question)
        {
            return res.status(404).json({
                success: false,
                message: "No questions found",
            });
        }
        return  res.status(200).json({
            // success: true,
            // message: "Questions Found successfully",
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


