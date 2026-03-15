import { useState } from "react";
import { Link } from "react-router-dom";
import "./chatBot.css";

function formatPrice(price) {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }

  return `£${amount.toLocaleString()}`;
}

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I am your Grand Abode assistant. Ask me about listings, budgets, or locations.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) {
      return;
    }

    const userMessage = { role: "user", text: trimmedInput };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!res.ok) {
        throw new Error("Unable to reach chatbot service.");
      }

      const data = await res.json();
      const replyText =
        typeof data.reply === "string" && data.reply.trim()
          ? data.reply
          : "I could not generate a response right now. Please try again.";
      const listings = Array.isArray(data.listings)
        ? data.listings
        : [];

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: replyText,
          listings,
        },
      ]);
    } catch (_error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: "I am having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chatbot-card">
      <div className="chatbot-header">
        <h3>Grand Abode Assistant</h3>
        <p>Ask about homes, budgets, and local areas.</p>
      </div>

      <div className="chatbot-messages" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={`chatbot-message chatbot-message-${msg.role}`}
          >
            <span className="chatbot-message-role">{msg.role}</span>
            <p>{msg.text}</p>

            {msg.role === "assistant" &&
              Array.isArray(msg.listings) &&
              msg.listings.length > 0 && (
                <ul className="chatbot-listings">
                  {msg.listings.map((listing, listingIndex) => (
                    <li
                      key={`${listing.id || "listing"}-${listingIndex}`}
                      className="chatbot-listing-item"
                    >
                      <Link
                        to={
                          listing.pageUrl ||
                          (listing.id
                            ? `/property/${listing.id}`
                            : "/search")
                        }
                        className="chatbot-listing-link"
                      >
                        <span className="chatbot-listing-title">
                          {listing.type || "Property"}
                        </span>
                        <span className="chatbot-listing-meta">
                          {Number.isFinite(Number(listing.bedrooms))
                            ? `${listing.bedrooms} bedrooms`
                            : "Bedrooms not set"} • {formatPrice(listing.price)} • {listing.location || "Location unavailable"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))}
      </div>

      <form className="chatbot-form" onSubmit={sendMessage}>
        <input
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          aria-label="Type your message"
        />

        <button
          type="submit"
          className="chatbot-send"
          disabled={isSending || !input.trim()}
        >
          {isSending ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Chatbot;