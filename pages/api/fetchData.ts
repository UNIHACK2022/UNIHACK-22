import type { NextApiRequest, NextApiResponse } from "next";
import { createConnection } from "mysql2/promise";

export default async function fetchData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get postcode parameter from query body
  const {
    query: { postcode },
    method,
  } = req;

  console.log(postcode);

  const connection = await createConnection(process.env.DATABASE_URL);

  const query = `SELECT * from data WHERE postcode=${postcode}`;
  const results = await connection.query(query);
  // [1] is buffer object, only return results
  const data = results[0];

  return res.status(200).json({ results });
}
