import { Component, HostBinding } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CategoryService } from '../shared/entity-services/category.service';
import { MatChipsModule } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ICategory } from '@access-hub/api-interfaces';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    AsyncPipe,
    MatTooltip
  ]
})
export class HomeComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  categories$: Observable<ICategory[]> = this.categoryService.loadAll()
    .pipe(
      map((res) => res.body ?? [])
    );

  constructor(private categoryService: CategoryService) {
  }
}
