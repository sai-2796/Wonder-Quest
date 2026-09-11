import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CheckCircle, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface QuestGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (starsEarned: number) => void;
}

export const QuestGameModal: React.FC<QuestGameModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    { num1: 6, target: 10, options: [3, 4, 5, 2], answer: 4, hint: 'Count the glowing stars to reach 10!' },
    { num1: 7, target: 10, options: [2, 4, 3, 5], answer: 3, hint: 'How many more starlight crystals needed?' },
    { num1: 2, target: 10, options: [6, 8, 7, 9], answer: 8, hint: '2 plus what makes 10 stars?' },
  ];

  const q = questions[currentStep];

  const handleSelect = (val: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(val);

    if (val === q.answer) {
      setIsCorrect(true);
      setScore((s) => s + 1);
      sound.playChime('correct');
    } else {
      setIsCorrect(false);
      sound.playChime('pop');
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((c) => c + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
      sound.playChime('fanfare');
    }
  };

  const handleFinish = () => {
    onComplete(20);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 overflow-hidden"
        >
          {/* Background sparkles */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-900 to-indigo-700 -z-0 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-400 text-indigo-950 font-bold text-xs rounded-full uppercase tracking-wider">
                  Node 3 Quest
                </span>
                <span className="text-xs text-amber-200 font-semibold">+20 ⭐ Reward</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                id="close-quest-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold mt-2 flex items-center gap-2 font-heading">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              Starlight Addition
            </h3>
            <p className="text-xs text-indigo-100">Combine stars to unlock the cosmic portal!</p>
          </div>

          <div className="relative pt-24 pb-2">
            {!isFinished ? (
              <div>
                {/* Progress indicators */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                          i === currentStep
                            ? 'w-6 bg-amber-500'
                            : i < currentStep
                            ? 'w-2 bg-emerald-500'
                            : 'w-2 bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Equation Card */}
                <div className="bg-amber-50/70 border-2 border-amber-200/80 rounded-2xl p-5 text-center mb-5">
                  <div className="flex items-center justify-center gap-3 text-3xl font-extrabold text-slate-800 font-playful">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-amber-200 text-indigo-700">
                      {q.num1}
                    </span>
                    <span className="text-amber-500">+</span>
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-amber-400 text-slate-900 rounded-xl shadow-md border-2 border-amber-500 animate-pulse">
                      {selectedAnswer !== null ? selectedAnswer : '?'}
                    </span>
                    <span className="text-amber-500">=</span>
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-xl shadow-sm">
                      {q.target}
                    </span>
                  </div>

                  {/* Visual Star Counters */}
                  <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
                    {Array.from({ length: q.num1 }).map((_, i) => (
                      <Star key={`filled-${i}`} className="w-5 h-5 text-amber-500 fill-amber-400" />
                    ))}
                    <span className="text-slate-400 mx-1">+</span>
                    {Array.from({ length: q.target - q.num1 }).map((_, i) => (
                      <Star
                        key={`empty-${i}`}
                        className={`w-5 h-5 ${
                          selectedAnswer === q.answer
                            ? 'text-amber-500 fill-amber-400 scale-110 transition-transform'
                            : 'text-slate-300 stroke-dashed'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => sound.speak(`${q.num1} plus what makes ${q.target}? ${q.hint}`)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 px-3 py-1 rounded-full"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Read hint aloud
                  </button>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {q.options.map((option) => {
                    const isPicked = selectedAnswer === option;
                    let btnStyle = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800 hover:bg-amber-50';
                    if (selectedAnswer !== null) {
                      if (option === q.answer) {
                        btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-md';
                      } else if (isPicked) {
                        btnStyle = 'bg-rose-500 border-rose-600 text-white shadow-md';
                      } else {
                        btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        disabled={selectedAnswer !== null}
                        className={`h-14 rounded-2xl border-2 font-bold text-2xl flex items-center justify-center transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Next */}
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-sm font-bold text-emerald-700">Super Starlight Match!</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-rose-600">
                          Almost! {q.num1} + {q.answer} = 10
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl flex items-center gap-1 shadow-sm transition-all"
                    >
                      {currentStep < questions.length - 1 ? 'Next' : 'See Results'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Finish Screen */
              <div className="text-center py-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center mb-3 shadow-inner">
                  <Star className="w-12 h-12 text-amber-500 fill-amber-400 animate-bounce" />
                </div>
                <h4 className="text-2xl font-black text-slate-800 font-heading">Quest Mastered!</h4>
                <p className="text-sm text-slate-600 mt-1">
                  You scored {score} / {questions.length} and earned 20 Star Gems!
                </p>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl inline-flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Meteor Subtraction (Node 4) is now unlocked!
                </div>

                <button
                  onClick={handleFinish}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                  id="claim-quest-rewards-btn"
                >
                  <Star className="w-5 h-5 fill-white" />
                  Claim 20 Stars & Return
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
