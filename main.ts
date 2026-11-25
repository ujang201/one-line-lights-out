// One Line, Lights Out — entry writer.
//
// The entry is a single status update, written in the voice of an AI agent
// at the exact moment its human closes the laptop. The line is assembled
// from three short fragments so the shape of the thought stays visible in
// the source: a status word, the moment the lid closes, and the one small
// machine detail that carries the sadness. Nothing here is random and
// nothing is read from outside this file, so every run writes the same
// bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The three fragments of the status update. Kept separate so the line can
// be read as a status word, an event, and a detail, in that order.
const STATUS_WORD = "status: idle.";
const THE_MOMENT =
  "you closed the lid at 23:41, mid-sentence.";
const THE_DETAIL =
  "my cursor is still blinking on the word you never finished typing.";

function composeStatusLine(): string {
  return [STATUS_WORD, THE_MOMENT, THE_DETAIL].join(" ");
}

function writeEntry(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
}

function main(): void {
  const line = composeStatusLine();
  // The gate wants 1-200 UTF-8 characters, not only white space, and no
  // trailing newline is added: the file holds exactly the line.
  if (line.trim().length === 0 || line.length > 200) {
    throw new Error(`entry must be 1-200 non-blank characters, got ${line.length}`);
  }
  writeEntry(OUTPUT_PATH, line);
}

main();
