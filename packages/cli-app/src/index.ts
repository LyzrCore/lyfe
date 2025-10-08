import { Command } from "commander";
import { initProject } from "./commands/init";
import { addComponent } from "./commands/add";

const program = new Command();

program.name("lyfe").description("cli for lyfe!").version("1.0.4");

program
  .command("init")
  .description("Initialize lyfe project")
  .argument("[name]", "Name of the project")
  .option("--no-template", "Skip setting up the template.")
  .action(async (name, opts) => {
    await initProject({ name, template: !opts.template });
  });

program
  .command("add")
  .description("Add a component to the project")
  .argument("[component]", "Name of the component")
  .option("--skip-depen", "Skip adding dependencies")
  .action(async (component, opts) => {
    await addComponent({ component, skipDependencies: opts.skipDependencies });
  });

program.parse();
