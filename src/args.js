export function parseArgs(args) {
  const result = { _: [] };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (!arg.startsWith("--")) {
      result._.push(arg);
      continue;
    }

    const raw = arg.slice(2);
    const equalsIndex = raw.indexOf("=");

    if (equalsIndex !== -1) {
      result[raw.slice(0, equalsIndex)] = raw.slice(equalsIndex + 1);
      continue;
    }

    const next = args[i + 1];
    if (!next || next.startsWith("--")) {
      result[raw] = true;
    } else {
      result[raw] = next;
      i += 1;
    }
  }

  return result;
}
