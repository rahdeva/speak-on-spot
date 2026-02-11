import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Home,
  Check,
  Shuffle,
  Clock,
  Timer,
  ArrowLeft,
} from "lucide-react";
import confetti from "canvas-confetti";

const TOPICS = {
  quotes: [
    "\"Luck is what happens when preparation meets opportunity.\" - Seneca",
    "\"The only way to do great work is to love what you do.\" - Steve Jobs",
    "\"It always seems impossible until it's done.\" - Nelson Mandela",
    "\"Comparison is the thief of joy.\" - Theodore Roosevelt",
    "\"Your time is limited, so don't waste it living someone else's life.\" - Steve Jobs",
    "\"We suffer more in imagination than in reality.\" - Seneca",
    "\"Do what you can, with what you have, where you are.\" - Theodore Roosevelt",
    "\"Whether you think you can or you think you can't, you're right.\" - Henry Ford",
    "\"Success is not final, failure is not fatal.\" - Winston Churchill",
    "\"Happiness depends upon ourselves.\" - Aristotle",
    "\"Don't count the days, make the days count.\" - Muhammad Ali",
    "\"The journey of a thousand miles begins with one step.\" - Lao Tzu",
    "\"Be yourself; everyone else is already taken.\" - Oscar Wilde",
    "\"In the middle of difficulty lies opportunity.\" - Albert Einstein",
    "\"Discipline is choosing between what you want now and what you want most.\" - Abraham Lincoln",
    "\"If you want to go fast, go alone. If you want to go far, go together.\" - African Proverb",
    "\"Life is what happens when you're busy making other plans.\" - John Lennon",
    "\"What we think, we become.\" - Buddha",
    "\"The best way to predict the future is to create it.\" - Peter Drucker",
    "\"Small progress is still progress.\" - Unknown",

    "\"Believe you can and you're halfway there.\" - Theodore Roosevelt",
    "\"Action is the foundational key to all success.\" - Pablo Picasso",
    "\"Dream big and dare to fail.\" - Norman Vaughan",
    "\"Opportunities don't happen. You create them.\" - Chris Grosser",
    "\"Start where you are. Use what you have.\" - Arthur Ashe",
    "\"Quality is not an act, it is a habit.\" - Aristotle",
    "\"The secret of getting ahead is getting started.\" - Mark Twain",
    "\"You don't have to be great to start, but you have to start to be great.\" - Zig Ziglar",
    "\"If it matters to you, you'll find a way.\" - Unknown",
    "\"Courage doesn't always roar.\" - Mary Anne Radmacher",

    "\"A smooth sea never made a skilled sailor.\" - Proverb",
    "\"Progress, not perfection.\" - Unknown",
    "\"Doubt kills more dreams than failure ever will.\" - Suzy Kassem",
    "\"What you do today can improve all your tomorrows.\" - Ralph Marston",
    "\"Focus on being productive instead of busy.\" - Tim Ferriss",
    "\"Great things are done by a series of small things.\" - Vincent Van Gogh",
    "\"Growth begins at the end of your comfort zone.\" - Unknown",
    "\"If you're not willing to risk, you cannot grow.\" - John Maxwell",
    "\"Simplicity is the ultimate sophistication.\" - Leonardo da Vinci",
    "\"The best time to start was yesterday. The next best time is now.\" - Unknown",
  ],

  statements: [
    "Hard work matters more than talent.",
    "Being busy is not the same as being productive.",
    "Consistency is more important than motivation.",
    "Money can buy happiness up to a certain point.",
    "Failure is essential for growth.",
    "Comfort zones limit potential.",
    "Confidence matters more than intelligence.",
    "Technology has made us more distracted.",
    "Work-life balance is a personal responsibility.",
    "Success depends more on habits than goals.",

    "Saying no is an underrated skill.",
    "Discipline beats motivation in the long run.",
    "Social media affects self-esteem.",
    "Freedom is more valuable than stability.",
    "Most people underestimate long-term growth.",
    "Listening is more powerful than speaking.",
    "Experience is the best teacher.",
    "Fear often holds people back.",
    "Learning never truly stops.",
    "Small improvements compound over time.",

    "Time is more valuable than money.",
    "Mental health should be a priority.",
    "Comfort can become a trap.",
    "Adaptability is a survival skill.",
    "Confidence is built, not inherited.",
    "Success looks different for everyone.",
    "Failure teaches faster than success.",
    "Patience is a competitive advantage.",
    "Curiosity leads to better decisions.",
    "Rest is part of productivity.",

    "People grow through challenges.",
    "Clarity matters more than speed.",
    "Self-awareness improves leadership.",
    "Habits shape identity.",
    "Progress requires discomfort.",
    "Focus is a scarce resource.",
    "Growth requires honesty with oneself.",
    "Learning from others saves time.",
    "Mindset affects outcomes.",
    "Direction matters more than pace.",
  ],

  questions: [
    "What does success mean to you right now?",
    "What habit has improved your life the most?",
    "What is something you learned the hard way?",
    "What does confidence look like in daily life?",
    "Who has influenced you the most?",
    "What is a small win you are proud of?",
    "When was the last time you left your comfort zone?",
    "What fear would you like to overcome?",
    "What makes a conversation meaningful?",
    "What does balance mean to you?",

    "What lesson do you wish you learned earlier?",
    "What motivates you on difficult days?",
    "What belief have you changed over time?",
    "What does growth mean to you personally?",
    "What kind of person do you want to become?",
    "What decision shaped your life the most?",
    "What does success look like in five years?",
    "What habit would you like to build?",
    "What distracts you the most?",
    "What helps you stay focused?",

    "What makes work meaningful to you?",
    "What is your definition of happiness?",
    "What challenge taught you the most?",
    "What does leadership mean to you?",
    "What skill do you want to improve?",
    "What does freedom mean to you?",
    "What makes someone trustworthy?",
    "What does confidence sound like?",
    "What advice would you give your younger self?",
    "What keeps you curious?",

    "What does failure teach us?",
    "What makes a good life?",
    "What role does discipline play in success?",
    "What does balance between ambition and rest look like?",
    "What makes progress feel real?",
    "What does personal growth require?",
    "What kind of legacy do you want to leave?",
    "What habit would you remove from your life?",
    "What makes learning enjoyable?",
    "What does courage look like today?",
  ],
};

const TIME_PRESETS = [
  { label: "1-2 min", min: 1, max: 2 },
  { label: "2-3 min", min: 2, max: 3 },
  { label: "4-6 min", min: 4, max: 6 },
  { label: "5-7 min", min: 5, max: 7 },
  { label: "10-12 min", min: 10, max: 12 },
  { label: "15-20 min", min: 15, max: 20 },
  { label: "18-22 min", min: 18, max: 22 },
  { label: "20-35 min", min: 20, max: 35 },
];

interface PracticeTimerProps {
  onReset: () => void;
}

export function PracticeTimer({ onReset }: PracticeTimerProps) {
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [topicType, setTopicType] = useState<'quotes' | 'statements' | 'questions'>('questions');
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'timeRange'>('timeRange');
  const [selectedPreset, setSelectedPreset] = useState<string>('1-2 min');
  const [customMin, setCustomMin] = useState<string>('');
  const [customMax, setCustomMax] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const generateRandomTopic = () => {
    // Validate custom time range if Time Range mode is selected
    if (timerMode === 'timeRange' && showCustomInput) {
      const min = parseInt(customMin);
      const max = parseInt(customMax);
      
      if (!customMin || !customMax) {
        alert('Please enter both minimum and maximum time values.');
        return;
      }
      
      if (isNaN(min) || isNaN(max)) {
        alert('Please enter valid numbers for time range.');
        return;
      }
      
      if (min <= 0 || max <= 0) {
        alert('Time values must be greater than 0.');
        return;
      }
      
      if (min >= max) {
        alert('Minimum time must be less than maximum time.');
        return;
      }
    }
    
    const topicsArray = TOPICS[topicType];
    const randomTopic = topicsArray[Math.floor(Math.random() * topicsArray.length)];
    setCurrentTopic(randomTopic);
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleRestart = () => {
    setTime(0);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleNewTopic = () => {
    setCurrentTopic("");
    setTime(0);
    setIsRunning(false);
    setIsCompleted(false);
    setShowSettings(true);
  };

  const getEncouragement = () => {
    if (time < 60) return "You're doing great! Keep going!";
    if (time < 120) return "Amazing! You're on fire! 🔥";
    if (time < 180) return "Wow! Over 2 minutes! Fantastic!";
    return "Incredible! You're a speaking superstar! ⭐";
  };

  // Calculate timer background color for Time Range mode
  const getTimerBackgroundColor = () => {
    if (timerMode !== 'timeRange') {
      return '#8B5CF6'; // Default purple background
    }

    let timeRange;
    if (showCustomInput) {
      const min = parseInt(customMin);
      const max = parseInt(customMax);
      if (min && max && min < max) {
        timeRange = { min, max };
      }
    } else {
      const preset = TIME_PRESETS.find(p => p.label === selectedPreset);
      timeRange = preset;
    }

    if (!timeRange) return '#8B5CF6';

    const timeInMinutes = time / 60;
    const minTime = timeRange.min;
    const maxTime = timeRange.max;

    if (timeInMinutes < minTime) {
      // Before minimum time - purple
      return '#8B5CF6';
    } else if (timeInMinutes >= minTime && timeInMinutes < maxTime) {
      // Between min and max - calculate gradient from green to yellow to orange
      const progress = (timeInMinutes - minTime) / (maxTime - minTime);
      
      if (progress < 0.5) {
        // Green phase (first half)
        return '#34D399'; // Emerald
      } else if (progress < 0.8) {
        // Yellow phase (middle portion)
        return '#FBBF24'; // Amber
      } else {
        // Orange phase (approaching max)
        return '#FB923C'; // Orange
      }
    } else {
      // At or past maximum time - red
      return '#EF4444'; // Red
    }
  };

  const getTimeRangeInfo = () => {
    if (timerMode !== 'timeRange') return null;

    let timeRange;
    if (showCustomInput) {
      const min = parseInt(customMin);
      const max = parseInt(customMax);
      if (min && max && min < max) {
        timeRange = { min, max };
      }
    } else {
      const preset = TIME_PRESETS.find(p => p.label === selectedPreset);
      timeRange = preset;
    }

    if (!timeRange) return null;

    const timeInMinutes = time / 60;
    const minTime = timeRange.min;
    const maxTime = timeRange.max;

    if (timeInMinutes < minTime) {
      const remaining = minTime - timeInMinutes;
      return `${remaining.toFixed(1)} min to minimum`;
    } else if (timeInMinutes >= minTime && timeInMinutes < maxTime) {
      const remaining = maxTime - timeInMinutes;
      return `${remaining.toFixed(1)} min remaining`;
    } else {
      const overtime = timeInMinutes - maxTime;
      return `+${overtime.toFixed(1)} min overtime`;
    }
  };

  const getTopicTypeLabel = () => {
    if (topicType === 'quotes') return 'Quote';
    if (topicType === 'statements') return 'Statement';
    return 'Question';
  };

  const parseQuote = () => {
    if (topicType !== 'quotes') return { text: currentTopic, author: null };
    
    // Split quote by the dash before the author
    const parts = currentTopic.split(' - ');
    if (parts.length === 2) {
      return {
        text: parts[0].replace(/^"|"$/g, ''), // Remove surrounding quotes
        author: parts[1]
      };
    }
    return { text: currentTopic, author: null };
  };

  return (
    <section className="min-h-screen px-6 py-12 flex items-center justify-center bg-background">
      <div className="max-w-7xl w-full">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white border-2 border-foreground rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#8B5CF6] mb-8 animate-pop-in">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={onReset}
                className="group relative p-3 bg-white text-foreground rounded-full border-2 border-foreground font-bold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[#F472B6] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  boxShadow: "3px 3px 0px 0px #1E293B",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "4px 4px 0px 0px #1E293B";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "3px 3px 0px 0px #1E293B";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = "1px 1px 0px 0px #1E293B";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = "4px 4px 0px 0px #1E293B";
                }}
              >
                <ArrowLeft className="size-5" strokeWidth={2.5} />
              </button>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Setup Your Practice
              </h2>
            </div>

            {/* Topic Type Selection */}
            <div className="mb-6">
              <label className="text-sm uppercase tracking-wider text-muted-foreground block mb-4">
                Topic Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setTopicType('statements')}
                  className={`px-4 py-3 rounded-xl border-2 border-foreground font-bold transition-all duration-200 ${
                    topicType === 'statements' 
                      ? 'bg-[#F472B6] text-white shadow-[3px_3px_0px_0px_#1E293B]' 
                      : 'bg-white text-foreground hover:bg-[#F1F5F9]'
                  }`}
                >
                  Statement
                </button>
                <button
                  onClick={() => setTopicType('quotes')}
                  className={`px-4 py-3 rounded-xl border-2 border-foreground font-bold transition-all duration-200 ${
                    topicType === 'quotes' 
                      ? 'bg-[#F472B6] text-white shadow-[3px_3px_0px_0px_#1E293B]' 
                      : 'bg-white text-foreground hover:bg-[#F1F5F9]'
                  }`}
                >
                  Quote
                </button>
                <button
                  onClick={() => setTopicType('questions')}
                  className={`px-4 py-3 rounded-xl border-2 border-foreground font-bold transition-all duration-200 ${
                    topicType === 'questions' 
                      ? 'bg-[#F472B6] text-white shadow-[3px_3px_0px_0px_#1E293B]' 
                      : 'bg-white text-foreground hover:bg-[#F1F5F9]'
                  }`}
                >
                  Question
                </button>
              </div>
            </div>

            {/* Timer Mode Selection */}
            <div className="mb-6">
              <label className="text-sm uppercase tracking-wider text-muted-foreground block mb-4">
                Timer Mode
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setTimerMode('timeRange')}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 border-foreground font-bold transition-all duration-200 ${
                    timerMode === 'timeRange' 
                      ? 'bg-[#8B5CF6] text-white shadow-[3px_3px_0px_0px_#1E293B]' 
                      : 'bg-white text-foreground hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Timer className="size-4" strokeWidth={2.5} />
                    <span>Time Range</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setTimerMode('stopwatch')}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 border-foreground font-bold transition-all duration-200 ${
                    timerMode === 'stopwatch' 
                      ? 'bg-[#8B5CF6] text-white shadow-[3px_3px_0px_0px_#1E293B]' 
                      : 'bg-white text-foreground hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="size-4" strokeWidth={2.5} />
                    <span>Stopwatch</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Time Range Settings */}
            {timerMode === 'timeRange' && (
              <div className="mb-6">
                <label className="text-sm uppercase tracking-wider text-muted-foreground block mb-4">
                  Time Range
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className={`px-3 py-1.5 rounded-lg border-2 border-foreground text-xs font-bold transition-all ${
                      !showCustomInput 
                        ? 'bg-[#FBBF24] text-foreground' 
                        : 'bg-white text-muted-foreground hover:bg-[#F1F5F9]'
                    }`}
                  >
                    Preset
                  </button>
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className={`px-3 py-1.5 rounded-lg border-2 border-foreground text-xs font-bold transition-all ${
                      showCustomInput 
                        ? 'bg-[#FBBF24] text-foreground' 
                        : 'bg-white text-muted-foreground hover:bg-[#F1F5F9]'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {!showCustomInput ? (
                  <select
                    value={selectedPreset}
                    onChange={(e) => setSelectedPreset(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground font-bold bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  >
                    {TIME_PRESETS.map((preset) => (
                      <option key={preset.label} value={preset.label}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground font-normal block mb-1.5">
                        Minimum (minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 1"
                        value={customMin}
                        onChange={(e) => setCustomMin(e.target.value)}
                        min="1"
                        className="w-full px-4 py-3 rounded-xl border-2 border-foreground font-bold bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] placeholder:text-muted-foreground placeholder:font-normal"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-normal block mb-1.5">
                        Maximum (minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 2"
                        value={customMax}
                        onChange={(e) => setCustomMax(e.target.value)}
                        min="1"
                        className="w-full px-4 py-3 rounded-xl border-2 border-foreground font-bold bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] placeholder:text-muted-foreground placeholder:font-normal"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Generate Topic Button */}
            <button
              onClick={generateRandomTopic}
              className="w-full px-8 py-4 bg-[#34D399] text-foreground rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
              style={{
                boxShadow: "4px 4px 0px 0px #1E293B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "6px 6px 0px 0px #1E293B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "4px 4px 0px 0px #1E293B";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = "2px 2px 0px 0px #1E293B";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = "6px 6px 0px 0px #1E293B";
              }}
            >
              <span className="flex items-center justify-center gap-3">
                <Shuffle className="size-5" strokeWidth={2.5} />
                Generate Topic
              </span>
            </button>
          </div>
        )}

        {/* Practice Interface */}
        {currentTopic && !showSettings && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Practice Area */}
            <div className="flex-1">
              <div className="bg-white border-2 border-foreground rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#8B5CF6] animate-pop-in">
                <div className="flex items-start justify-between mb-4">
                  <label className="text-sm uppercase tracking-wider text-muted-foreground">
                    {getTopicTypeLabel()}
                  </label>
                  {timerMode === 'timeRange' && (
                    <div className="bg-[#8B5CF6] text-white px-3 py-1 rounded-full border-2 border-foreground text-xs font-bold shadow-[2px_2px_0px_0px_#1E293B]">
                      {!showCustomInput ? selectedPreset : `${customMin}-${customMax} min`}
                    </div>
                  )}
                </div>
                
                {topicType === 'quotes' ? (
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 italic">
                      "{parseQuote().text}"
                    </h2>
                    {parseQuote().author && (
                      <p className="text-xl md:text-2xl text-muted-foreground font-bold">
                        — {parseQuote().author}
                      </p>
                    )}
                  </div>
                ) : (
                  <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-8">
                    {currentTopic}
                  </h2>
                )}

                {/* Timer Display with dynamic background */}
                <div className="relative mb-8">
                  <div 
                    className="rounded-2xl border-2 border-foreground p-8 text-center shadow-[6px_6px_0px_0px_#1E293B] transition-colors duration-1000"
                    style={{ backgroundColor: getTimerBackgroundColor() }}
                  >
                    <div className="text-7xl md:text-9xl font-extrabold tabular-nums text-white">
                      {formatTime(time)}
                    </div>
                  </div>

                  {/* Decorative circles */}
                  <div
                    className="absolute -top-4 -left-4 w-12 h-12 bg-[#F472B6] rounded-full border-2 border-foreground animate-pop-in"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#34D399] rounded-full border-2 border-foreground animate-pop-in"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>

                {/* Encouragement message */}
                {isRunning && (
                  <div className="text-center mb-8 animate-pop-in">
                    <p className="text-xl font-bold text-[#8B5CF6]">
                      {getEncouragement()}
                    </p>
                  </div>
                )}

                {/* Completion message */}
                {isCompleted && (
                  <div className="bg-[#34D399] border-2 border-foreground rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_0px_#1E293B] animate-pop-in text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-2xl font-extrabold mb-2">
                      Fantastic Job!
                    </h3>
                    <p className="text-lg">
                      You spoke for {formatTime(time)}! That's amazing progress!
                    </p>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handlePlayPause}
                    disabled={isCompleted}
                    className="group relative px-8 py-4 bg-[#8B5CF6] text-white rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      boxShadow: "4px 4px 0px 0px #1E293B",
                    }}
                    onMouseEnter={(e) => {
                      if (!isCompleted)
                        e.currentTarget.style.boxShadow = "6px 6px 0px 0px #1E293B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "4px 4px 0px 0px #1E293B";
                    }}
                    onMouseDown={(e) => {
                      if (!isCompleted)
                        e.currentTarget.style.boxShadow = "2px 2px 0px 0px #1E293B";
                    }}
                    onMouseUp={(e) => {
                      if (!isCompleted)
                        e.currentTarget.style.boxShadow = "6px 6px 0px 0px #1E293B";
                    }}
                  >
                    <span className="flex items-center gap-3">
                      {isRunning ? (
                        <>
                          <Pause className="size-5" strokeWidth={2.5} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="size-5" strokeWidth={2.5} />
                          {time > 0 ? "Resume" : "Start"}
                        </>
                      )}
                    </span>
                  </button>

                  {!isCompleted && time > 0 && (
                    <button
                      onClick={handleComplete}
                      className="group relative px-8 py-4 bg-[#34D399] text-foreground rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 animate-pop-in"
                      style={{
                        boxShadow: "4px 4px 0px 0px #1E293B",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "6px 6px 0px 0px #1E293B";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "4px 4px 0px 0px #1E293B";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow = "2px 2px 0px 0px #1E293B";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "6px 6px 0px 0px #1E293B";
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <Check className="size-5" strokeWidth={2.5} />
                        Done
                      </span>
                    </button>
                  )}

                  <button
                    onClick={handleRestart}
                    className="group relative px-6 py-4 bg-white text-foreground rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[#FBBF24]"
                  >
                    <RotateCcw className="size-5" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={handleNewTopic}
                    className="group relative px-8 py-4 bg-white text-foreground rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[#F472B6]"
                  >
                    <span className="flex items-center gap-2">
                      <Shuffle className="size-5" strokeWidth={2.5} />
                      New Topic
                    </span>
                  </button>

                  <button
                    onClick={onReset}
                    className="group relative px-6 py-4 bg-white text-foreground rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[#34D399]"
                  >
                    <Home className="size-5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tips Section - Right sidebar on desktop */}
            <div className="lg:w-96">
              <div
                className="bg-white border-2 border-foreground rounded-2xl p-6 shadow-[4px_4px_0px_0px_#F472B6] animate-pop-in sticky top-6"
                style={{ animationDelay: "0.1s" }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-[#8B5CF6] rounded-full"></span>
                  Quick Tips
                </h3>
                
                {/* PREP Framework */}
                <div className="mb-6 bg-[#FFFDF5] border-2 border-foreground rounded-xl p-4 shadow-[2px_2px_0px_0px_#1E293B]">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-[#8B5CF6]">✨</span>
                    PREP Framework
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">P</span>
                      <span><strong>Point</strong> - State your main idea</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F472B6] font-bold">R</span>
                      <span><strong>Reason</strong> - Explain why</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBBF24] font-bold">E</span>
                      <span><strong>Example</strong> - Give evidence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#34D399] font-bold">P</span>
                      <span><strong>Point</strong> - Restate your idea</span>
                    </li>
                  </ul>
                </div>

                {/* General Tips */}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#34D399] font-bold">•</span>
                    <span>Take a deep breath before you start</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F472B6] font-bold">•</span>
                    <span>Structure: Introduction → Main Points → Conclusion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FBBF24] font-bold">•</span>
                    <span>Don't worry about perfection, focus on clarity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B5CF6] font-bold">•</span>
                    <span>Use personal examples to make your speech relatable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}