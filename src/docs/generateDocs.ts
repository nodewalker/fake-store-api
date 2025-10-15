import * as fs from 'fs';
import { execSync } from 'child_process';

function generateDocs() {
  const document = JSON.parse(
    fs.readFileSync('./swagger/swagger.json', 'utf-8'),
  );

  const tags = Array.from(
    new Set(
      Object.values(document.paths)
        .flatMap((pathItem) =>
          Object.values(pathItem as object).filter(Boolean),
        )
        .flatMap((op: { tags: any }) => (op?.tags ? op.tags : [])),
    ),
  );

  if (!fs.existsSync('./docs')) fs.mkdirSync('./docs');
  if (!fs.existsSync('./docs/api')) fs.mkdirSync('./docs/api');

  let summaryContent = '# Summary\n\n* [Introduction](README.md)\n';
  for (const tag of tags) {
    const filteredDoc: any = { ...document, paths: {} };
    for (const [path, pathItem] of Object.entries(document.paths)) {
      const filteredPathItem: any = {};
      for (const method of Object.keys(pathItem as object)) {
        const op = (pathItem as any)[method];
        if (op?.tags?.includes(tag)) filteredPathItem[method] = op;
      }
      if (Object.keys(filteredPathItem).length)
        filteredDoc.paths[path] = filteredPathItem;
    }

    const tmpJsonFile = `./swagger-${tag}.json`;
    fs.writeFileSync(tmpJsonFile, JSON.stringify(filteredDoc, null, 2));

    const mdFile = `./docs/api/api-${tag.toLowerCase()}.md`;
    execSync(
      `npx widdershins ${tmpJsonFile} -o ${mdFile} --summary --language_tabs javascript:JavaScript,typescript:TypeScript`,
      { stdio: 'inherit' },
    );

    summaryContent += `* [${tag}](api/api-${tag.toLowerCase()}.md)\n`;
    fs.unlinkSync(tmpJsonFile);
  }

  fs.writeFileSync('./docs/SUMMARY.md', summaryContent);
  console.log('✅ Markdown created and SUMMARY.md updated');
}

generateDocs();
