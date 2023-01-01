import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const populationAPI = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const id = req.query.id
  const data = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?&prefCode=${id}`,
    {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
    }
  )
  const response = await data.json()
  return res.status(200).json(response)
}

export default populationAPI
