import { Question, Round, SchoolRoundParticipation } from "@/redux/slices/quiz/quizSlice";

export interface AllAnsweredQuestions extends Question {
  round: string;
}

export function getAllAnsweredQuestions(rounds: SchoolRoundParticipation[]): AllAnsweredQuestions[] {
  const allAnsweredQuestions: AllAnsweredQuestions[] = [];

  rounds.forEach(round => {
      round.answered_questions.forEach(answeredQuestion => {
          allAnsweredQuestions.push({
              ...answeredQuestion,
              round: round.id // or round.roundId, depending on which identifier you want to use
          });
      });
  });

  return allAnsweredQuestions;
}

export function getAllWrongAnsweredQuestions(rounds: SchoolRoundParticipation[]): Question[] {
  const allWrongAnswers: Question[] = [];

  rounds.forEach(round => {
      round.answered_questions.forEach(answeredQuestion => {
          !answeredQuestion.answered_correctly && allWrongAnswers.push({
              ...answeredQuestion,
          });
      });
  });

  return allWrongAnswers;
}

export function getAllRightAnsweredQuestions(rounds: SchoolRoundParticipation[]): Question[] {
  const allRightAnsweredQuestions: Question[] = [];

  rounds.forEach(round => {
      round.answered_questions.forEach(answeredQuestion => {
          answeredQuestion.answered_correctly && allRightAnsweredQuestions.push({
              ...answeredQuestion,
          });
      });
  });

  return allRightAnsweredQuestions;
}