import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CategoryService } from '../entity-services/category.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICategory, IFeature, IPlatform } from '@access-hub/api-interfaces';
import { PlatformService } from '../entity-services/platform.service';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatChipsModule,
    AsyncPipe,
    MatStepperModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './create-app-form.component.html',
  styleUrl: './create-app-form.component.scss'
})
export class CreateAppFormComponent {
  categories$: Observable<ICategory[]> = this.categoryService.loadAll().pipe(
    map((res) => res.body ?? [])
  );
  selectedCategories$: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);

  platforms$: Observable<IPlatform[]> = this.platformService.loadAll().pipe(
    map((res) => res.body ?? [])
  )
  selectedPlatforms$: BehaviorSubject<IPlatform[]> = new BehaviorSubject<IPlatform[]>([]);

  features: WritableSignal<IFeature[]> = signal<IFeature[]>([]);
  addFeatureForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required])
  })

  constructor(
    private readonly categoryService: CategoryService,
    private readonly platformService: PlatformService,
  ) {}

  selectedPlatformsChange($event: MatChipListboxChange) {
    this.selectedPlatforms$.next($event.value);
  }

  selectedCategoriesChange($event: MatChipListboxChange) {
    this.selectedCategories$.next($event.value);
  }

  addFeature(feature: IFeature) {
    this.features.update((features) => ([...features, feature]));
  }

  removeFeature(featureIndex: number) {
    this.features.update((features) => {
      features.splice(featureIndex, 1);
      return features;
    });
  }

  submitAddFeatureForm() {
    this.addFeature(this.addFeatureForm.value);
    this.addFeatureForm.reset();
  }
}
