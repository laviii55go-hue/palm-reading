const fs = require('fs');
const NUMEROLOGY_FILES = [
  'app/numerology-guide/articles/love-ranking/page.tsx',
  'app/numerology-guide/articles/money-work-ranking/page.tsx',
  'app/numerology-guide/articles/entrepreneur-ranking/page.tsx',
  'app/numerology-guide/articles/healing-ranking/page.tsx',
  'app/numerology-guide/articles/creative-ranking/page.tsx',
];
const OPENING = /  return \(\s*<div className=\"min-h-screen bg-gradient-to-b from-violet-50 to-white\">\s*<div className=\"max-w-lg mx-auto px-4 py-8 space-y-8\">\s*<div className=\"flex gap-3\">\s*<Link[^>]*>[\s\S]*?<\/Link>\s*<Link[^>]*>[\s\S]*?<\/Link>\s*<\/div>\s*<article>/;
const OPENING_REPL = '  return (\n    <>\n        <article>';
const CLOSING = /(<AdBanner \/>\s*<RakutenWidget \/>)\s*<\/div>\s*<\/div>\s*\);/;
const CLOSING_REPL = '\\n    </>\n  );';
function update(f) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/<\/>`n/g, '</>');
  c = c.replace(OPENING, OPENING_REPL);
  c = c.replace(CLOSING, CLOSING_REPL);
  c = c.replace(/text-violet-500(?= text-xs)/g, 'text-violet-400');
  c = c.replace(/text-gray-500(?= text-xs)/g, 'text-slate-400');
  c = c.replace(/text-violet-900/g, 'text-white');
  c = c.replace(/text-gray-600/g, 'text-slate-300');
  c = c.replace(/text-violet-800 border-b-2 border-violet-200/g, 'text-white border-b-2 border-violet-600\/50');
  c = c.replace(/bg-amber-100 border-amber-300 text-amber-800/g, 'bg-amber-500\/20 border-amber-400\/50 text-amber-100');
  c = c.replace(/bg-amber-50 border-amber-200 text-amber-700/g, 'bg-amber-500\/10 border-amber-400\/30 text-amber-50');
  c = c.replace(/bg-white border-violet-100 text-violet-700/g, 'bg-white\/10 border-violet-600\/30 text-slate-200');
  c = c.replace(/bg-white\/80 border-2 border-violet-200 flex items-center justify-center font-black text-violet-700/g, 'bg-white\/20 border-2 border-violet-500\/50 flex items-center justify-center font-black text-white');
  c = c.replace(/font-bold text-violet-900/g, 'font-bold text-white');
  c = c.replace(/text-gray-700/g, 'text-slate-200');
  c = c.replace(/text-violet-600 mt-2/g, 'text-violet-400 mt-2');
  c = c.replace(/text-violet-600\" /g, 'text-violet-400\" ');
  c = c.replace(/bg-violet-50 border border-violet-100/g, 'bg-white\/10 border border-violet-600\/30');
  c = c.replace(/bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity/g, 'bg-violet-600 text-white font-bold text-center shadow-md hover:bg-violet-700 transition-colors');
  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated:', f);
}
NUMEROLOGY_FILES.forEach(update);

