import chalk from "chalk";

export const color = {
  root: chalk.green,
  success: chalk.green,
  error: chalk.red,
  path: chalk.green.underline,
  bold: chalk.bold,
  loading: chalk.gray.dim,
  dim: chalk.gray.dim,
  italic: chalk.italic,
  lsFile: chalk.italic,
  lsDir: chalk.blue,
  cat: chalk.hex("#93C5FD"),
  treeBranch: chalk.gray.dim,
  zipPath: chalk.green.underline,
  zipPathDim: chalk.green.dim.underline,
  unzipPath: chalk.blue.underline,
};
