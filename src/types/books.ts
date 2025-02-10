export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    infoLink: string;
    publishedDate?: string;
    publisher?: string;
    categories?: string[];
    pageCount?: number;
  };
}

export interface BooksResponse {
  items: Book[];
  totalItems: number;
  kind: string;
}