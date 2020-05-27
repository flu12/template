const self = {};

const checkExpirationWaitingListForUser = async () => {
  console.log('plm')
};


const recurrentCheck = (app) => {
  self.app = app;

  return {
    interval: {
      hours: 1,
    },
    task: async () => {
      await checkExpirationWaitingListForUser();
    },
  };
};

module.exports = recurrentCheck;
