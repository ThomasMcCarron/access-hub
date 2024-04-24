import { Component, HostBinding } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss'],
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    RouterLink,
    MatDivider,
    MatExpansionModule
  ]
})
export class ContributeComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  title = 'Contribute to Access Hub ';
}
