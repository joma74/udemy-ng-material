import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MaterialModule } from "../material/material.module"
import { CurrentTrainingComponent } from "./current-training/current-training.component"
import { StopTrainingComponent } from "./current-training/stop-training.component"
import { NewTrainingComponent } from "./new-training/new-training.component"
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component"
import { TrainingComponent } from "./training.component"

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    TrainingComponent,
  ],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
