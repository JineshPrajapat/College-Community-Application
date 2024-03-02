import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddQuery.scss'
// import '@fortawesome/fontawesome-free/css/all.css';
import MyCKeditor from "../../MyCKEditor/MyCKEditor";
import FlashMessage from "../../FlashMessage/FlashMessage";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";

function AddQuery() {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [flashMessage, setFlashMessage] = useState(false);

    const [formValue, setformValue] = useState({
        discussTitle: "",
        discussDescription: ""
    });

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);                   // Navigate back to previous page
    };

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleDescriptionChange = (discussDescription) => {
        console.log(discussDescription);
        setformValue((prevState) => ({
            ...prevState,
            discussDescription: discussDescription,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
    }

    const handleConfirmation = (isConfirmed) => {
        if (isConfirmed) {
            const token = localStorage.getItem('token');
            console.log("addquery token",token);
            if(token){
                axios.post("http://localhost:4000/api/v1/discuss/addDiscuss", {
                discussTitle: formValue.discussTitle,
                discussDescription: formValue.discussDescription
            },{
                headers:{
                  Authorization: `Bearer ${token}`            // Include token in Authorization header
                }
              })
                .then((response) => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({
                            type: "sucess",
                            message: "Query added successfully!"
                        });

                        navigate("/Discuss");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Error:", error);
                        setFlashMessage({
                            type: "error",
                            message: "Post not addded, try again!"
                        });
                    }
                    else {
                        console.error("Network or request error");
                    }
                });
            }
        }
        setShowConfirmation(false);
    };

    return (
        <div className={`query-container ${showConfirmation ? "show-confirmation" : ""}`}>
            <div className="query-form">
                <form id="query-form" onSubmit={handleFormSubmit}>
                    <div className="title-post-btn">
                        <input className="input-title"
                            type="text"
                            placeholder="Enter your title"
                            id="discussTitle"
                            name="discussTitle"
                            value={formValue.discussTitle}
                            onChange={handleChange}
                            required
                        />

                        <div className="btn-post" >
                            <div className="close" onClick={handleCancel}>Cancel</div>
                            <button type="submit">
                                <i class="fa-solid fa-paper-plane" />
                            </button>
                        </div>
                    </div>
                    <MyCKeditor onDescriptionChange={handleDescriptionChange} />
                </form>


                {/* <div>
                    {formValue.length === 0 ? (
                        <p>No topics found</p>
                    ) : (formValue.map((discussion, index) => (
                        <div className="topic-item-container">
                            <div className="topic-item">
                                <a href=""><img src={discussion.Url} alt=""></img></a>
                                <div className="topic-title" >
                                    <div className="item-header" >
                                        {discussion.title}
                                    </div>
                                    <div className="topic-info">
                                        {discussion.info}
                                    </div>
                                </div>
                                <div className="upvote-view-container">
                                    <div className="upvotes">
                                        <i class="fa-solid fa-circle-up"></i>
                                        <div className="no-of-upvotes">
                                            {discussion.upvotes}
                                        </div>
                                    </div>
                                    <div className="views">
                                        <i class="fa-solid fa-eye"></i>
                                        <div className="no-of-views">{discussion.views}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    ))}
                </div> */}

                {/* confirmation component */}
                {showConfirmation && (
                    <ConfirmationDialog
                        message={"Are you sure you want to submit this form?"}
                        onConfirm={handleConfirmation}
                    />
                )}

                {/* flash component */}
                {flashMessage && (
                    <FlashMessage
                        type={flashMessage.type}
                        message={flashMessage.message}
                    />
                )}

            </div>
        </div>
    );
};

export default AddQuery;

