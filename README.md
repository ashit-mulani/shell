# Ashit Feat Shell

A custom interactive terminal shell built with Node.js and TypeScript.

## Features

- Interactive command-line interface
- File and directory management
- File content viewing
- Directory tree visualization
- Environment variable inspection
- ZIP compression with exclusion support
- ZIP archive extraction
- HTTP requests (GET, POST, PUT, PATCH, DELETE) with custom headers and body

## Available Commands

| Command  | Description                        |
| -------- | ---------------------------------- |
| `help`   | Show available commands            |
| `exit`   | Exit the terminal                  |
| `cls`    | Clear the terminal screen          |
| `clear`  | Clear the terminal screen          |
| `cd`     | Change the current directory       |
| `ls`     | List directory contents            |
| `touch`  | Create an empty file               |
| `rm`     | Remove a file                      |
| `mkdir`  | Create a directory                 |
| `rmdir`  | Remove a directory                 |
| `cat`    | Display file contents              |
| `tree`   | Show folder structure in tree view |
| `env`    | Show environment variables         |
| `zip`    | Compress a file or folder          |
| `unzip`  | Extract a ZIP file                 |
| `GET`    | Send GET request                   |
| `POST`   | Send POST request                  |
| `PUT`    | Send PUT request                   |
| `PATCH`  | Send PATCH request                 |
| `DELETE` | Send DELETE request                |

## Requirements

- Node.js

## Installation

Install globally using npm:

```bash
npm install -g @ashit-feat/shell
```

## Usage

Start the shell:

```bash
ashit-feat
```

## Command Usage

### Navigation

```bash
cd folder
cd ../
ls
ls ./src
```

### File Management

```bash
touch file.txt
mkdir my-folder
rm file.txt
rmdir my-folder
```

### View File Contents

```bash
cat package.json
cat package.json -lines=10
```

| Flag       | Description               |
| ---------- | ------------------------- |
| `-lines=N` | Display the first N lines |

### Directory Tree

```bash
tree
tree -r
tree -max=5
tree -r -max=5
```

| Flag     | Description                           |
| -------- | ------------------------------------- |
| `-r`     | Recursively display subdirectories    |
| `-max=N` | Limit entries displayed per directory |

### Environment Variables

```bash
env
env PATH
env NODE_ENV
```

### ZIP Compression

Compress files and directories:

```bash
zip
zip src
zip src/app
zip package.json
```

Exclude files and directories:

```bash
zip src -ex=node_modules,.git,dist
```

Specify the output ZIP path:

```bash
zip src -at=backup.zip
zip src -at=./backups
zip src -ex=node_modules,.git -at=backup.zip
```

| Flag              | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `-ex=ITEM1,ITEM2` | Exclude files or directories by name or relative path            |
| `-at=PATH`        | Specify the output ZIP file or an existing destination directory |

### ZIP Extraction

Extract ZIP archives:

```bash
unzip backup.zip
```

Specify an extraction destination:

```bash
unzip backup.zip -at=./output
unzip backup.zip -at=C:/backups
```

| Flag       | Description                        |
| ---------- | ---------------------------------- |
| `-at=PATH` | Specify the extraction destination |

### HTTP Requests

Send HTTP requests straight from the shell. Command names are uppercase.

```bash
GET https://api.example.com/users
GET https://api.example.com/users -h=Authorization:Bearer_TOKEN -p
POST https://api.example.com/users -b={"name":"ashit"} -h=Content-Type:application/json
PUT https://api.example.com/users/1 -b={"name":"new-name"} -h=Content-Type:application/json
PATCH https://api.example.com/users/1 -b={"name":"patched"} -h=Content-Type:application/json
DELETE https://api.example.com/users/1
```

| Command  | Description         | Accepts `-b` body |
| -------- | ------------------- | ----------------- |
| `GET`    | Send GET request    | No                |
| `POST`   | Send POST request   | Yes               |
| `PUT`    | Send PUT request    | Yes               |
| `PATCH`  | Send PATCH request  | Yes               |
| `DELETE` | Send DELETE request | Yes               |

Usage: `METHOD <url> [-h=NAME:VALUE] [-b=BODY] [-p]`

| Flag            | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `-h=NAME:VALUE` | Add a request header. Repeat the flag to add more headers          |
| `-b=BODY`       | Request body (`POST`, `PUT`, `PATCH`, `DELETE`)                    |
| `-p`            | Parse the response and display it formatted instead of the raw one |

The first argument that doesn't start with `-` is used as the URL.

## License

ISC
