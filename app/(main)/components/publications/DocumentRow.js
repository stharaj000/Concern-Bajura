import { ArrowRight, FileText } from "lucide-react";

export default function DocumentRow({ title, description, href, linkText }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-primary-light flex items-center justify-center">
        <FileText size={20} className="text-primary" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text">
            {title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            {description}
          </p>
        </div>

        <span className="shrink-0 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
          {linkText}
          <ArrowRight size={15} />
        </span>
      </div>
    </a>
  );
}
