import React, { useState } from 'react';


const group = {
    name: "Sample Group",
    description: "This is a sample group for demonstration purposes.",
    members: [
      { user: { username: "user1" }, status: "accepted" },
      { user: { username: "user2" }, status: "pending" },
      { user: { username: "user3" }, status: "accepted" }
    ],
    posts: [
      { _id: 1, content: "Post 1 content", author: { username: "user1" } },
      { _id: 2, content: "Post 2 content", author: { username: "user2" } },
      { _id: 3, content: "Post 3 content", author: { username: "user3" } }
    ]
  };


const Community = () => {
    const [joinRequestSent, setJoinRequestSent] = useState(false);
    const [joinRequestPending, setJoinRequestPending] = useState(false);

    const sendJoinRequest = () => {
        // Logic to send join request
        setJoinRequestSent(true);
    };

    const cancelJoinRequest = () => {
        // Logic to cancel join request
        setJoinRequestSent(false);
    };

    const renderJoinButton = () => {
        if (joinRequestPending) {
            return <button className="bg-gray-300 text-gray-700 rounded px-4 py-2">Request Pending</button>;
        } else if (joinRequestSent) {
            return <button onClick={cancelJoinRequest} className="bg-red-500 text-white rounded px-4 py-2">Cancel Request</button>;
        } else {
            return <button onClick={sendJoinRequest} className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2">Join Group</button>;
        }
    };

    return (
        <div className="border rounded p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{group.name}</h2>
            <p className="text-gray-700 mb-2">{group.description}</p>
            <div className="flex items-center mb-2">
                <span className="mr-2">Members: {group.members.length}</span>
                {renderJoinButton()}
            </div>
            <h3 className="text-lg font-semibold mb-2">Posts</h3>
            <div>
                {group.posts.map(post => (
                    <div key={post._id} className="border border-white rounded p-2 mb-2">
                        <p className="text-gray-700">{post.content}</p>
                        <p className="text-gray-500">Author: {post.author.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;


// const Group = () => {
//     return (
//       <div className="container mx-auto">
//         <Community group={dummyGroup} />
//       </div>
//     );
//   };
  
//   export default Group;
