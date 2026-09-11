import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Zap, ArrowUpRight, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, User } from 'lucide-react';
import { api } from '../services/api';

export default function AiHotelAnalyst() {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      title: 'Good day, Manager Rajesh!',
      isInitial: true,
      summary: 'Overall hotel performance improved by 12.8% compared with last week.',
      positive: [
        'Revenue increased 13.5% (₹48.6L vs ₹42.8L prior week)',
        'Occupancy increased 10.1% group-wide (78.4% avg)',
        'Food & Restaurant orders increased 19.7%'
      ],
      needsAttention: [
        'Kodaikanal weekday occupancy is low (54%)',
        'Ooty cancellation rate increased (+18%)'
      ],
      recommendation: 'Increase weekday promotional packages in Kodaikanal and investigate OTA cancellations in Ooty.'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const quickQuestions = [
    'Which branch performed best this week?',
    'Which branch needs attention?',
    'What was our revenue last week?',
    'Which room category is most profitable?',
    'Show me top food items',
    'Give me recommendations for next week'
  ];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const q = (queryText || inputVal).trim();
    if (!q) return;

    // Append user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Call Express API endpoint
    try {
      const response = await api.queryAi(q);
      setIsTyping(false);

      if (response) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            title: response.title,
            summary: response.summary,
            positive: response.positive,
            needsAttention: response.needsAttention,
            recommendation: response.recommendation
          }
        ]);
      } else {
        // Fallback response if offline
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            title: `Analysis for "${q}"`,
            summary: 'Cross-referenced operational analytics across all 8 branches.',
            positive: [
              'Revenue tracking at ₹48.6L (+13.5% pace)',
              'Occupancy healthy at 78.4%'
            ],
            needsAttention: [
              'Ooty cancellation rate (+18%)',
              'Kodaikanal weekday dip (54%)'
            ],
            recommendation: 'Target weekday corporate packages and tighten OTA cancellation policies.'
          }
        ]);
      }
    } catch (e) {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-column" id="ai-analyst">
      <div className="ai-agent-card">
        {/* Card Header */}
        <div className="ai-card-header">
          <div className="ai-identity">
            <div className="ai-avatar-animated">
              <Bot size={20} />
            </div>
            <div>
              <div className="ai-name-row">
                <h4>AI Hotel Analyst</h4>
                <span className="ai-online-dot"></span>
              </div>
              <span className="ai-role-text">Poppys Hospitality Intelligence v2.4</span>
            </div>
          </div>
          <div className="ai-status-chip">
            <Sparkles size={11} /> Active
          </div>
        </div>

        {/* Chat Body */}
        <div className="ai-chat-body" ref={chatBodyRef}>
          {messages.map((m) => {
            if (m.sender === 'user') {
              return (
                <div key={m.id} className="ai-message user-msg">
                  <div className="msg-avatar">
                    <User size={14} />
                  </div>
                  <div className="msg-bubble">
                    <p>{m.text}</p>
                  </div>
                </div>
              );
            }

            return (
              <div key={m.id} className="ai-message bot-msg">
                <div className="msg-avatar">
                  <Sparkles size={14} />
                </div>
                <div className="msg-bubble">
                  {m.isInitial && (
                    <>
                      <p className="ai-intro-head"><strong>{m.title}</strong></p>
                      <p style={{ marginBottom: 8 }}>
                        I have continuously analyzed operations across all 8 Poppys branches. Here is your synthesized executive brief for this week:
                      </p>
                    </>
                  )}

                  {!m.isInitial && (
                    <div className="ai-intro-head"><strong>{m.title}</strong></div>
                  )}

                  <div className="ai-sample-brief">
                    {m.summary && (
                      <div className="brief-highlight">
                        <TrendingUp size={16} className="text-success" />
                        <span>{m.summary}</span>
                      </div>
                    )}

                    {m.positive?.length > 0 && (
                      <div className="brief-section">
                        <span className="brief-sub positive-sub">
                          <CheckCircle2 size={12} /> Positive Highlights:
                        </span>
                        <ul>
                          {m.positive.map((pos, idx) => (
                            <li key={idx}>{pos}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {m.needsAttention?.length > 0 && (
                      <div className="brief-section">
                        <span className="brief-sub attention-sub">
                          <AlertTriangle size={12} /> Needs Attention:
                        </span>
                        <ul>
                          {m.needsAttention.map((att, idx) => (
                            <li key={idx}>{att}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {m.recommendation && (
                      <div className="brief-recommendation">
                        <span className="rec-label">
                          <Lightbulb size={12} /> Recommendation:
                        </span>
                        <p>"{m.recommendation}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="ai-message bot-msg">
              <div className="msg-avatar">
                <Sparkles size={14} />
              </div>
              <div className="msg-bubble">
                <p><em>Analyzing operations across 8 branches...</em></p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="ai-quick-questions">
          <span className="quick-title">
            <Zap size={11} style={{ color: '#c59b27' }} /> Quick Questions
          </span>
          <div className="quick-chips-wrap">
            {quickQuestions.map((q) => (
              <button 
                key={q} 
                className="quick-chip"
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Search / Chat Input */}
        <div className="ai-input-container">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Ask anything about your hotel performance..." 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button type="submit" className="ai-send-btn" title="Send Query">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
          <div className="ai-footnote">
            <span>Poppys AI Analytics &bull; Natural Language Query Engine &bull; Demo Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}
