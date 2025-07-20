export const assertNever = (target: never): never => {
  throw new Error(`Unexpected entry type: ${JSON.stringify(target)}`);
};
