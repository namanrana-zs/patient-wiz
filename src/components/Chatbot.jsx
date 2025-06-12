import React, { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";
import { marked } from "marked";
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
   

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const formatToMarkdown = (text) => {
  return text
    .replace(/\n{2,}/g, '\n\n') // double newline = paragraph break
    .replace(/\n/g, '  \n')      // single newline = line break in markdown
    .replace(/- /g, '\n- ')      // ensure bullet items are detected
    // .replace(/: /g, ':\n\n ') // ensure colons are spaced
};


  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();

    setMessages((prevMsgs) => [
      ...prevMsgs,
      { id: Date.now(), text: userMsg, from: "user" },
      { id: "loader", text: "...", from: "bot", isLoader: true },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      getData(userMsg);
    }, 1000);
  };

  const getData = async (userMsg) => {
    const url =
      "https://maverick.maxai.zsservices.com/veevafastapi/maverick/qa";
    const requestBody = {
      question: userMsg,
      collection_id: "c4697a4f-c221-453e-ae91-b2de1daa629e",
      chat_id: "477a073e-3e22-49ed-a024-94891fbf79f1",
      user: "krishnaparag.yammanur@zs.com",
      agent: "maverick",
      files: [],
    };

    const username = "maverick_veeva_user";
    const password = "q6tWTgcC2W94";
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        body: JSON.stringify(requestBody),
      });

      const resp = await data.text();
      const formatResponse = marked(formatToMarkdown(resp));
      setMessages((msgs) => {
        const updated = msgs.filter((msg) => msg.id !== "loader");
        return [
          ...updated,
          { id: Date.now(), text: formatResponse, from: "bot" },
        ];
      });
    } catch (err) {
      console.error("API Error:", err);
      setMessages((msgs) => {
        const updated = msgs.filter((msg) => msg.id !== "loader");
        return [
          ...updated,
          { id: Date.now(), text: "Something went wrong.", from: "bot" },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <span
        style={{ position: "fixed", bottom: "5%", right: "5%", zIndex: 1000 }}
      >
        <button className={styles.button} onClick={() => setOpen(!open)}>
          {open ? "❌ Close Chat" : "💬 Chat"}
        </button>
      </span>

      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>Ask Me!</div>
          <div className={styles.chatBody}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.from === "bot" ? styles.botMessage : styles.userMessage
                }
              >
                {msg.isLoader ? (
                  <div className={styles.dotFlashing}></div>
                ) : (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    {msg.from === "bot" && (
                      <div className={styles.feedbackButtons}>
                        <span className={styles.thumb} title="Helpful">
                          <img src="../assets/thumbUp.jpg" alt="" />
                        </span>
                        <span className={styles.thumb} title="Not Helpful">
                          <img src="../assets/thumbDown.jpg" alt="" />
                        </span>
                      </div>
                    )}{" "}
                  </>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatInputArea}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.chatInput}
            />
            <button onClick={handleSend} className={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
