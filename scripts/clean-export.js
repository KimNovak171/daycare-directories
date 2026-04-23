const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");

function walkAndCleanTxt(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    if (err && err.code === "ENOENT") {
      return;
    }
    throw err;
  }

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkAndCleanTxt(full);
    } else if (ent.isFile()) {
      const lower = ent.name.toLowerCase();
      if (lower.endsWith(".txt") && lower !== "robots.txt") {
        fs.unlinkSync(full);
      }
    }
  }
}

if (!fs.existsSync(OUT_DIR)) {
  process.exit(0);
}

walkAndCleanTxt(OUT_DIR);
