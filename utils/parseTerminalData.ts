export interface Terminal {
  name: string;
  type: string;
  connectivity: string;
  userInterface: string;
  operatingSystem: string;
  description: string;
}

export function parseTerminalData(data: string): Terminal[] {
  const lines = data.trim().split('\n');
  return lines.map(line => {
    const [name, type, connectivity, userInterface, operatingSystem,...descriptionParts] = line.split('\t');
    return {
      name,
      type,
      connectivity,
      userInterface,
      operatingSystem,
      description: descriptionParts.join('\t').trim()
    };
  });
}

