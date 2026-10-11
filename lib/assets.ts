import fs from "node:fs";
import path from "node:path";

// Build-time check (server): bestaat het geoptimaliseerde beeld in public/?
export const hasImage = (base: string) => fs.existsSync(path.join(process.cwd(), "public", `${base}-1000.webp`));
