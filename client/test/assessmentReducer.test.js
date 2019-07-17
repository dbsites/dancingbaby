import assessmentReducer from '../reducers/assessmentReducer.js';
import * as strings from '../constants/strings.js';

describe('assessmentReducer', () => {
  let startState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    startState = {

      progress: 0,
      isHubOpen: true,

      // questions
      questions: [],
      currentQuestion:{},
      currentQuestionIndex: 0,
      totalQuestions: 0,
      questionsUpdated: 'init',
      questionsComplete:false,

      // fair use
      fairUse: 0,
      infringement: 0,
      resultInfringement: .5,
      resultText:strings.ASSESSMENT_RESULTS_STRINGS[1],

      assessmentInfo: {
        // assessment info
        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]:'',

        // copyrighted content
        [strings.ASSESSMENT_INFO_IDS.URL_COPYRIGHTED]:'',
        [strings.ASSESSMENT_INFO_IDS.TITLE_COPYRIGHTED]:'COPYRIGHT TITLE',
        [strings.ASSESSMENT_INFO_IDS.FILETYPE_COPYRIGHTED]:'',
        [strings.ASSESSMENT_INFO_IDS.YOUTUBE_COPYRIGHTED_VIDEO_ID]:'',

        // suspected content
        [strings.ASSESSMENT_INFO_IDS.URL_SUSPECTED]:'',
        [strings.ASSESSMENT_INFO_IDS.TITLE_SUSPECTED]:'SUSPECT TITLE',
        [strings.ASSESSMENT_INFO_IDS.FILETYPE_SUSPECTED]:'',
        [strings.ASSESSMENT_INFO_IDS.YOUTUBE_SUSPECTED_VIDEO_ID]:'',
      },
    };

  });

  it('should provide a default state', () => {
    const result = assessmentReducer(undefined, fakeAction);
    expect(result).toEqual(startState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = assessmentReducer(startState, fakeAction);
    expect(result).toBe(startState);
  });

  describe('ASSESSMENT_UPDATE', () => {
    let action;

    beforeEach(() => {
      action = { 
          type: 'ASSESSMENT_UPDATE',
          payload: {
              response: 'yes',
              index: 0,
            },
        };
    });

    xit('should increase the progress bar', () => {
      const result = assessmentReducer(startState, action);
      expect(result.progress).toBeGreaterThan(0);
    });

    xit('should return a new state object', () => {
      const result = assessmentReducer(startState, action);
      expect(result).not.toBe(startState);
    });
  });
});
