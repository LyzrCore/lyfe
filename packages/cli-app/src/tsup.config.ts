export default {
  entry: ["src/index.ts"],
  outDir: "bin",
  format: ["esm"],
  dts: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
};
