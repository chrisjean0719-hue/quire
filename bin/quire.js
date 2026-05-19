#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { sheetDiagrams } from '../src/diagram.js';
import { planBook } from '../src/plan.js';

function usage() {
  console.error('Usage:\n  quire plan <book.json>\n  quire diagram <book.json> [--out <directory>]');
}

function parseArgs(argv) {
  const command = argv[0];
  let file;
  let out;
  for (let index = 1; index < argv.length; index += 1) {
    if (argv[index] === '--out') {
      out = argv[index + 1];
      index += 1;
    } else {
      file = argv[index];
    }
  }
  return { command, file, out };
}

async function readBook(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

function printProblems(file, plan) {
  console.error(`${file}: ${plan.errors.length} problem${plan.errors.length === 1 ? '' : 's'}`);
  for (const error of plan.errors) console.error(`- ${error}`);
}

async function main(argv) {
  const { command, file, out } = parseArgs(argv);
  if ((command !== 'plan' && command !== 'diagram') || !file) {
    usage();
    return 1;
  }
  let book;
  try {
    book = await readBook(file);
  } catch (error) {
    console.error(`${file}: ${error.message}`);
    return 1;
  }
  const plan = planBook(book);
  if (!plan.ok) {
    printProblems(file, plan);
    return 1;
  }
  if (command === 'plan') {
    console.log(plan.text);
    return 0;
  }
  const diagrams = sheetDiagrams(plan);
  if (!out) {
    console.log(diagrams.map((diagram) => diagram.svg).join('\n'));
    return 0;
  }
  await mkdir(out, { recursive: true });
  for (const diagram of diagrams) {
    await writeFile(path.join(out, diagram.name), diagram.svg);
  }
  console.log(`${diagrams.length} diagrams in ${out}`);
  return 0;
}

process.exit(await main(process.argv.slice(2)));
