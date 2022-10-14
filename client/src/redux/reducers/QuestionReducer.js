import {
  FETCH_API_QUESTION_COURSE,
  DISABLE_LOAD_MORE,
  API_ADD_QUESTION,
  API_ADD_REPLY_QUESTION,
  API_UPDATE_QUESTION,
  API_DELETE_QUESTION,
  API_UPDATE_REPLY_QUESTION,
  API_DELETE_REPLY_QUESTION,
} from '../actions/Type';

const initialState = {
  questions: null,
  disableLoadMore: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_API_QUESTION_COURSE: {
      return { ...state, questions: payload };
    }
    case API_ADD_QUESTION: {
      return {
        ...state,
        questions: { [payload._id]: payload, ...state.questions },
      };
    }
    case API_UPDATE_QUESTION: {
      return {
        ...state,
        questions: { ...state.questions, [payload._id]: payload },
      };
    }
    case API_DELETE_QUESTION: {
      const { [payload]: _, ...newQuestion } = state.questions;
      return {
        ...state,
        questions: newQuestion,
      };
    }
    case API_ADD_REPLY_QUESTION: {
      return {
        ...state,
        questions: { ...state.questions, [payload._id]: payload },
      };
    }
    case API_UPDATE_REPLY_QUESTION: {
      return {
        ...state,
        questions: { ...state.questions, [payload._id]: payload },
      };
    }
    case API_DELETE_REPLY_QUESTION: {
      let question = { ...state.questions[payload.questionId] };
      question.reply = question.reply.findAndRemove(
        payload.replyQuestionId,
        '_id'
      );

      return {
        ...state,
        questions: { ...state.questions, [payload.questionId]: question },
      };
    }
    case DISABLE_LOAD_MORE: {
      return { ...state, disableLoadMore: payload };
    }
    default:
      return state;
  }
};
