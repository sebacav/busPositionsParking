import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCardModule, MatProgressBarModule,
  MatGridListModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatTooltipModule, MatDividerModule, MatSliderModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatBottomSheetModule, MatFormFieldModule, MatDialogModule, MatTabsModule, MatBadgeModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatRippleModule,
  MatSlideToggleModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTreeModule,
  MatOptionModule,
  MatMenuModule,
  MatCheckboxModule,
  MatPaginatorIntl
} from '@angular/material';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    MatToolbarModule
  ]
})
export class MaterialModule { }
