import assessmentReducer from '../reducers/assessmentReducer.js';
import * as strings from '../constants/strings.js';


const content = () =>
{
  return {
    [strings.ASSESSMENT_INFO_IDS.TITLE]: '',
    [strings.ASSESSMENT_INFO_IDS.VIDEO_ID]: '',
    [strings.ASSESSMENT_INFO_IDS.PUBLISHER]: '',
    [strings.ASSESSMENT_INFO_IDS.VIEW_COUNT]: '',
    [strings.ASSESSMENT_INFO_IDS.PUBLISH_DATE]: '',
    [strings.ASSESSMENT_INFO_IDS.URL]: '',
    [strings.ASSESSMENT_INFO_IDS.FILETYPE]: '',
  }
};


describe('assessmentReducer', () => {
  let startState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    startState = {

      progress: 0,
      isHubOpen: true,
      startTimestamp: 0,

      // questions
      questions: {},
      currentQuestions: [],
      currentQuestion: {},
      currentQuestionIndex: 0,
      totalQuestions: 0,
      questionsUpdated: 'init',
      questionsComplete: false,

      // fair use
      fairUse: 0,
      infringement: 0,
      resultInfringement: .25,
      resultText:null,
      resultMatrix:[],

      assessmentInfo: {
        // assessment info
        [strings.ASSESSMENT_INFO_IDS.FIRST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.LAST_NAME]:'',
        [strings.ASSESSMENT_INFO_IDS.ORG_NAME]:'',

        [strings.ASSESSMENT_INFO_IDS.PRIMARY_CONTENT]: new content(),
        [strings.ASSESSMENT_INFO_IDS.SECONDARY_CONTENT]: new content(),

        [strings.ASSESSMENT_INFO_IDS.RESULTS_QUESTIONS]: {}
      }
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
