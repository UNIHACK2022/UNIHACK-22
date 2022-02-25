import type { NextApiRequest, NextApiResponse } from "next";
import { createConnection } from "mysql2/promise";

// TODO: Pass postcode in request parameter
export default async function fetchData(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const connection = await createConnection(process.env.DATABASE_URL);

  // TODO: Replace query with  SELECT * from data WHERE postcode={postcode}
  const query = 'SELECT * from data LIMIT 5';
  const results = await connection.query(query);

  return res.status(200).json({ results })
}