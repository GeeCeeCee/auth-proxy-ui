import HTTP from "../../utils/http";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: number;
  data?: unknown;
  message?: string;
  details?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ status: 405, message: "Method not allowed." });
      return;
    }

    const url = `${process.env.ENDPOINT}/users`;
    const http = HTTP();
    const { email } = req.query;
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    console.log(token);
    const response = await http.get(
      url,
      {
        email,
      },
      {},
      token
    );

    res.status(200).json({
      status: response.status,
      data: {
        name: response.data.name,
        email: response.data.email,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 500,
      message: "User details could not be retrieved",
      details: error.message ?? "",
    });
  }
}
