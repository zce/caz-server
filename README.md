# caz-server

> API Server for [CAZ](https://github.com/zce/caz)

## Endpoints

### GET `/templates`

Get user's repositories.

```shell
$ curl https://caz.vercel.app/templates?owner=zce
```

#### Params

- `owner`: github user or organization name, alias: `username`, default: `'caz-templates'`

#### Response Type

```typescript
interface Template {
  name: string
  owner: string
  fullname: string
  description: string
  updated: string
}

type Result = Template[]
```

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools for my personal productivity.

## License

[MIT](LICENSE) &copy; [zce](https://zce.me)
