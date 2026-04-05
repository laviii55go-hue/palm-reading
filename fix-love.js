const fs = require("fs");
const f = "app/numerology-guide/articles/love-ranking/page.tsx";
let c = fs.readFileSync(f, "utf8");
const backslashN = String.fromCharCode(92) + "n";
const from = "</div>" + backslashN + "                    </div>" + backslashN + "                );";
const to = "</div>\n                    </div>\n                );";
c = c.split(from).join(to);
fs.writeFileSync(f, c, "utf8");
console.log("Done");