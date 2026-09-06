import { ArrowRight, FileText } from "lucide-react";

export default function DocumentRow({ title, description, href, linkText }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
        <FileText size={20} className="text-[var(--color-primary-active)]" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>

      <span className="shrink-0 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-active)] hover:text-[var(--color-primary-hover)] transition-colors">
        {linkText}
        <ArrowRight size={15} />
      </span>
    </a>
  );
}
