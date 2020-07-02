import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss'],
})
export class SingleBookComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Temporary empty book to avoid errors
    this.book = new Book('', '');
    // Get id in url
    const id = this.route.snapshot.params['id'];
    // Get single book
    this.booksService.getSingleBook(+id).then((book: Book) => {
      this.book = book;
    });
  }
}
