#!/usr/bin/env node

import { Command } from "commander";
import { initProject } from "./commands/init";

const program = new Command();

program.name("lyfe").description("cli for lyfe!").version("0.0.1");

program
  .command("init")
  .description("Initialize lyfe project")
  .argument("[name]", "Name of the project")
  .option("--no-template", "Skip setting up the template.")
  .action(async (name, opts) => {
    await initProject({ name, template: !opts.template });
  });

program.parse();
