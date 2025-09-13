"use client"

interface SimpleContentProps {
  content: string
  className?: string
}

export function SimpleContent({ content, className = "" }: SimpleContentProps) {
  return (
    <div className={`simple-content-wrapper ${className}`}>
      <div 
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-h1:text-3xl prose-h1:lg:text-4xl prose-h1:mb-6 prose-h1:mt-8
          prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
          prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mb-3 prose-h3:mt-5
          prose-h4:text-lg prose-h4:lg:text-xl prose-h4:mb-2 prose-h4:mt-4
          prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
          prose-em:italic prose-em:text-gray-600 dark:prose-em:text-gray-400
          prose-ul:space-y-2 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
          prose-ol:space-y-2 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:my-6
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
          prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-lg prose-table:overflow-hidden
          prose-th:bg-gray-100 dark:prose-th:bg-gray-700 prose-th:font-semibold prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-4 prose-th:py-2 prose-th:text-left
          prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-2 prose-td:text-gray-700 dark:prose-td:text-gray-300
          prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:transition-colors prose-a:hover:underline
          prose-hr:border-none prose-hr:h-0.5 prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-gray-300 prose-hr:to-transparent prose-hr:my-8
          [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:object-contain
          [&_a]:transition-all [&_a]:duration-300
        "
        dangerouslySetInnerHTML={{ 
          __html: content
            // Transformer les liens d'affiliation en boutons
            .replace(/<a([^>]*href="[^"]*amazon[^"]*"[^>]*)>/gi, (match, attributes) => {
              return `<a${attributes} class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 my-4 no-underline">`;
            })
            .replace(/<a([^>]*href="[^"]*shop[^"]*"[^>]*)>/gi, (match, attributes) => {
              return `<a${attributes} class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 my-4 no-underline">`;
            })
            .replace(/<a([^>]*href="[^"]*buy[^"]*"[^>]*)>/gi, (match, attributes) => {
              return `<a${attributes} class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 my-4 no-underline">`;
            })
        }}
      />
    </div>
  )
}
