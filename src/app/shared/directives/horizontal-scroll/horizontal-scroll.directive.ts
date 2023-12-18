import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';

interface ICarouselContext<T> {
  $implicit: T[];
  itemsPerPage: number;
  next: () => void;
  prev: () => void;
  appHorizontalScroll: T[];
}
@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true,
})
export class HorizontalScrollDirective<T>
  implements OnInit, OnDestroy, OnChanges
{
  @Input()
  appHorizontalScroll: T[] = [];

  @Input()
  itemsPerPage: number = 4;
  templateRef = inject(TemplateRef<ICarouselContext<T>>);
  viewContainerRef = inject(ViewContainerRef);

  private readonly currentPage$ = new BehaviorSubject(0);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.subscribePageChanging();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateView();
  }
  private subscribePageChanging() {
    this.currentPage$
      .pipe(
        map((currentPage) => this.getCurrentData(currentPage)),
        takeUntil(this.destroy$)
      )
      .subscribe((context) => {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef, context);
      });
  }

  private getCurrentData(page: number): ICarouselContext<T> {
    const length = this.appHorizontalScroll?.length || 0;

    const data =
      page + this.itemsPerPage > length
        ? [
            ...this.appHorizontalScroll?.slice(page),
            ...this.appHorizontalScroll?.slice(
              0,
              this.itemsPerPage - (length - page)
            ),
          ]
        : (this.appHorizontalScroll?.slice(
            page,
            page + this.itemsPerPage
          ) as T[]);

    return {
      $implicit: data,
      appHorizontalScroll: this.appHorizontalScroll,
      itemsPerPage: this.itemsPerPage,
      next: () => this.next(),
      prev: () => this.prev(),
    };
  }

  private updateView() {
    if (!this.appHorizontalScroll?.length) {
      this.viewContainerRef.clear;
      return;
    }
    this.currentPage$.next(0);
  }
  private next() {
    const nextPage = this.currentPage$.value + 1;
    const length = this.appHorizontalScroll?.length || 0;
    const newIndex = nextPage < length ? nextPage : 0;

    this.currentPage$.next(newIndex);
  }

  private prev() {
    const prevPage = this.currentPage$.value - 1;

    const newIndex =
      prevPage < 0 ? (this.appHorizontalScroll as [])?.length - 1 : prevPage;

    this.currentPage$.next(newIndex);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
