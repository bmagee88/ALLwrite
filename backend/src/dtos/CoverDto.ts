class CoverDto {
  title;
  author;
  genre;
  summary;
  first_page;

  constructor(title: string, author: string, genre: string, summary: string, first_page: string) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.summary = summary;
    this.first_page = first_page;
  }
}

export default CoverDto;
