import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  { path: '', component: EntryListComponent },  // master
  { path: 'new', component: EntryFormComponent }, // detail
  { path: ':id/edit', component: EntryFormComponent }, // detail
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
