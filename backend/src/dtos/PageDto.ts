class PageDto {
  parent_id;
  prompt;
  body_text;
  page_num;
  author;

  constructor(parent_id, prompt, body_text, page_num, author) {
    this.parent_id = parent_id;
    this.prompt = prompt;
    this.body_text = body_text;
    this.page_num = page_num;
    this.author = author;
  }
}

export default PageDto;
