import React, { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";
import { marked } from "marked";
import emoji from "emoji-dictionary";
import MessageCircle from "../assets/message-circle.svg";
// import thumbsDown from "../assets/thumbs-down.svg";
// import thumbsUp from "../assets/thumbs-up.svg";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import download from "../assets/download.svg";
import house from "../assets/house.svg";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const collection_id = "c4697a4f-c221-453e-ae91-b2de1daa629e";
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi Jamie! Welcome back! Have questions about OFEV? </br></br>  Chat with me to find answers to your queries`,
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIntroBubble, setShowIntroBubble] = useState(false);
  const messagesEndRef = useRef(null);
  const now = new Date();

  const formatToMarkdown = (text) => {
    const withEmojis = replaceEmojis(text);
    return withEmojis
      .replace(/\n{2,}/g, "\n\n")
      .replace(/\n/g, "  \n")
      .replace(/- /g, "\n- ");
  };

  const formatTimestamp = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const replaceEmojis = (text) => {
    return text.replace(/:([a-zA-Z0-9_+-]+):/g, (match, name) => {
      const e = emoji.getUnicode(name);
      return e ? e : match;
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const timer = setTimeout(() => {
      setShowIntroBubble(true);
      setTimeout(() => setShowIntroBubble(false), 14000); // Show for 4 seconds
    }, 800); // Show it 1 second after page load

    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = (fromSuggestion = false, promptText = null) => {
    const userMsg = promptText ?? input.trim(); // Use passed prompt or current input
    if (!userMsg) return;

    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        text: userMsg,
        from: "user",
        fromSuggestion: fromSuggestion,
        timestamp: now,
      },
      {
        id: "loader",
        text: "...",
        from: "bot",
        isLoader: true,
        timestamp: now,
      },
    ]);

    setInput("");
    setIsLoading(true);

    getData(userMsg);
  };
  const getData = async (userMsg) => {
    console.log("User Message:", userMsg);
    const url =
      "https://maverick.maxai.zsservices.com/veevafastapi/maverick/qa";
    const requestBody = {
      question: userMsg,
      collection_id: collection_id,
      chat_id: "477a073e-3e22-49ed-a024-94891fbf19f1",
      user: "krishnaparag.yammanur@zs.com",
      agent: "maverick",
      files: [],
    };

    const username = "maverick_veeva_user";
    const password = "q6tWTgcC2W94";
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.body) {
        // fallback: if no streaming, get full text
        const respText = await response.text();
        const formatted = marked(formatToMarkdown(respText));
        setMessages((msgs) => {
          timestamp: new Date();
          const withoutLoader = msgs.filter((msg) => msg.id !== "loader");
          return [
            ...withoutLoader,
            {
              id: Date.now(),
              text: formatted,
              from: "bot",
              timestamp: new Date(),
            },
          ];
        });
        return;
      }

      // Streaming part
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let botMessageId = Date.now();

      // First remove loader and add empty bot message for streaming
      setMessages((msgs) => {
        const withoutLoader = msgs.filter((msg) => msg.id !== "loader");
        return [
          ...withoutLoader,
          { id: botMessageId, text: "", from: "bot", timestamp: new Date() },
        ];
      });

      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          accumulatedText += chunk;

          // Update message progressively
          setMessages((msgs) =>
            msgs.map((msg) =>
              msg.id === botMessageId
                ? {
                    ...msg,
                    text: marked(formatToMarkdown(accumulatedText)),
                    timestamp: new Date(),
                  }
                : msg
            )
          );
        }
      }
    } catch (err) {
      console.error("API Error:", err);
      setMessages((msgs) => {
        const withoutLoader = msgs.filter((msg) => msg.id !== "loader");
        return [
          ...withoutLoader,
          { id: Date.now(), text: "Something went wrong.", from: "bot" },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const getData = async (userMsg) => {
  //   const url =
  //     "https://maverick.maxai.zsservices.com/veevafastapi/maverick/qa";
  //   const requestBody = {
  //     question: userMsg,
  //     collection_id: collection_id,
  //     chat_id: "477a073e-3e22-49ed-a024-94891fbf19f6",
  //     user: "latoya.morris@zs.com",
  //     agent: "maverick",
  //     files: [],
  //   };

  //   const username = "maverick_veeva_user";
  //   const password = "q6tWTgcC2W94";
  //   const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  //   try {
  //     const data = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: basicAuth,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     const resp = await data.text();
  //     const formatResponse = marked(formatToMarkdown(resp));

  //     setMessages((msgs) => {
  //       const updated = msgs.filter((msg) => msg.id !== "loader");
  //       return [
  //         ...updated,
  //         { id: Date.now(), text: formatResponse, from: "bot" },
  //       ];
  //     });
  //   } catch (err) {
  //     console.error("API Error:", err);
  //     setMessages((msgs) => {
  //       const updated = msgs.filter((msg) => msg.id !== "loader");
  //       return [
  //         ...updated,
  //         { id: Date.now(), text: "Something went wrong.", from: "bot" },
  //       ];
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const downloadHistory = () => {
    const chatText = messages
      .map((msg) => {
        const sender = msg.from === "bot" ? "Assistant" : "You";
        const text = msg.text.replace(/<\/?[^>]+(>|$)/g, "");
        return `${sender}: ${text}`;
      })
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_history.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const newChat = () => {
    if (isLoading) return;
    setMessages([
      {
        id: 1,
        text: `Hi! I am Assistant, a new AI powered chat!</br></br> Have questions about OFEV? Chat with me to find answers to your queries`,
        from: "bot",
      },
    ]);
    setInput("");
  };

  const closeBtn = () => {
    setOpen(false);
  };

  return (
    <>
      <span className={styles.chatbotToggle}>
        <span onClick={() => setOpen(!open)}>
          {showIntroBubble && !open && (
            <div className={styles.introBubble}>
              Hi! I am Assistant <span className={styles.wave}>👋</span>
            </div>
          )}
          {!open && (
            <div className={styles.chatbotIcon}>
              <img src={MessageCircle} alt="chat" />
            </div>
          )}
        </span>
      </span>

      {open && (
        <div className={`${styles.chatWindow} ${styles.chatWindowActive}`}>
          <div className={styles.chatHeader}>
            <span>
              <b>Hi! I am Assistant</b>
              <br />
              How can I help you today?
            </span>
            <button className={styles.closeBtn} onClick={closeBtn}>
              ✕
            </button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.from === "bot"
                    ? styles.botMessage
                    : msg.fromSuggestion
                    ? ""
                    : styles.userMessage
                }
              >
                {msg.isLoader ? (
                  <div className={styles.dotFlashing}></div>
                ) : (
                  <>
                    {/* Timestamp */}
                    <div className={msg.from !== "bot" ? styles.timestampUser : styles.timestampBot}>
                      {msg.timestamp && formatTimestamp(msg.timestamp)}
                    </div>
                    {/* Message content */}
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    {msg.from === "bot" && (
                      <div
                        className={
                          msg.id !== 1
                            ? styles.feedbackButtons
                            : styles.feedbackButtonsNotActive
                        }
                      >
                        <span className={styles.thumb} title="Helpful">
                          <ThumbsUp />
                        </span>
                        <span className={styles.thumb} title="Not Helpful">
                          <ThumbsDown />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />

            {!isLoading &&
              messages.filter((msg) => msg.from === "user").length === 0 && (
                <div className={styles.suggestedPrompts}>
                  <p style={{ margin: "14px", fontWeight: "bold" }}>
                    Try asking below to get started:
                  </p>
                  <div className={styles.promptButtons}>
                    {[
                      "What is OFEV used for?",
                      "Clinical trails of OFEV",
                      "How should I take OFEV?",
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInput(prompt); // Set input to the prompt
                          handleSend(false, prompt); // Mark as from suggestion
                          // Call API with the prompt
                        }}
                        className={styles.promptButton}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className={styles.chatInputArea}>
            <span onClick={newChat}>
              <img
                title="Reset Chat"
                src={house}
                alt="IMF Icon"
                style={{
                  width: 22,
                  height: 22,
                  cursor: "pointer",
                  marginLeft: 5,
                  marginTop: "0.5rem",
                }}
              />
            </span>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.chatInput}
            />
            <div onClick={downloadHistory}>
              <img
                src={download}
                style={{
                  width: 22,
                  height: 22,
                  cursor: "pointer",
                  marginLeft: 5,
                  marginTop: "0.5rem",
                }}
                alt="Download"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
