class PageDto {
  parent_id;
  prompt;
  body_text;
  page_num;
  author;
  cover_id;

  constructor(
    parent_id: number | null,
    prompt: string | null,
    body_text: string,
    page_num: number,
    author: string,
    cover_id: number
  ) {
    this.parent_id = parent_id;
    this.prompt = prompt;
    this.body_text = body_text;
    this.page_num = page_num;
    this.author = author;
    this.cover_id = cover_id;
  }
}

export default PageDto;
