# Lyfe CLI

A command-line interface tool for Lyzr.ai - AI Agents Programming Platform.

## Installation

```bash
npm install -g lyfe-cli
```

## Usage

### Initialize a new project

```bash
lyfe init [project-name]
```

Options:

- `--no-template`: Skip setting up the template

### Add a component

```bash
lyfe add [component-name]
```

Options:

- `--skip-depen`: Skip adding dependencies

## Commands

### `lyfe init`

Initialize a new Lyfe project with the specified name. This command will:

- Create a new project directory
- Set up the basic project structure
- Configure the necessary files

### `lyfe add`

Add a component to your existing Lyfe project. This command will:

- Fetch the component from the registry
- Install any required dependencies
- Add the component to your project structure

## Requirements

- Node.js 18 or higher
- A valid Lyfe project structure

## License

MIT

## Author

Lyzr.ai

## Repository

https://github.com/LyzrCore/lyfe
