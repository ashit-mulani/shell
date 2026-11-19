import { funcCat } from "../function/funcCat.js";
import { funcCd } from "../function/funcCd.js";
import { funcClear } from "../function/funcClear.js";
import { funcDelete } from "../function/funcDelete.js";
import { funcEnv } from "../function/funcEnv.js";
import { funcExit } from "../function/funcExit.js";
import { funcGet } from "../function/funcGet.js";
import { funcHelp } from "../function/funcHelp.js";
import { funcLs } from "../function/funcLs.js";
import { funcMkdir } from "../function/funcMkdir.js";
import { funcPatch } from "../function/funcPatch.js";
import { funcPost } from "../function/funcPost.js";
import { funcPut } from "../function/funcPut.js";
import { funcRm } from "../function/funcRm.js";
import { funcRmdir } from "../function/funcRmdir.js";
import { funcTouch } from "../function/funcTouch.js";
import { funcTree } from "../function/funcTree.js";
import { funcUnzip } from "../function/funcUnzip.js";
import { funcZip } from "../function/funcZip.js";

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
  {
    command: "ls",
    description: "List directory contents",
    function: funcLs,
  },
  {
    command: "touch",
    description: "Create an empty file",
    function: funcTouch,
  },
  {
    command: "rm",
    description: "Remove a file",
    function: funcRm,
  },
  {
    command: "mkdir",
    description: "Create a directory",
    function: funcMkdir,
  },
  {
    command: "rmdir",
    description: "Remove a directory",
    function: funcRmdir,
  },
  {
    command: "cat",
    description: "Show file content",
    function: funcCat,
  },
  {
    command: "tree",
    description: "Show folder structure in tree view",
    function: funcTree,
  },
  {
    command: "env",
    description: "Show enviroment varibale",
    function: funcEnv,
  },
  {
    command: "zip",
    description: "Compress a files",
    function: funcZip,
  },
  {
    command: "unzip",
    description: "Decompress a files",
    function: funcUnzip,
  },
  {
    command: "GET",
    description: "Send GET request",
    function: funcGet,
  },
  {
    command: "POST",
    description: "Send POST request",
    function: funcPost,
  },
  {
    command: "PUT",
    description: "Send PUT request",
    function: funcPut,
  },
  {
    command: "PATCH",
    description: "Send PATCH request",
    function: funcPatch,
  },
  {
    command: "DELETE",
    description: "Send DELETE request",
    function: funcDelete,
  },
];
