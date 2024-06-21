import { useState } from "react";

const EmailInput = ({ email, emailError, handleEmailChange }) => (
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={handleEmailChange}
      className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
    />
    {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
  </div>
);

const FeedbackTextarea = ({ feedback, feedbackError, handleFeedbackChange }) => (
  <div className="mb-4">
    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
    <textarea
      id="feedback"
      value={feedback}
      onChange={handleFeedbackChange}
      className={`mt-1 block w-full px-3 py-2 border ${feedbackError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
    />
    {feedbackError && <p className="mt-2 text-sm text-red-600">{feedbackError}</p>}
  </div>
);

const ContactForm = ({ email, emailError, feedback, feedbackError, handleEmailChange, handleFeedbackChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="mt-4 w-full px-4">
    <EmailInput email={email} emailError={emailError} handleEmailChange={handleEmailChange} />
    <FeedbackTextarea feedback={feedback} feedbackError={feedbackError} handleFeedbackChange={handleFeedbackChange} />
    <button
      type="submit"
      disabled={emailError || feedbackError}
      className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Submit
    </button>
  </form>
);

const Contact = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleFeedbackChange = (e) => {
    const feedbackValue = e.target.value;
    setFeedback(feedbackValue);
    const sanitizedFeedback = feedbackValue.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
    if (sanitizedFeedback.length < 10) {
      setFeedbackError("Feedback must be at least 10 characters long.");
    } else {
      setFeedbackError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !feedbackError) {
      console.log("Email submitted:", email);
      console.log("Feedback submitted:", feedback);
      setEmail("");
      setFeedback("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700">This is the contact page of the application.</p>
      <ContactForm
        email={email}
        emailError={emailError}
        feedback={feedback}
        feedbackError={feedbackError}
        handleEmailChange={handleEmailChange}
        handleFeedbackChange={handleFeedbackChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Contact;