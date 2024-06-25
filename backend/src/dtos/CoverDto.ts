class CoverDto {
  title;
  author;
  genre;
  summary;
  first_page;

  constructor(title, author, genre, summary, first_page) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.summary = summary;
    this.first_page = first_page;
  }
}

export default CoverDto;
