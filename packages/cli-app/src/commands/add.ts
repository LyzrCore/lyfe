import axios from "axios";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import ConsoleMessageHandler from "../utils/consoleMessageHandler";
import { fetchComponentInfo, fetchComponentPath } from "../utils/registry";
import { spinner } from "../utils/spinner";

interface AddComponent {
  component: string;
  skipDependencies: boolean;
}

interface LyfeConfig {
  "base-path"?: string;
  "aliases-local": {
    components: string;
    hooks?: string;
    utils?: string;
  };
}

export async function addComponent({
  component,
  skipDependencies,
}: AddComponent) {
  const spinnerInstance = spinner("Adding component...");

  try {
    spinnerInstance.start();

    // 1. Check if component exists in registry
    const componentInfo = await fetchComponentInfo(component);
    if (!componentInfo) {
      throw new Error(`Component "${component}" not found in registry`);
    }

    // 2. Check if src directory exists
    const cwd = process.cwd();
    const srcPath = path.join(cwd, "src");
    if (!fs.existsSync(srcPath)) {
      throw new Error(
        "src directory not found. Please run this command from a project root with src directory."
      );
    }

    // 3. Check if lyfe.config.json exists in root
    const lyfeConfigPath = path.join(cwd, "lyfe.config.json");
    if (!fs.existsSync(lyfeConfigPath)) {
      throw new Error(
        "lyfe.config.json not found in root directory. Please initialize lyfe first."
      );
    }

    // Read lyfe config
    const lyfeConfig: LyfeConfig = await fs.readJson(lyfeConfigPath);
    const componentAlias = lyfeConfig["aliases-local"]?.components;
    if (!componentAlias) {
      throw new Error("Component alias not found in lyfe.config.json");
    }

    // Check for base-path for localDependencyResolve
    const basePath = lyfeConfig["base-path"];
    if (!basePath) {
      throw new Error(
        `base-path not found in lyfe.config.json. Please add:\n` +
          `"base-path": "src"`
      );
    }

    // 4. Handle dependencies
    if (!skipDependencies && componentInfo.dependencies?.length) {
      spinnerInstance.text = "Checking dependencies...";

      const packageJsonPath = path.join(cwd, "package.json");
      const packageJson = await fs.readJson(packageJsonPath);
      const installedDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      // Extract package name from versioned dependency string (e.g., "lucide-react@^0.511.0" -> "lucide-react")
      const extractPackageName = (dep: string): string => {
        const atIndex = dep.indexOf("@");
        return atIndex === -1 ? dep : dep.substring(0, atIndex);
      };

      const missingDeps = componentInfo.dependencies?.filter((dep) => {
        const packageName = extractPackageName(dep);
        return !installedDeps[packageName];
      });

      if (missingDeps.length > 0) {
        spinnerInstance.text = `Installing missing dependencies: ${missingDeps.join(", ")}`;
        try {
          execSync(`npm install ${missingDeps.join(" ")}`, { stdio: "pipe" });
        } catch (installError) {
          throw new Error(
            `Failed to install dependencies: ${missingDeps.join(", ")}`
          );
        }
      }
    }

    // 5. Get component folder path
    const componentFolderPath = path.join(
      cwd,
      componentAlias.replace("@/", "")
    );

    // Ensure component directory exists
    await fs.ensureDir(componentFolderPath);

    // 6. Fetch component from origin and copy
    spinnerInstance.text = "Fetching component from registry...";
    const componentUrl = await fetchComponentPath(componentInfo?.path);

    const response = await axios.get(componentUrl);
    const componentCode = response.data;

    // Write component file
    const componentFilePath = path.join(
      componentFolderPath,
      `${componentInfo?.path}`
    );

    // Check if component already exists
    if (fs.existsSync(componentFilePath)) {
      spinnerInstance.stop();
      ConsoleMessageHandler.WARNING(
        `Component "${component}" already exists at: ${componentFilePath}`
      );
      return;
    }

    await fs.writeFile(componentFilePath, componentCode);

    // Handle localDependencyResolve
    if (componentInfo.localDependenciesResolve?.length) {
      spinnerInstance.text = "Handling local dependencies...";

      for (const localDep of componentInfo.localDependenciesResolve) {
        switch (localDep.type) {
          case "COMPONENT":
            await addComponent({ component: localDep.path, skipDependencies });
            break;
          default:
            throw new Error(`Unknown local dependency type: ${localDep.type}`);
        }
      }
    }

    spinnerInstance.succeed(`Component "${component}" added successfully!`);
    ConsoleMessageHandler.SUCCESS(`Component added at: ${componentFilePath}`);
  } catch (err: any) {
    spinnerInstance.fail("Failed to add component");
    ConsoleMessageHandler.ERROR(err?.message ?? "Failed to add component");
  }
}
