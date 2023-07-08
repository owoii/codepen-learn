declare namespace OConfig {
  interface Navigate {
    title?: string;
    description?: string;
    avatar?: string;
  }
  interface globalConfig {
    theme?: string;
    navigate?: Navigate;
  }

  interface OpenAIParams<T> {
    prefix: string;
    dataType: T;
    suffix: string;
    question: string;
  }
}
