# caz-server

> API Server for [CAZ](https://github.com/zce/caz)

## Endpoints

### GET `/api`

Get user's repositories.

```shell
$ curl http://caz.vercel.app/api
```

Response Type:

```typescript
interface Item {
  name: string
  owner: string
  fullname: string
  description: string
  updated: string
}

type Result = Item[]
```

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools for my personal productivity.

## License

[MIT](LICENSE) &copy; [zce](https://zce.me)
