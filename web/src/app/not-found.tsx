const NotFound = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md flex flex-col items-center text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Desculpe, não conseguimos encontrar esta página.
          </p>
          <p className="mt-4 mb-10 dark:text-gray-400">
            Mas não se preocupe, você pode encontrar muitas outras coisas em
            nossa página inicial.
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 flex w-fit font-semibold rounded dark:bg-blue-500 dark:text-white"
          >
            Voltar à página inicial
          </a>
        </div>
      </div>
    </section>
  )
}

export default NotFound
