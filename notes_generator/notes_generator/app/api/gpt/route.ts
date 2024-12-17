import OpenAI from "openai"
import {NextResponse} from "next/server";
import {GPTRequest} from "@/types";

export const POST = async(Content: any) => {

  const content: GPTRequest = await Content.json()
  console.log(content)
  const {prompt, tag, courseType} = content

  try {
    const openai = new OpenAI(
        {
          apiKey: process.env.QWEN_API_KEY,
          baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
        }
    );
    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `please complete the following notes if you are the 
        ${courseType} teacher of the student. This is the incomplete notes: ${prompt}, and these are
        the key words: ${tag}`}
      ],
    });
    console.log("note created by gpt");
    return NextResponse.json(completion.choices[0].message.content)
  } catch (error) {
    console.log(`错误信息：${error}`);
    console.log("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code");
    return NextResponse.json(
        { error: "请求处理失败，请稍后重试。" },
        { status: 500 }
    )
  }
}