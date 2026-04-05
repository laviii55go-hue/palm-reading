const fs = require('fs');
const PERSONALITY_FILES = [
  'app/personality-guide/articles/leadership-ranking/page.tsx',
  'app/personality-guide/articles/love-ranking/page.tsx',
  'app/personality-guide/articles/money-work-ranking/page.tsx',
  'app/personality-guide/articles/entrepreneur-ranking/page.tsx',
  'app/personality-guide/articles/healing-ranking/page.tsx',
  'app/personality-guide/articles/creative-ranking/page.tsx',
  'app/personality-guide/articles/teamwork-ranking/page.tsx',
];
const OPENING = /  return \(\s*<div className=\"min-h-screen bg-gradient-to-b from-teal-50 to-white\">\s*<div className=\"max-w-lg mx-auto px-4 py-8 space-y-8\">\s*<div className=\"flex gap-3\">\s*<Link[^>]*>[\s\S]*?<\/Link>\s*<Link[^>]*>[\s\S]*?<\/Link>\s*<\/div>\s*<article>/;
const OPENING_REPL = '  return (\n    <>\n        <article>';
const CLOSING = /(<AdBanner \/>\s*<RakutenWidget \/>)\s*<\/div>\s*<\/div>\s*\);/;
const CLOSING_REPL = '\\n    </>\n  );';
function update(f) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(OPENING, OPENING_REPL);
  c = c.replace(CLOSING, CLOSING_REPL);
  c = c.replace(/text-teal-500(?= text-xs)/g, 'text-teal-400');
  c = c.replace(/text-gray-500(?= text-xs)/g, 'text-slate-400');
  c = c.replace(/text-teal-900/g, 'text-white');
  c = c.replace(/text-teal-600 text-sm leading-relaxed/g, 'text-slate-300 text-sm leading-relaxed');
  c = c.replace(/text-teal-600 text-sm\" /g, 'text-slate-300 text-sm\" ');
  c = c.replace(/text-teal-800 border-b-2 border-teal-200/g, 'text-white border-b-2 border-teal-600\/50');
  c = c.replace(/text-teal-800/g, 'text-white');
  c = c.replace(/border-teal-200/g, 'border-teal-600\/50');
  c = c.replace(/bg-amber-100 border-amber-300 text-amber-800/g, 'bg-amber-500\/20 border-amber-400\/50 text-amber-100');
  c = c.replace(/bg-amber-50 border-amber-200 text-amber-700/g, 'bg-amber-500\/10 border-amber-400\/30 text-amber-50');
  c = c.replace(/bg-white border-teal-100 text-teal-700/g, 'bg-white\/10 border-teal-600\/30 text-slate-200');
  c = c.replace(/bg-white\/80 border-2 border-teal-200 flex items-center justify-center font-black text-teal-700/g, 'bg-white\/20 border-2 border-teal-500\/50 flex items-center justify-center font-black text-white');
  c = c.replace(/font-mono font-bold text-teal-800/g, 'font-mono font-bold text-white');
  c = c.replace(/font-bold text-teal-900/g, 'font-bold text-white');
  c = c.replace(/text-gray-700/g, 'text-slate-200');
  c = c.replace(/text-teal-600 mt-2/g, 'text-teal-400 mt-2');
  c = c.replace(/text-teal-600\" /g, 'text-teal-400\" ');
  c = c.replace(/bg-teal-50 border border-teal-100/g, 'bg-white\/10 border border-teal-600\/30');
  c = c.replace(/bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity/g, 'bg-teal-600 text-white font-bold text-center shadow-md hover:bg-teal-700 transition-colors');
  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated:', f);
}
PERSONALITY_FILES.forEach(update);
