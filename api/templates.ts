import { VercelRequest, VercelResponse } from '@vercel/node'
import got, { Response } from 'got'

interface Repository {
  name: string
  full_name: string
  description: string
  updated_at: string
  owner: { login: string }
}

interface Template {
  name: string
  owner: string
  fullname: string
  description: string
  updated: string
}

const fetchAllRepos = (owner: string): AsyncIterableIterator<Repository> => {
  return got.paginate<Repository>(`https://api.github.com/users/${owner}/repos?type=owner&sort=updated&per_page=100`, {
    timeout: { request: 5 * 1000 },
    username: process.env.GITHUB_CLIENT_ID,
    password: process.env.GITHUB_CLIENT_SECRET
  })
}

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const owner = req.query.owner ?? req.query.username ?? 'caz-templates'
  try {
    const results: Template[] = []
    for await (const item of fetchAllRepos(owner.toString())) {
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
