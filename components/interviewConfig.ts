/**
 * Interview Configuration
 * 
 * This file contains all questions, options, and scoring logic for the User Fit Interview.
 * The scoring system maps user selections to predefined categories.
 * 
 * Categories:
 * - Creator: People who enjoy building, making, and expressing themselves
 * - Explorer: Curious individuals who love learning and discovering new things
 * - Helper: Those who find joy in supporting and assisting others
 * - Analyzer: Logical thinkers who enjoy problem-solving and data
 * - Socializer: People-oriented individuals who thrive on connection
 */

export interface InterviewOption {
  id: string;
  text: string;
  icon: string;
  // Scoring: Each option contributes points to different categories
  scores: {
    creator?: number;
    explorer?: number;
    helper?: number;
    analyzer?: number;
    socializer?: number;
  };
}

export interface InterviewQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: InterviewOption[];
}

// Category definitions for results
export interface CategoryInfo {
  id: string;
  title: string;
  description: string;
  traits: string[];
  color: string;
  icon: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  creator: {
    id: 'creator',
    title: 'The Creator',
    description: 'You thrive on bringing ideas to life! Whether it\'s art, code, writing, or any other form of expression, you love the process of making something new.',
    traits: ['Imaginative', 'Innovative', 'Expressive', 'Hands-on'],
    color: '#14b8a6',
    icon: '🎨'
  },
  explorer: {
    id: 'explorer',
    title: 'The Explorer',
    description: 'Your curiosity knows no bounds! You love learning new things, discovering hidden gems, and expanding your knowledge across various domains.',
    traits: ['Curious', 'Adventurous', 'Open-minded', 'Knowledge-seeker'],
    color: '#6366f1',
    icon: '🔍'
  },
  helper: {
    id: 'helper',
    title: 'The Helper',
    description: 'You find deep satisfaction in making a positive difference! Supporting others and contributing to their growth brings you genuine joy.',
    traits: ['Empathetic', 'Supportive', 'Generous', 'Patient'],
    color: '#ec4899',
    icon: '💝'
  },
  analyzer: {
    id: 'analyzer',
    title: 'The Analyzer',
    description: 'You excel at breaking down complex problems! Logic, data, and systematic thinking are your superpowers for understanding the world.',
    traits: ['Logical', 'Detail-oriented', 'Strategic', 'Problem-solver'],
    color: '#8b5cf6',
    icon: '🧠'
  },
  socializer: {
    id: 'socializer',
    title: 'The Socializer',
    description: 'You thrive on human connection! Building relationships, sharing experiences, and bringing people together energizes you.',
    traits: ['Outgoing', 'Collaborative', 'Charismatic', 'Team-player'],
    color: '#f59e0b',
    icon: '🤝'
  }
};

/**
 * Interview Questions
 * Each option is weighted to contribute points to different categories
 * Higher numbers = stronger association with that category
 */
export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'hobby',
    question: 'What\'s your favorite way to spend free time?',
    subtitle: 'Choose the one that sounds most appealing to you',
    options: [
      {
        id: 'create-something',
        text: 'Creating something new',
        icon: '✨',
        scores: { creator: 5, explorer: 2 }
      },
      {
        id: 'learn-new',
        text: 'Learning something new',
        icon: '📚',
        scores: { explorer: 5, analyzer: 3 }
      },
      {
        id: 'help-others',
        text: 'Helping friends or community',
        icon: '🤲',
        scores: { helper: 5, socializer: 2 }
      },
      {
        id: 'solve-puzzles',
        text: 'Solving puzzles or problems',
        icon: '🧩',
        scores: { analyzer: 5, explorer: 2 }
      },
      {
        id: 'hang-out',
        text: 'Hanging out with people',
        icon: '🎉',
        scores: { socializer: 5, helper: 2 }
      }
    ]
  },
  {
    id: 'content',
    question: 'What kind of content do you enjoy most?',
    subtitle: 'Pick your go-to type',
    options: [
      {
        id: 'tutorials',
        text: 'Tutorials & how-tos',
        icon: '🎓',
        scores: { explorer: 4, analyzer: 3 }
      },
      {
        id: 'creative-work',
        text: 'Creative works (art, music, stories)',
        icon: '🎭',
        scores: { creator: 5, explorer: 2 }
      },
      {
        id: 'inspiring-stories',
        text: 'Inspiring stories & testimonials',
        icon: '💫',
        scores: { helper: 4, socializer: 3 }
      },
      {
        id: 'analysis-data',
        text: 'Data, analysis, & research',
        icon: '📊',
        scores: { analyzer: 5, explorer: 2 }
      },
      {
        id: 'social-trends',
        text: 'Social trends & conversations',
        icon: '💬',
        scores: { socializer: 5, explorer: 2 }
      }
    ]
  },
  {
    id: 'work-style',
    question: 'How do you prefer to work on projects?',
    subtitle: 'What energizes you most?',
    options: [
      {
        id: 'solo-creative',
        text: 'Independently with creative freedom',
        icon: '🎨',
        scores: { creator: 5, analyzer: 2 }
      },
      {
        id: 'research-learn',
        text: 'Researching and learning as I go',
        icon: '🔬',
        scores: { explorer: 5, analyzer: 3 }
      },
      {
        id: 'collaborate',
        text: 'Collaborating with others',
        icon: '👥',
        scores: { socializer: 4, helper: 4 }
      },
      {
        id: 'plan-execute',
        text: 'Planning carefully then executing',
        icon: '📋',
        scores: { analyzer: 5, creator: 2 }
      },
      {
        id: 'guide-mentor',
        text: 'Guiding or mentoring teammates',
        icon: '🌟',
        scores: { helper: 5, socializer: 3 }
      }
    ]
  },
  {
    id: 'achievement',
    question: 'What makes you feel most accomplished?',
    subtitle: 'Your biggest source of satisfaction',
    options: [
      {
        id: 'made-something',
        text: 'Building something from scratch',
        icon: '🏗️',
        scores: { creator: 5, analyzer: 2 }
      },
      {
        id: 'mastered-skill',
        text: 'Mastering a new skill',
        icon: '🎯',
        scores: { explorer: 5, analyzer: 3 }
      },
      {
        id: 'helped-someone',
        text: 'Making someone\'s day better',
        icon: '❤️',
        scores: { helper: 5, socializer: 2 }
      },
      {
        id: 'solved-complex',
        text: 'Solving a complex challenge',
        icon: '🔐',
        scores: { analyzer: 5, explorer: 2 }
      },
      {
        id: 'brought-together',
        text: 'Bringing people together',
        icon: '🌈',
        scores: { socializer: 5, helper: 3 }
      }
    ]
  },
  {
    id: 'describes-you',
    question: 'Which word describes you best?',
    subtitle: 'Trust your gut!',
    options: [
      {
        id: 'innovative',
        text: 'Innovative',
        icon: '💡',
        scores: { creator: 5, explorer: 2 }
      },
      {
        id: 'curious',
        text: 'Curious',
        icon: '🤔',
        scores: { explorer: 5, analyzer: 2 }
      },
      {
        id: 'caring',
        text: 'Caring',
        icon: '💚',
        scores: { helper: 5, socializer: 2 }
      },
      {
        id: 'strategic',
        text: 'Strategic',
        icon: '♟️',
        scores: { analyzer: 5, creator: 1 }
      },
      {
        id: 'friendly',
        text: 'Friendly',
        icon: '😊',
        scores: { socializer: 5, helper: 3 }
      }
    ]
  }
];

/**
 * Calculate user's fit based on their answers
 * 
 * @param answers - Array of selected option IDs
 * @returns Object containing scores for each category and the top category
 */
export const calculateUserFit = (answers: string[]) => {
  // Initialize scores for each category
  const categoryScores: Record<string, number> = {
    creator: 0,
    explorer: 0,
    helper: 0,
    analyzer: 0,
    socializer: 0
  };

  // Accumulate scores from each answer
  answers.forEach(answerId => {
    // Find the option across all questions
    for (const question of INTERVIEW_QUESTIONS) {
      const option = question.options.find(opt => opt.id === answerId);
      if (option) {
        // Add scores for each category
        Object.entries(option.scores).forEach(([category, score]) => {
          categoryScores[category] = (categoryScores[category] || 0) + score;
        });
        break;
      }
    }
  });

  // Find the top category
  let topCategory = 'creator';
  let topScore = 0;
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > topScore) {
      topScore = score;
      topCategory = category;
    }
  });

  // Calculate percentages for visualization
  const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0);
  const percentages: Record<string, number> = {};
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    percentages[category] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
  });

  return {
    scores: categoryScores,
    percentages,
    topCategory,
    topCategoryInfo: CATEGORIES[topCategory]
  };
};
