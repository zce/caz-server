import got, { Response } from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

interface Repository {
  name: string
  full_name: string
  description: string
  updated_at: string
  owner: { login: string }
}

interface Item {
  name: string
  owner: string
  fullname: string
  description: string
  updated: string
}

const fetchAllRepos = (owner: string) => {
  return got.paginate<Repository>(`https://api.github.com/users/${owner}/repos?type=owner&sort=updated&per_page=100`, {
    timeout: 5 * 1000,
    username: process.env.GITHUB_CLIENT_ID,
    password: process.env.GITHUB_CLIENT_SECRET
  })
}

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const owner = req.query.username || req.query.owner || 'caz-templates'
  try {
    const items = fetchAllRepos(owner.toString())
    const results: Item[] = []
    for await (const item of items) {
      results.push({
        name: item.name,
        owner: item.owner.login,
        fullname: item.full_name,
        description: item.description,
        updated: item.updated_at
      })
    }
    res.json(results)
  } catch (e) {
    const response = e.response as Response
    res.status(response.statusCode).json(response.body)
  }
}
