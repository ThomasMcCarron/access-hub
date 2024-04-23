import { Directive, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, map, of, Subscription, switchMap, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IEntityService } from '@access-hub/ngx-orm-util';
import { IEntity } from '@access-hub/shared-orm-util';

@Directive()
export abstract class AdminEntityListBaseComponent<ID extends string | number, T extends IEntity<ID>> implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[];
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  isLoading = false;

  dataLength$ = this.service.count().pipe(
    map((res) => res.body ?? 0)
  );

  pageSizeOptions: number[] = [5, 10, 25, 100];
  private pageEvent$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0
  });
  private subscription: Subscription = new Subscription();

  constructor(protected service: IEntityService<ID, T>) {
    this.displayedColumns = this.setDisplayedColumns();
  }

  abstract setDisplayedColumns(): string[];

  ngOnInit(): void {
    this.subscription.add(
      this.pageEvent$.pipe(
        tap(() => {
          this.isLoading = true;
          console.debug('Loading data');
        }),
        switchMap(event =>
          this.service.findPage(event.pageIndex, event.pageSize).pipe(
            catchError(err => {
              console.error(err);
              return of(new HttpResponse<T[]>({ body: [] }));
            }),
          )
        ),
        tap((res: HttpResponse<T[]>) => {
          this.dataSource.data = res.body ?? [];
          this.isLoading = false;
          console.debug('Finished loading data');
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handlePageEvent(event: PageEvent): void {
    console.debug('Page changed');
    this.pageEvent$.next(event);
  }

  refresh(): void {
    this.pageEvent$.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }
}
