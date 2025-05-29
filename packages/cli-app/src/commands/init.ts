import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import lyfeConfigJson from "../utils/default/lyfe.conig.json";
import { checkForPackageJson } from "../utils/checkForPackageJson";
import ConsoleMessageHandler from "../utils/consoleMessageHandler";
import { spinner } from "../utils/spinner";
import inquirer from "inquirer";
import degit from "degit";
import {
  NEXT_TEMPLATE_REPO_URL,
  VITE_TEMPLATE_REPO_URL,
} from "../utils/repoUrls";
import { detect } from "detect-package-manager";

export interface InitProjectPropTypes {
  template: boolean;
  name: string;
}

/**
 *
 * Copy lyfe.config.json to the current directory
 */
export function copyLyfeConfigJson() {
  if (!checkForPackageJson()) return;
  const cwd = process.cwd();

  const lyfeConfigJsonPath = path.join(cwd, "lyfe.config.json");
  const hasLyfeConfigJson = fs.existsSync(lyfeConfigJsonPath);

  if (hasLyfeConfigJson) {
    ConsoleMessageHandler.ERROR("lyfe.config.json already exists");
    return;
  }

  fs.writeFileSync(lyfeConfigJsonPath, JSON.stringify(lyfeConfigJson, null, 2));
  ConsoleMessageHandler.SUCCESS("✅ lyfe.config.json created successfully");
}

export async function cloneGithubTemplate(
  directoryName: string,
  repoUrl: string
) {
  try {
    const emitter = degit(repoUrl, {
      cache: false,
      force: true,
    });
    await emitter.clone(directoryName);
  } catch (err) {
    ConsoleMessageHandler.ERROR(JSON.stringify(err));
    process.exit(1);
  }
}

export async function createProject(directoryName: string) {
  if (!directoryName) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "dir",
        message: "Specify the directory to create your project",
        default: "custom-lyfe",
      },
    ]);
    directoryName = answer.dir;
  }

  const answerOfTemplate = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Select the template",
      choices: [
        { name: "Vite", value: "VITE" },
        { name: "Next.js", value: "NEXT" },
      ],
      default: "VITE",
    },
  ]);

  const template = answerOfTemplate.template;

  const projectCreateSpinner = spinner("Scaffolding project...").start();

  const destPath = path.resolve(process.cwd(), directoryName);

  try {
    await cloneGithubTemplate(
      destPath,
      template === "VITE" ? VITE_TEMPLATE_REPO_URL : NEXT_TEMPLATE_REPO_URL
    );

    projectCreateSpinner.succeed("Project created successfully");
    const pm = await detect({ cwd: destPath });
    ConsoleMessageHandler.TEXT(`🚀 Next Steps`);

    if (directoryName !== ".") {
      ConsoleMessageHandler.TEXT(`📂 cd ${directoryName}`);
    }

    ConsoleMessageHandler.TEXT(`🏃‍♂️ ${pm} install`);
    ConsoleMessageHandler.TEXT(`🏃 ${pm} run dev`);

    process.exit(0);
  } catch (err) {
    projectCreateSpinner.fail("Failed to create project");
    ConsoleMessageHandler.ERROR(JSON.stringify(err));
    process.exit(1);
  }
}

/**
 * Initialize lyfe project
 * @param noTemplate - Skip setting up the template.
 * @param name - The name of the project.
 */
export async function initProject({ template, name }: InitProjectPropTypes) {
  // if template is true, copy lyfe.config.json to the current directory
  if (template) return copyLyfeConfigJson();

  // if template is false copy the template
  await createProject(name);
}
