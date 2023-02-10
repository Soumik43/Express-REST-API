## Express server with File System

Here we are creating a REST api using the underlying file system.
Data will be stored in a json file in the project folder named `data.json`. The project will replicate the express server we build during sessions.
The API has CRUD capability.

## Deployment

To deploy this project run

Install dependencies

```bash
  npm i
```

Default PORT is set to 3000, if you need an alternate, create a `.env` file in your directory and set your `PORT = {desired PORT}`

```bash
  npm run dev
```


Run the server for dev deployment use

```bash
  npm run dev
```

Run the server for prod deployment use

```bash
  npm run start
```
