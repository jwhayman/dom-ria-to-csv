import esbuild from "esbuild"
import process from "process"
import builtins from "builtin-modules"

const prod = (process.argv[2] === "production")

esbuild.build({
    entryPoints: ["app.ts"],
    bundle: true,
    external: [...builtins],
    watch: !prod,
    platform: "node",
    target: "node12",
    logLevel: "info",
    outfile: "app.js"
}).catch(() => process.exit(1))