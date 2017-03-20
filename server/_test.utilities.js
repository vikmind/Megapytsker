let utils = {};
utils.sleep = function(ms){
  return Promise.resolve(ms);
};

export default utils;
