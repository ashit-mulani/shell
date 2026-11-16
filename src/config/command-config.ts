import { funcCat } from "../function/funcCat.js";
import { funcCd } from "../function/funcCd.js";
import { funcClear } from "../function/funcClear.js";
import { funcExit } from "../function/funcExit.js";
import { funcHelp } from "../function/funcHelp.js";
import { funcLs } from "../function/funcLs.js";
import { funcMkdir } from "../function/funcMkdir.js";
import { funcRm } from "../function/funcRm.js";
import { funcRmdir } from "../function/funcRmdir.js";
import { funcTouch } from "../function/funcTouch.js";

export interface CommandConfig {
  command: string;
  description?: string;
  function: (args: string[]) => void | Promise<void>;
}
export const commandConfig: CommandConfig[] = [
  {
    command: "help",
    description: "Show this help message",
    function: funcHelp,
  },
  {
    command: "exit",
    description: "Exit the terminal",
    function: funcExit,
  },
  {
    command: "cls",
    description: "Clear the terminal screen",
    function: funcClear,
  },
  {
    command: "clear",
    description: "Clear the terminal screen",
    function: funcClear,
  },
  {
    command: "cd",
    description: "Change the current directory",
    function: funcCd,
  },
  { command: "ls", description: "List directory contents", function: funcLs },
  {
    command: "touch",
    description: "Create an empty file",
    function: funcTouch,
  },
  { command: "rm", description: "Remove a file", function: funcRm },
  { command: "mkdir", description: "Create a directory", function: funcMkdir },
  {
    command: "rmdir",
    description: "Remove an empty directory",
    function: funcRmdir,
  },
  {
    command: "cat",
    description: "Show file content",
    function: funcCat,
  },
];
