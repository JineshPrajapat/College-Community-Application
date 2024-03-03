const express = require("express");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User");
const College = require("../models/College");
const Course = require("../models/Course");
const Branch = require("../models/Branch");
const EnrollmentNumber = require("../models/EnrollmentNumber");

function isFileTypeSupported (type, supportedTypes){
    return supportedTypes.includes(type)
}

exports.submitInfo = async (req, res) => {
    try {
        const {collegeName, courseName, branchName, enrollmentNumber, passoutYear} = req.body;

        console.log(req.body);
        // finding user id
        const userId =  req.user.id;

        //  storing images
        const studentId = req.files.studentId;

        // spliting image name and filtering
        const folderName = process.env.FOLDER_NAME;
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const studentIdfileType = studentId.name.split(".")[1].toLowerCase();
        
        if (!isFileTypeSupported(studentIdfileType, supportedTypes) ) {
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }
        // storing url from cloudinary
        const studentIdresponse = await uploadImageToCloudinary(studentId, folderName);

        if(!userId)
        {
            return res.status(404).json({
                success: flase,
                message:"userId not found"
            });
        } 

        // find user by id
        const user = await User.findById(userId);

        if(!User){
            return res.stauts(404).json({
                sucess:false,
                message:"User not found"
            });
        }
        const enrollmentDetails = await EnrollmentNumber.create({
            enrollmentNumber:enrollmentNumber,
            studentIdImage:studentIdresponse.secure_url,
            passoutYear:passoutYear,
        });

        const branchDetails = await Branch.create({
            name:branchName,
            enrollmentNumber:enrollmentDetails._id,
        });
        const courseDetails = await Course.create({
            name:courseName,
            branch:branchDetails._id,
        });
        const collegeDetails = await College.create({
            name:collegeName,
            courses:courseDetails._id
        });

        user.college= collegeDetails._id; 
        user.selectedCourse= courseDetails._id;
        user.selectedBranch= branchDetails._id;
        user.enrollmentInfo= enrollmentDetails._id;
        await user.save();
        // update user college, course, branch
        // user.college =collegeId;
        // user.selectedCourse = courseId;
        // user.selectedBranch = branchId;

        // creating enrollment number document and add to user's enrollmentInfo
        // const enrollmentNumber = new EnrollmentNumber(enrollmentInfo);
        // user.enrollmentInfo =enrollmentNumber;

        console.log("user", user);

        // await user.save();

        return res.status(200).json({
            sucess:true,
            message: "Information Submitted successfully",
            user,
            // enrollmentDetails,

        });

    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
    
};