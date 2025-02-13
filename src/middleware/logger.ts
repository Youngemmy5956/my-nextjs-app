import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const logger = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log(`${req.method} ${req.url}`);
  return handler(req, res);
};
