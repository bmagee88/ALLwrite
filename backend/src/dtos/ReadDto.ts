class ReadDto {
  user_id;
  page_id;

  constructor(user_id: string, page_id: string) {
    this.user_id = user_id;
    this.page_id = page_id;
  }
}

export default ReadDto;
