import fs from 'fs';
import path from 'path';

const pagesDir = 'src/components/pages';
const files = [
  'AboutPage.tsx',
  'AircraftPage.tsx',
  'BlogPage.tsx',
  'ContactPage.tsx',
  'DestinationsPage.tsx',
  'ServicesPage.tsx'
];

const newCode = `const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: '50px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={\`transition-all duration-1000 ease-out \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} \${className || ''}\`}
    >
      {children}
    </div>
  );
};`;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const startStr = "const AnimatedElement: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {";
    const startIndex = content.indexOf(startStr);
    
    if (startIndex !== -1) {
      const endStr = "};";
      // Find the first "};" after startIndex + some offset to pass the inner useEffect "};"
      // Actually, we can search for the "return <div" then the "};" after it.
      const returnIndex = content.indexOf("return <div", startIndex);
      const endIndex = content.indexOf("};", returnIndex) + 2;
      
      const toReplace = content.substring(startIndex, endIndex);
      
      content = content.replace(toReplace, newCode);
      
      // Ensure useState is imported
      if (!content.includes('useState')) {
        content = content.replace("import { useEffect, useRef }", "import { useState, useEffect, useRef }");
        content = content.replace("import React, { useEffect, useRef }", "import React, { useState, useEffect, useRef }");
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Could not find start string in ${file}, or it's already updated.`);
    }
  }
});
