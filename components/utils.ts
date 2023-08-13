/**
 * Extracts the "truthiness" of a bit given a mask
 * @param {number} binaryNum - The number to query from
 * @param {number} mask - This is the bitmask that selects the bit
 * @returns {boolean} - "Truthiness" of the bit we're interested in
 */
export function getBits(binaryNum: number, mask: number) {
  const query = binaryNum & mask;
  return Boolean(query);
}

/**
 * Extracts the "truthiness" of a bit given a position
 * @param {number} binaryNum - The number to query from
 * @param {number} position - This is the zero-indexed position of the bit from the right
 * @returns {boolean} - "Truthiness" of the bit we're interested in
 */
function getBitsFrom(binaryNum: number, position: number) {
  // Bit-shifts according to zero-indexed position
  const mask = 1 << position;
  const query = binaryNum & mask;
  return Boolean(query);
}
