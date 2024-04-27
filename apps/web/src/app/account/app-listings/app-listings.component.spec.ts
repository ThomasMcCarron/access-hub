import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListingsComponent } from './app-listings.component';

describe('AppListingsComponent', () => {
  let component: AppListingsComponent;
  let fixture: ComponentFixture<AppListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
