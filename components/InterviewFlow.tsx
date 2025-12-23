import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import ProgressIndicator from './ProgressIndicator';
import ResultsScreen from './ResultsScreen';
import { INTERVIEW_QUESTIONS } from './interviewConfig';

interface InterviewFlowProps {
  onComplete: () => void;
}

/**
 * InterviewFlow Component
 * 
 * Main component that orchestrates the interview experience.
 * Manages state for current question, user answers, and flow progression.
 * 
 * Flow:
 * 1. Display questions one at a time
 * 2. Collect user answers
 * 3. Show results with analysis and graph
 */
const InterviewFlow: React.FC<InterviewFlowProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = INTERVIEW_QUESTIONS.length;
  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  /**
   * Handle option selection
   * Stores the answer and moves to next question or results
   */
  const handleSelectOption = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    // Wait a moment for visual feedback before transitioning
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Show results
        setShowResults(true);
      }
    }, 300);
  };

  /**
   * Navigate back to previous question
   * Removes the last answer from state
   */
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  /**
   * Restart the interview
   * Resets all state to initial values
   */
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  // Show results screen after all questions answered
  if (showResults) {
    return (
      <ResultsScreen 
        answers={answers} 
        onRestart={handleRestart}
      />
    );
  }

  // Show current question
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <ProgressIndicator 
          current={currentQuestionIndex + 1}
          total={totalQuestions}
          progress={progress}
        />

        {/* Question Card */}
        <div className="mt-8">
          <QuestionCard
            question={currentQuestion}
            onSelectOption={handleSelectOption}
            onBack={handleBack}
            canGoBack={currentQuestionIndex > 0}
            questionNumber={currentQuestionIndex + 1}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewFlow;
