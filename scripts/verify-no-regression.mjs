import { readFileSync } from 'node:fs';

const [baselinePath, candidatePath] = process.argv.slice(2);
if (!baselinePath || !candidatePath) {
  throw new Error('Usage: node scripts/verify-no-regression.mjs <baseline.json> <candidate.json>');
}

const readFailures = (path) => {
  const report = JSON.parse(readFileSync(path, 'utf8'));
  if (!Array.isArray(report.failures)) throw new Error(`Invalid verification report: ${path}`);
  return report.failures;
};

const baseline = readFailures(baselinePath);
const candidate = readFailures(candidatePath);
const allowance = new Map();
for (const failure of baseline) allowance.set(failure, (allowance.get(failure) || 0) + 1);

const regressions = [];
for (const failure of candidate) {
  const remaining = allowance.get(failure) || 0;
  if (remaining > 0) allowance.set(failure, remaining - 1);
  else regressions.push(failure);
}

console.log(JSON.stringify({ baselineFailures: baseline.length, candidateFailures: candidate.length, newRegressions: regressions.length }, null, 2));
if (regressions.length) {
  console.error('New verification regressions:\n' + regressions.join('\n'));
  process.exit(1);
}

console.log('No new verification regression detected. Existing baseline debt remains visible.');
