const fs = require('fs');
const path = require('path');

const prismaDir = path.join(__dirname, 'prisma');
const modelsDir = path.join(prismaDir, 'models');

const baseSchemaPath = path.join(prismaDir, 'base.prisma');
const baseSchema = fs.readFileSync(baseSchemaPath, 'utf-8');

const modelFiles = fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.prisma'))
  .sort((a, b) => {
    if (a === 'Enum.prisma') return -1;
    if (b === 'Enum.prisma') return 1;
    return a.localeCompare(b);
  });

const modelContents = modelFiles.map(file =>
  fs.readFileSync(path.join(modelsDir, file), 'utf-8')
);

const finalSchema = [baseSchema, ...modelContents].join('\n\n');

fs.writeFileSync(path.join(prismaDir, 'schema.prisma'), finalSchema);
console.log('schema.prisma built successfully with files:', modelFiles);

