import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatServices = async <T>({
  prefix,
  suffix,
  question,
  dataType,
}: OConfig.OpenAIParams<T>): Promise<T> => {
  const prompt = `${prefix},返回的数据格式为:${JSON.stringify(
    dataType
  )},${suffix}:${question}`;
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 500,
    prompt,
  });
  let result = res.data.choices[0].text?.replace(/\n/g, "");
  if (result != undefined) {
    result = JSON.parse(result);
  }
  return result as T;
};

export default chatServices;
