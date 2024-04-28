import { Component, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CategoryService } from '../entity-services/category.service';
import { BehaviorSubject, map, Observable, Subscription, tap, withLatestFrom } from 'rxjs';
import { ICategory, IFeature, IPlatform } from '@access-hub/api-interfaces';
import { PlatformService } from '../entity-services/platform.service';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DeveloperService } from '../entity-services/developer.service';

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
    MatIconModule,
    NgClass
  ],
  templateUrl: './create-app-form.component.html',
  styleUrl: './create-app-form.component.scss'
})
export class CreateAppFormComponent implements OnInit, OnDestroy {
  categories$: Observable<ICategory[]> = this.categoryService.loadAll().pipe(
    map((res) => res.body ?? [])
  );
  selectedCategories$: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);

  basicDetailsForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    website: new FormControl<string>('', [])
  });

  pricingAndPlatformsForm: FormGroup = new FormGroup({
    isPaid: new FormControl<boolean>(false, []),
    price: new FormControl<number | undefined>(undefined),
    hasSubscription: new FormControl<boolean>(false, [])
  });

  platforms$: Observable<IPlatform[]> = this.platformService.loadAll().pipe(
    map((res) => res.body ?? [])
  );
  selectedPlatforms$: BehaviorSubject<IPlatform[]> = new BehaviorSubject<IPlatform[]>([]);

  features: WritableSignal<IFeature[]> = signal<IFeature[]>([]);
  addFeatureForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required])
  });

  private subscription: Subscription = new Subscription();

  constructor(
    private readonly categoryService: CategoryService,
    private readonly platformService: PlatformService,
    private readonly developerService: DeveloperService
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.selectedPlatforms$.pipe(
        withLatestFrom(this.platforms$),
        tap(([selectedPlatforms, platforms]) => {
          const unselectedPlatforms = platforms.filter(p => selectedPlatforms.includes(p));
          unselectedPlatforms.forEach((platform) => {
            this.pricingAndPlatformsForm.removeControl(`${platform.id}-${platform.name}-link`);
          });
          selectedPlatforms.forEach((platform) => {
            if (!this.pricingAndPlatformsForm.contains(`${platform.id}-${platform.name}-link`)) {
              this.pricingAndPlatformsForm.addControl(
                `${platform.id}-${platform.name}-link`,
                new FormControl<string>('', [Validators.required])
              );
            }
          });
        })
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectedPlatformsChange($event: MatChipListboxChange) {
    this.selectedPlatforms$.next($event.value);
    // Remove non-selected platforms

    // Set all selected platforms
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
