import React from "react";

const Comments = ({ comment }) => {
  return (
    <div className="max-w-240 mx-auto mt-4">
      <div className="border-b-2 border-gray-400 mb-4 py-4">
        <h2 className="py-4">{comment.name}</h2>
        <p>
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default Comments;
