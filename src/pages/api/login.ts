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
    if (req.method !== "POST") {
      res.status(405).send({ status: 405, message: "Method not allowed." });
      return;
    }

    const url = `${process.env.ENDPOINT}/auth/login`;
    const http = HTTP();
    const response = await http.post(url, {
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({ status: response.status, data: response.data });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 500,
      message: "User could not be validated",
      details: error.message ?? "",
    });
  }
}
