import ConsoleMessageHandler from "../utils/consoleMessageHandler";
import {
  fetchComponentInfo,
  fetchComponentPath,
  fetchHooksPath,
  fetchUtilsPath,
  fetchLocalDependencyPath,
  LocalDependeciesResolve,
  LocalDependeciesResolveType,
} from "../utils/registry";
import { spinner } from "../utils/spinner";
import path from "path";
import fs from "fs-extra";
import axios from "axios";
import { execSync } from "child_process";

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

      const missingDeps = componentInfo.dependencies?.filter(
        (dep) => !installedDeps[dep]
      );

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
    await fs.writeFile(componentFilePath, componentCode);

    // Handle localDependencyResolve
    if (componentInfo.localDependenciesResolve?.length) {
      spinnerInstance.text = "Handling local dependencies...";

      for (const localDep of componentInfo.localDependenciesResolve) {
        let targetPath: string;
        let sourceUrl: string;

        // Determine target path and source URL based on type
        switch (localDep.type) {
          case "COMPONENT":
            const componentAlias = lyfeConfig["aliases-local"]?.components;
            if (!componentAlias) {
              throw new Error(
                "Component alias not found in lyfe.config.json for local dependency"
              );
            }
            targetPath = path.join(
              cwd,
              componentAlias.replace("@/", ""),
              localDep.path
            );
            sourceUrl = await fetchComponentPath(localDep.path);
            break;

          case "HOOK":
            const hooksAlias = lyfeConfig["aliases-local"]?.hooks;
            if (!hooksAlias) {
              throw new Error(
                "Hooks alias not found in lyfe.config.json for local dependency"
              );
            }
            targetPath = path.join(
              cwd,
              hooksAlias.replace("@/", ""),
              `${localDep.path}.ts`
            );
            sourceUrl = await fetchHooksPath(localDep.path);
            break;

          case "UTILS":
            const utilsAlias = lyfeConfig["aliases-local"]?.utils;
            if (!utilsAlias) {
              throw new Error(
                "Utils alias not found in lyfe.config.json for local dependency"
              );
            }
            targetPath = path.join(
              cwd,
              utilsAlias.replace("@/", ""),
              `${localDep.path}.ts`
            );
            sourceUrl = await fetchUtilsPath(localDep.path);
            break;

          default:
            throw new Error(`Unknown local dependency type: ${localDep.type}`);
        }

        // Check if file exists, if not copy it
        if (!fs.existsSync(targetPath)) {
          const localDepResponse = await axios.get(sourceUrl);
          const localDepCode = localDepResponse.data;

          // Ensure directory exists
          await fs.ensureDir(path.dirname(targetPath));
          await fs.writeFile(targetPath, localDepCode);
        }
      }
    }

    // Handle hooks
    // if (componentInfo.hooks?.length) {
    //   spinnerInstance.text = "Handling hooks...";

    //   const hooksAlias = lyfeConfig["aliases-local"]?.hooks;
    //   if (hooksAlias) {
    //     const hooksFolderPath = path.join(cwd, hooksAlias.replace("@/", ""));
    //     await fs.ensureDir(hooksFolderPath);

    //     for (const hook of componentInfo.hooks) {
    //       const hookPath = path.join(hooksFolderPath, `${hook}.ts`);

    //       // Check if file exists, if not copy it
    //       if (!fs.existsSync(hookPath)) {
    //         const hookUrl = await fetchHooksPath(hook);
    //         const hookResponse = await axios.get(hookUrl);
    //         const hookCode = hookResponse.data;
    //         await fs.writeFile(hookPath, hookCode);
    //       }
    //     }
    //   }
    // }

    // // Handle utils
    // if (componentInfo.utils?.length) {
    //   spinnerInstance.text = "Handling utils...";

    //   const utilsAlias = lyfeConfig["aliases-local"]?.utils;
    //   if (utilsAlias) {
    //     const utilsFolderPath = path.join(cwd, utilsAlias.replace("@/", ""));
    //     await fs.ensureDir(utilsFolderPath);

    //     for (const util of componentInfo.utils) {
    //       const utilPath = path.join(utilsFolderPath, `${util}.ts`);

    //       // Check if file exists, if not copy it
    //       if (!fs.existsSync(utilPath)) {
    //         const utilUrl = await fetchUtilsPath(util);
    //         const utilResponse = await axios.get(utilUrl);
    //         const utilCode = utilResponse.data;
    //         await fs.writeFile(utilPath, utilCode);
    //       }
    //     }
    //   }
    // }

    spinnerInstance.succeed(`Component "${component}" added successfully!`);
    ConsoleMessageHandler.SUCCESS(`Component added at: ${componentFilePath}`);
  } catch (err: any) {
    spinnerInstance.fail("Failed to add component");
    ConsoleMessageHandler.ERROR(err?.message ?? "Failed to add component");
  }
}
