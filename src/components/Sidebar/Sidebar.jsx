import React, { useState } from "react";
import "./Sidebar.css";
import assets from "../../assets/assets";
import { useAiContext } from "../../context/AIContext";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompt, setRecentPrompt, onSent, newChat } = useAiContext();

  const loadPrompt = (prompt) => {
    onSent(prompt)
  }

  return (
    <div className={`sidebar`}>
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended((prev) => !prev)}
        />
        <div 
        className="new-chat"
        onClick={()=>newChat()}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((prompt, i) => (
              <div
              key={i} 
              className="recent-entry"
              onClick={()=>loadPrompt(prompt)}>
                <img src={assets.message_icon} alt="" />
                <p>{prompt.slice(0,18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;