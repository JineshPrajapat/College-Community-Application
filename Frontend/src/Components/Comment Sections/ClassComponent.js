import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import { fetchData } from '../../FetchData/FetchData';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css'
import axios from 'axios';
import baseURL from '../../api/api';

class ClassComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          userId: '01a',
          comId: '012',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'Hey, Loved your blog! ',
          replies: [
            {
              userId: '02a',
              comId: '013',
              userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
              fullName: 'Adam Scott',
              avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
              text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
            },
            {
              userId: '01a',
              comId: '014',
              userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
              fullName: 'Riya Negi',
              avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
              text: 'thanks!😊'
            }
          ]
        },
        {
          userId: '02b',
          comId: '017',
          fullName: 'Lily',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'I have a doubt about the 4th point🤔',
          avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
          replies: []
        }
      ]
    };
  }

  componentDidMount() {
    const { discussionId } = this.props;
    fetchData(`${baseURL}/discuss/${discussionId}/comment`, (data) => {
      console.log("Fetched comment data:", data.comments)

      // Transform the received data to match the expected variable names
      const transformedData = data.comments.map(comment => ({
        userId: comment.userId._id,
        comId: comment._id,
        fullName: comment.userId.username,
        avatarUrl: comment.userId.profileImage,
        text: comment.body,
        userProfile: comment.userProfile,
        replies: comment.replies ? comment.replies.map(reply => ({
          userId: reply.userId._id,
          comId: reply.comId._id,
          fullName: reply.userId.username,
          avatarUrl: reply.userId.profileImage,
          text: reply.body,
          userProfile: reply.userProfile,
        })) : undefined,
      }));
      console.log(transformedData);

      // tranformdata updated
      this.setState({ commentData: transformedData });
    });
  }

  onSubmitAction = (data, discussionId) => {
    console.log('this comment was posted!,data', data);

    const token = localStorage.getItem('token');
    console.log("frontend token", token);


    // extracting comment body from data
    const body = data.text;

    axios.post(`${baseURL}/discuss/addComment`, {
      body: body,
      discussionId: discussionId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log("Comment post response", response);
        if (response.status === 200) {
          console.log("Comment added successfully.")
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("error", error);
          console.log("comment post failed, try again!");
        }
        else {
          console.error("Network or request error");
        }
      });

  };

  // below one is for nested submition
  
  // onSubmitAction = (data, discussionId, parentId) => {
  //   console.log('this comment was posted!,data', data);

  //   const token = localStorage.getItem('token');
  //   console.log("frontend token", token);


  //   // extracting comment body from data
  //   const body = data.text;

  //   axios.post(`${baseURL}/discuss/${discussionId}/addComment`, {
  //     body: body,
  //     parentId:parentId
  //     // discussionId: discussionId
  //   }, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then((response) => {
  //       console.log("Comment post response", response);
  //       if (response.status === 200) {
  //         console.log("Comment added successfully.")
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.error("error", error);
  //         console.log("comment post failed, try again!");
  //       }
  //       else {
  //         console.error("Network or request error");
  //       }
  //     });

  // };

  render() {

    const { discussionId } = this.props;


    return (
      <div style={{ width: '100%' }}>
        <CommentSection
          currentUser={{
            currentUserId: "userId",
            currentUserImg: "avatarUrl",
            // 'https://ui-avatars.com/api/name=Riya&background=random',
            currentUserProfile:
              'https://www.linkedin.com/in/riy-nei-8879631a9/',
            currentUserFullName: "userName"
          }}
          commentData={this.state.commentData}
          onSubmitAction={(data) => this.onSubmitAction(data, discussionId)}
          logIn={{
            loginLink: 'http://localhost:3000/login',
            signupLink: 'http://localhost:3000/signup'
          }}
        />
      </div>
    );
  }
}

export default ClassComponent;
