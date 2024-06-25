class Page {
  parent_id;
  prompt;
  body_text;
  page_num;
  author;

  constructor(
    username: string,
    prompt: string,
    body_text: string,
    page_num: string,
    author: string
  ) {
    this.parent_id = page_num;
    this.prompt = prompt;
    this.body_text = body_text;
    this.page_num = page_num;
    this.author = author;
  }
}

export default Page;
