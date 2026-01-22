#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { planBook } from '../src/plan.js';

function usage() {
  console.error('Usage: quire plan <book.json>');
}

async function main(argv) {
  const [command, file] = argv;
  if (command !== 'plan' || !file) {
    usage();
    return 1;
  }
  let book;
  try {
    book = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    console.error(`${file}: ${error.message}`);
    return 1;
  }
  const plan = planBook(book);
  if (!plan.ok) {
    console.error(`${file}: ${plan.errors.length} problem${plan.errors.length === 1 ? '' : 's'}`);
    for (const error of plan.errors) console.error(`- ${error}`);
    return 1;
  }
  console.log(plan.text);
  return 0;
}

process.exit(await main(process.argv.slice(2)));
