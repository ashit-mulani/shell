import fs from "node:fs";
import path from "node:path";
import { commandConfig } from "../config/command-config.js";

type Completion = [completions: string[], line: string];

const COMMAND_NAMES = commandConfig.map(({ command }) => command);
let options: string[] = [];
let index = -1;

function resetState(): void {
  options = [];
  index = -1;
}

function selectFirst(next: string[], line: string): Completion {
  const [first] = next;
  if (first === undefined) {
    resetState();
    return [[], line];
  }
  options = next;
  index = 0;
  return [[first], line];
}

function selectNext(line: string): Completion {
  index = (index + 1) % options.length;
  return [[options[index] ?? line], line];
}

function completeCommand(line: string): string[] {
  const needle = line.toLowerCase();
  return COMMAND_NAMES.filter((name) => name.toLowerCase().startsWith(needle));
}

function completePath(line: string, lastSpace: number): string[] {
  const prefix = line.slice(0, lastSpace + 1);
  const token = line.slice(lastSpace + 1);
  const lastSeparator = Math.max(
    token.lastIndexOf("\\"),
    token.lastIndexOf("/"),
  );
  const typedDirectory = token.slice(0, lastSeparator + 1);
  const partialName = token.slice(lastSeparator + 1).toLowerCase();
  const lookupDirectory = path.resolve(
    process.cwd(),
    typedDirectory.replace(/[\\/]/g, path.sep),
  );
  const separator = token.includes("\\") ? "\\" : path.sep;
  const base = prefix + typedDirectory;
  try {
    const results: string[] = [];
    for (const entry of fs.readdirSync(lookupDirectory, {
      withFileTypes: true,
    })) {
      if (entry.name.toLowerCase().startsWith(partialName)) {
        results.push(
          base + entry.name + (entry.isDirectory() ? separator : ""),
        );
      }
    }
    return results;
  } catch {
    return [];
  }
}

export function pathCompleter(line: string): Completion {
  if (index >= 0 && line === options[index]) {
    return selectNext(line);
  }
  const lastSpace = line.lastIndexOf(" ");
  return selectFirst(
    lastSpace === -1 ? completeCommand(line) : completePath(line, lastSpace),
    line,
  );
}
