let allArticles = [] as Article[];

export function useArticles() {
  // Declare the state variables and the setter functions
  const articles = useState<Article[]>('posts');

  // Set the articles state and the allArticles variable
  function setArticles(newArticles: Article[]): void {
    if (!Array.isArray(newArticles)) throw new Error('Articles must be an array.');
    articles.value = newArticles ?? [];
    allArticles = JSON.parse(JSON.stringify(newArticles));
  }

  const updateArticleList = async (): Promise<void> => {
    const { scrollToTop } = useHelpers();

    // scroll to top of page
    scrollToTop();

    // return all articles if no filters are active
    articles.value = allArticles;

    return;
  };

  return { articles, allArticles, setArticles, updateArticleList };
}

