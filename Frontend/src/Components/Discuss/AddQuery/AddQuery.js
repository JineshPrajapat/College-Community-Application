import React, {useState} from "react";
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
        title: "",
        post: ""
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleDescriptionChange = (post) => {
        console.log(post);
        setformValue((prevState) => ({
            ...prevState,
            post: post,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventdefault();
        setShowConfirmation(true);
    }

    const handleConfirmation = (isConfirmed) => {
        if (isConfirmed) {
            axios.post("http://careerprehub/discuss/post", {
                title: formValue.title,
                post: formValue.post
            })
                .then((response) => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({
                            type: "sucess",
                            message: "Post added successfully!"
                        });
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
                            id="title"
                            name="title"
                            value={formValue.title}
                            onChange={handleChange}
                            required
                        />

                        <div className="btn-post">
                            <div className="close">Cancel</div>
                            <button type="submit">
                                <i class="fa-solid fa-paper-plane" />
                            </button>
                        </div>
                    </div>
                    <MyCKeditor onDescriptionChange={handleDescriptionChange} />
                </form>

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