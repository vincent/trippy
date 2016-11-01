/* eslint-disable no-param-reassign */
import { START_JOB, STOP_JOB, REMOVE_JOB } from '../actions/job';

const initialState = {
  autoIncrementId: 1,
  jobs: [],
};

export default function job(state = initialState, action) {
  switch (action.type) {
    case START_JOB: {
      const jobs = state.jobs.map(jobData => {
        if (jobData.status === 'running') {
          jobData.status = 'stopped';
          jobData.endAt = action.payload.time;
        }
        return jobData;
      });

      return {
        ...state,
        jobs: [
          ...jobs,
          {
            id: state.autoIncrementId,
            projectName: action.payload.projectName,
            startAt: action.payload.time,
            status: 'running',
          },
        ],
        autoIncrementId: state.autoIncrementId + 1,
      };
    }

    case STOP_JOB: {
      const jobs = state.jobs.map(jobData => {
        if (jobData.id === action.payload.id) {
          jobData.status = 'stopped';
          jobData.endAt = action.payload.time;
        }
        return jobData;
      });

      return {
        ...state,
        jobs,
      };
    }

    case REMOVE_JOB: {
      const jobs = state.jobs.filter(({ id }) => id !== action.payload.id);

      return {
        ...state,
        jobs,
      };
    }

    default:
      return state;
  }
}
