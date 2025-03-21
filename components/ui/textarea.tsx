function TextArea({
  placeholder,
  className,
}: {
  placeholder: string;
  className: string | null;
}) {
  return (
    <textarea
      placeholder={placeholder}
      className={`flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mb-4 ${className}`}
    />
  );
}

export default TextArea;
