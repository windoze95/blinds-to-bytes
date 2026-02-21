import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Mic,
  ArrowLeft,
  Send,
  Clock,
  StopCircle,
  Loader2,
  User,
  Bot,
  Play,
  AlertCircle,
} from 'lucide-react';
import { useAI } from '../../hooks/useAI.js';
import { useTimer } from '../../hooks/useTimer.js';
import { useProgress } from '../../hooks/useProgress.js';
import { useApp } from '../../context/AppContext.jsx';

const INTERVIEW_TYPES = [
  {
    id: 'interviewer',
    label: 'AI Role Interview',
    description: 'Full interview for a non-engineering AI role. The AI acts as a hiring manager assessing your technical knowledge, communication, and problem-solving.',
    duration: 45,
    color: 'workshop',
  },
  {
    id: 'behavioral',
    label: 'Behavioral Interview',
    description: 'Standard behavioral questions reframed for an AI career transition. Focus on STAR format and connecting your trade experience to AI roles.',
    duration: 30,
    color: 'blue',
  },
  {
    id: 'technical',
    label: 'Technical Explainer',
    description: 'The AI tests your depth of understanding by asking you to explain AI concepts clearly. Starts simple and gets progressively harder.',
    duration: 30,
    color: 'emerald',
  },
];

export default function MockInterview() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { sendInterview, loading, error } = useAI();
  const { saveInterview, updateProgress } = useProgress();

  const [selectedType, setSelectedType] = useState(type || null);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ended, setEnded] = useState(false);
  const [scorecard, setScorecard] = useState(null);

  const interviewConfig = INTERVIEW_TYPES.find((t) => t.id === selectedType) || null;
  const countdownSeconds = interviewConfig ? interviewConfig.duration * 60 : 0;
  const { formatted, seconds, isRunning, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer(countdownSeconds);

  const chatEndRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_SECTION', payload: 14 });
  }, [dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isRunning && seconds <= 0 && started && !ended) {
      handleEndInterview();
    }
  }, [seconds, isRunning, started, ended]);

  const handleStartInterview = async () => {
    setStarted(true);
    setMessages([]);
    setEnded(false);
    setScorecard(null);
    resetTimer(countdownSeconds);
    startTimer();

    const aiMessages = [{ role: 'user', content: 'Please begin the interview. Introduce yourself and ask your first question.' }];
    const response = await sendInterview(aiMessages, selectedType);

    if (response) {
      setMessages([{ role: 'assistant', content: response }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading || ended) return;

    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    const response = await sendInterview(
      updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      selectedType
    );

    if (response) {
      setMessages([...updatedMessages, { role: 'assistant', content: response }]);
    }
  };

  const handleEndInterview = async () => {
    stopTimer();
    setEnded(true);

    const endMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: 'The interview is now over. Please provide a detailed scorecard with ratings on a 1-5 scale for each category, specific feedback on strengths and areas for improvement, and an overall assessment of interview readiness.' },
    ];

    const response = await sendInterview(endMessages, selectedType);

    if (response) {
      setScorecard(response);
      setMessages([...messages, { role: 'assistant', content: response }]);
    }

    const elapsed = countdownSeconds - seconds;
    await saveInterview({
      interview_type: selectedType,
      transcript: messages,
      ai_feedback: response || '',
      duration_seconds: elapsed,
    });

    updateProgress({
      section: 14,
      activity_type: 'interview',
      activity_id: selectedType,
      status: 'completed',
      time_spent_seconds: elapsed,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Interview type selection
  if (!selectedType || (!started && !type)) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Mock Interview Simulator</h1>
            <p className="text-surface-400 mt-1">Practice for AI job interviews with an AI interviewer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INTERVIEW_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`card-hover text-left space-y-4 ${selectedType === t.id ? 'border-workshop-500/60 shadow-workshop-500/10 shadow-lg' : ''}`}
            >
              <div className="flex items-center justify-between">
                <Mic className={`w-8 h-8 ${t.color === 'workshop' ? 'text-workshop-400' : t.color === 'blue' ? 'text-blue-400' : 'text-emerald-400'}`} />
                <span className="badge bg-surface-700 text-surface-300">{t.duration} min</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-100">{t.label}</h3>
              <p className="text-surface-400 text-sm leading-relaxed">{t.description}</p>
            </button>
          ))}
        </div>

        {selectedType && (
          <div className="flex justify-center">
            <button onClick={handleStartInterview} className="btn-primary flex items-center gap-2 text-lg px-8 py-3">
              <Play className="w-5 h-5" /> Start Interview
            </button>
          </div>
        )}
      </div>
    );
  }

  // Active interview
  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-800">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/interview')} className="btn-secondary flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-lg font-bold text-gray-100">{interviewConfig?.label}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 font-mono text-sm ${seconds <= 300 && isRunning ? 'text-red-400' : 'text-surface-400'}`}>
            <Clock className="w-4 h-4" />
            {formatted}
          </div>
          {!ended && started && (
            <button onClick={handleEndInterview} className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-sm">
              <StopCircle className="w-4 h-4" /> End Interview
            </button>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-workshop-500/15 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-workshop-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-workshop-500/15 text-gray-200 rounded-br-sm'
                  : 'bg-surface-800 text-surface-300 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-surface-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-surface-300" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-workshop-500/15 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-workshop-400" />
            </div>
            <div className="bg-surface-800 p-4 rounded-xl rounded-bl-sm">
              <Loader2 className="w-5 h-5 text-surface-400 animate-spin" />
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/5 border border-red-500/20 px-4 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      {!ended ? (
        <div className="pt-4 border-t border-surface-800">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
              rows={2}
              className="flex-1 bg-surface-800 border border-surface-700 rounded-lg p-3 text-gray-200 placeholder-surface-500 resize-none focus:outline-none focus:border-workshop-500/50 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-primary px-4 self-end disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-surface-600 text-xs mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      ) : (
        <div className="pt-4 border-t border-surface-800">
          <div className="flex justify-between items-center">
            <p className="text-surface-400 text-sm">Interview ended. Scorecard has been saved.</p>
            <div className="flex gap-3">
              <button onClick={handleStartInterview} className="btn-secondary text-sm flex items-center gap-2">
                <Play className="w-4 h-4" /> New Interview
              </button>
              <button onClick={() => navigate('/progress')} className="btn-primary text-sm">
                View Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
