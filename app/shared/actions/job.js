export const START_JOB = 'START_JOB';
export const STOP_JOB = 'STOP_JOB';
export const REMOVE_JOB = 'REMOVE_JOB';


export function startJob(projectName = null, time = new Date()) {
  return {
    type: START_JOB,
    payload: {
      projectName,
      time,
    },
  };
}

export function stopJob(id, time = new Date()) {
  return {
    type: STOP_JOB,
    payload: {
      id,
      time,
    },
  };
}

export function removeJob(id) {
  return {
    type: REMOVE_JOB,
    payload: {
      id,
    },
  };
}
