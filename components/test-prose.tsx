export function TestProse() {
  return (
    <div className="prose prose-lg max-w-none
      prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:via-pink-600 prose-h1:to-blue-600 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:text-center
      prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:bg-gradient-to-r prose-h2:from-indigo-600 prose-h2:via-purple-600 prose-h2:to-pink-600 prose-h2:bg-clip-text prose-h2:text-transparent prose-h2:border-l-4 prose-h2:border-indigo-500 prose-h2:pl-6 prose-h2:py-2
      prose-h3:text-2xl prose-h3:lg:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-emerald-600 dark:prose-h3:text-emerald-400 prose-h3:font-semibold
      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
      prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:bg-yellow-100 dark:prose-strong:bg-yellow-900/30 prose-strong:px-2 prose-strong:py-1 prose-strong:rounded
      prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-xl
      prose-th:bg-gradient-to-r prose-th:from-purple-600 prose-th:to-pink-600 prose-th:text-white prose-th:font-bold prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:text-lg
      prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-6 prose-td:py-4 prose-td:text-gray-700 dark:prose-td:text-gray-300 prose-td:text-base
    ">
      <h1>Test H1 avec gradient</h1>
      <h2>Test H2 avec gradient et bordure</h2>
      <h3>Test H3 en couleur émeraude</h3>
      <p>Ceci est un paragraphe de test avec du <strong>texte en gras</strong> et du <em>texte en italique</em>.</p>
      <table>
        <thead>
          <tr>
            <th>Caractéristique</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Marque</strong></td>
            <td>Test</td>
          </tr>
          <tr>
            <td><strong>Type</strong></td>
            <td>Exemple</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
