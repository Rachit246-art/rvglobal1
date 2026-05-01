import fs from 'fs';
import path from 'path';

const pagesDir = 'c:/Users/MSI/OneDrive/Desktop/rvglobalmain/aero-react/src/components/pages';
const uiDir = 'c:/Users/MSI/OneDrive/Desktop/rvglobalmain/aero-react/src/components/ui';

const allDirs = [pagesDir, uiDir];

for (const dir of allDirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Remove import lines containing @/integrations or @/entities
    const lines = content.split('\n');
    const filtered = lines.filter(line => {
      const trimmed = line.trim();
      if (trimmed.includes("from '@/integrations'") || 
          trimmed.includes("from '@/integrations/") ||
          trimmed.includes("from '@/entities'") ||
          trimmed.includes("from '@/entities/") ||
          trimmed.includes('from "@/integrations"') ||
          trimmed.includes('from "@/integrations/') ||
          trimmed.includes('from "@/entities"') ||
          trimmed.includes('from "@/entities/') ||
          trimmed.includes("from '@wix/")) {
        changed = true;
        return false;
      }
      return true;
    });

    if (changed) {
      content = filtered.join('\n');
    }

    // Remove type annotations referencing entity types like <CharterServices>, <AircraftGuide[]>, etc.
    // Replace useState<EntityType[]>([]) with useState<any[]>([])
    content = content.replace(/useState<[A-Z]\w+\[\]>/g, 'useState<any[]>');
    content = content.replace(/useState<[A-Z]\w+>/g, 'useState<any>');
    
    // Replace BaseCrudService.getAll<...>(...) calls  
    content = content.replace(/BaseCrudService\.getAll<[^>]+>\([^)]+\)/g, 'Promise.resolve({ items: [] })');
    content = content.replace(/BaseCrudService\.create<[^>]+>\([^)]*\{[\s\S]*?\}\)/g, 'Promise.resolve({})');
    content = content.replace(/BaseCrudService\.\w+/g, 'Promise.resolve({})');

    fs.writeFileSync(filePath, content);
    if (changed) console.log(`Fixed: ${file}`);
  }
}

// Also fix member-protected-route.tsx and sign-in.tsx
const memberRoute = path.join(uiDir, 'member-protected-route.tsx');
if (fs.existsSync(memberRoute)) {
  fs.writeFileSync(memberRoute, `import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MemberProtectedRoute() {
  return <Outlet />;
}
`);
  console.log('Fixed: member-protected-route.tsx');
}

const signIn = path.join(uiDir, 'sign-in.tsx');
if (fs.existsSync(signIn)) {
  fs.writeFileSync(signIn, `import React from 'react';

export default function SignIn() {
  return <div>Sign In</div>;
}
`);
  console.log('Fixed: sign-in.tsx');
}

console.log('All integrations/entities removed!');
