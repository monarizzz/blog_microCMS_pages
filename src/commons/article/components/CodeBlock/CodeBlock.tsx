type Props = {
  children: string;
  language?: string;
};

const CodeBlock = ({ children, language }: Props) => {
  return (
    <div className="w-full overflow-hidden rounded-xs border border-outline-variant bg-surface-container-low">
      {language && (
        <div className="border-b border-outline-variant bg-surface px-4 py-2">
          <span className="font-sans text-sm font-medium tracking-wider text-secondary">
            {language}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="whitespace-pre font-mono text-base leading-normal text-primary">
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
