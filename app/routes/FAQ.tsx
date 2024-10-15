import React from 'react';
import "app/styles/FAQ.css";

export const FaqPage = (): JSX.Element => {
  return (
    <div className="FAQ-page">
      <div className="div">
        <div className="header">
          <h1 className="text-wrapper">How can we help?</h1>
          <input className="search-input" type="text" placeholder="Type your question:" />
        </div>
        <div className="faq-section">
          <h2 className="text-wrapper-3">Frequently Asked Questions:</h2>
          <div className="faq-item">
            <p className="faq-question">Q: Are you guys the best group of people ever in the whole big wide world?</p>
            <p className="faq-answer">A: Yes</p>
          </div>
          <div className="faq-item">
            <p className="faq-question">Q: WHY IS THIS WEBSITE SO NICE AND EFFECTIVE?</p>
            <p className="faq-answer">A: What can I say? :)</p>
          </div>
          <div className="faq-item">
            <p className="faq-question">Q: Where do you guys work?</p>
            <p className="faq-answer">A: We all work at Amazon, Google, Meta, etc!!</p>
          </div>
        </div>
        <div className="icon-buttons">
          <div className="accessibility-button" />
          <div className="contact-button" />
          <div className="question-mark" />
        </div>
      </div>
    </div>
  );
};