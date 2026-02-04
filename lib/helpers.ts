export function formatAddress(address: string) {
  return address.split(",").map(line => line.trim());
}

