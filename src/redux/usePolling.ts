import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getQuizDetails, pollQuizDetails } from "./slices/quiz/quizSlice";

const usePolling = (quizId: string, isLoggedIn: boolean, schoolRegId?: string, interval: number = 10000) => {
    const dispatch = useAppDispatch();
    const { polling, pollingReset } = useAppSelector((state) => state.quiz);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const poll = useCallback(() => {
        if (!isLoggedIn && !polling) {
          dispatch(pollQuizDetails({quizId, schRegId: schoolRegId})).finally(() => {
            timeoutRef.current = setTimeout(poll, interval);
          });
        } else {
            timeoutRef.current = setTimeout(poll, interval);
        }
      }, [dispatch, quizId, isLoggedIn, polling, interval]);
    
      useEffect(() => {
        if (isLoggedIn) return;
        
        timeoutRef.current  = setTimeout(poll, interval);
        return () => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
        }
      }, [isLoggedIn, poll, interval, pollingReset]);
};

export default usePolling