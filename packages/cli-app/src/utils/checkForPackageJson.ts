import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

export function checkForPackageJson(): boolean {
  const cwd = process.cwd();
  const pkgJsonPath = path.join(cwd, "package.json");
  const hasPackageJson = fs.existsSync(pkgJsonPath);

  if (!hasPackageJson) {
    console.log(chalk.red("No package.json detected in the current directory"));
    return false;
  }

  return true;
}
