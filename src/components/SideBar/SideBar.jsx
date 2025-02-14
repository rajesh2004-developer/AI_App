import React, { useContext, useState } from 'react';
import './SideBar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const SideBar = () => {
  const [extented, setExtended] = useState(false);
  const { onSend, prevPrompts, setLoading, setRecentPrompt, setShowResult } =
    useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div
          onClick={() => {
            setShowResult(false);
            setLoading(false);
          }}
          className="new-chat"
        >
          <img src={assets.plus_icon} alt="" />
          {extented ? <p>New Chat</p> : null}
        </div>
        {extented ? (
          <div className="recent">
            <p className="recent-title">recent</p>
            {prevPrompts.map((prompt, index) => (
              <div
                onClick={() => loadPrompt(prompt)}
                key={index}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="" />
                <p>{prompt.slice(0, 20)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extented ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extented ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extented ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
