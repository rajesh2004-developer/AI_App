import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Main = () => {
  const prompts = [
    {
      text: 'Suggest beautiful places to see on an upcoming road trip',
      icon: assets.compass_icon,
    },
    {
      text: 'Briefly explain this concept: entrepreneurship',
      icon: assets.bulb_icon,
    },
    {
      text: 'Brainstorm team bonding activities for our week retreat',
      icon: assets.message_icon,
    },
    {
      text: 'Improve the readability of the following code',
      icon: assets.code_icon,
    },
  ];

  const {
    onSend,
    recentPrompt,
    loading,
    resultData,
    input,
    setInput,
    showResult,
  } = useContext(Context);

  const cardPrompt = (e) => {};

  return (
    <div className="main">
      <div className="nav">
        <p>Rajesh AI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {prompts.map((item, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => onSend(item.text)}
                >
                  <p className="cardPrompt">{item.text}</p>
                  <img src={item.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="recent-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img
                  onClick={() => onSend(input)}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini could be inaccurate, cross check important information from
            browser search.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
