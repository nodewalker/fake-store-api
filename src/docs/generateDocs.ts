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
  if (!fs.existsSync('./docs/models')) fs.mkdirSync('./docs/models');

  const summaryInit =
    '## API Reference\n\n- [Overview](api/README.md)\n\n## Models\n\n- [Overview](models/README.md)\n';

  const summaryContent: string[] = [
    ...summaryInit.matchAll(/(##\s+.+?(?=(\n##\s)|$))/gs),
  ].map((m) => m[1]);
  console.log(summaryContent);
  let i = 0;
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
      `npx widdershins ${tmpJsonFile} -o ${mdFile} --summary --httpsnippet --language_tabs javascript:JavaScript,typescript:TypeScript`,
      { stdio: 'inherit' },
    );

    const str: string = fs.readFileSync(mdFile, 'utf8');
    const replacedFile = str.replace(
      /\[([^\]]+)\]\(#schema([^\)]+)\)/gi,
      (_match, name) => `[${name}](../models/${name}.md)`,
    );
    const lines: string[] = replacedFile.split('\n');
    const res: string[] = [];
    res.push(...lines.slice(0, 15));
    res.push(...lines.slice(28));
    fs.writeFileSync(mdFile, res.join('\n').split('# Schemas')[0]);
    if (i === 0) {
      const sc: string = replacedFile.split('# Schemas')[1];
      const regex = /(<h2 id="tocS_[^"]+">[^<]+<\/h2>)/g;
      const d: string[] = sc.split(regex).slice(1);
      for (let j = 0; j < d.length; j += 2) {
        const name = d[j].split(/<h2 id="tocS_([^<]+)">[^"]+<\/h2>/g);
        fs.writeFileSync(
          `./docs/models/${name[1]}.md`,
          [d[j], d[j + 1]].join('\n'),
        );
        summaryContent[1] += `- [${name[1]}](models/${name[1]}.md)\n`;
      }
    }
    i = 1;

    summaryContent[0] += `- [${tag}](api/api-${tag.toLowerCase()}.md)\n`;
    fs.unlinkSync(tmpJsonFile);
  }

  fs.writeFileSync(
    './docs/SUMMARY.md',
    '# Summary\n\n- [Overview](README.md)\n\n' + summaryContent.join('\n'),
  );
  console.log('✅ Markdown created and SUMMARY.md updated');
}

generateDocs();
