const getRequest = (req, res) =>
  res
    .status(200)
    .json({
      name: 'test',
      id: pid,
      method: 'get'
    });

const putRequest = (req, res) =>
  res
    .status(200)
    .json({
      name: 'test',
      id: pid,
      method: 'put'
    });
const postRequest = (req, res) =>
  res
    .status(200)
    .json({
      name: 'test',
      id: pid,
      method: 'post'
    });

const handler = (req, res) => {
  const { method } = req;
  const reqMap = {
    GET:  getRequest(req, res),
    POSt: postRequest(req, res),
    PUT:  putRequest(req, res),
  };

  return reqMap[method];
};

export default handler