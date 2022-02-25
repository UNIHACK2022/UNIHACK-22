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

  // Return 400 if postcode not provided in query body
  if ( !postcode ) {
    return res.status(400).json({message: 'Postcode not defined in query body. Use the ?postcode= prop.'})
  }

  const connection = await createConnection(process.env.DATABASE_URL);

  const query = `SELECT * from data WHERE postcode=${postcode}`;
  const results = await connection.query(query);
  // [1] is buffer object, only return results
  const data = results[0];

  return res.status(200).json({ data });
}
