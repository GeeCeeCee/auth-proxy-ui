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

    const url = `${process.env.ENDPOINT}/auth/signup`;
    const http = HTTP();
    const response = await http.post(url, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res
      .status(response.status)
      .json({ status: response.status, data: response.data });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 500,
      message: "User could not created.",
      details: error.message ?? "",
    });
  }
}
