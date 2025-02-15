import React from "react";

const UserReviewsFeedback = ({ rating, user }) => {
  const getMessage = () => {
    if (rating <= 2) {
      return `😞 We’re truly sorry for your experience, ${user}. Your feedback matters, & we’re working hard to make things better. Let us make it right!`;
    } else if (rating === 3) {
      return `🤝 Thanks for your honest feedback, ${user}! We appreciate you & are committed to improving. Next time, we’ll strive to exceed your expectations!`;
    } else {
      return `🌟 ${user}, your support means the world to us! 😊 Your kind words fuel our passion, & we can’t wait to serve you again!`;
    }
  };

  return (
    <div>
      <div className="bg-gray-100 p-2 sm:px-4 sm:py-3 rounded-lg mt-3 shadow-md">
        <h1 className="font-bold mb-2 satoshi_medium sm:text-lg text-gray-800">
          Amorée Scents 💖
        </h1>
        <div className="text-sm neue_machina_regular text-gray-700">
          <p className="mb-2">{getMessage()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviewsFeedback;
