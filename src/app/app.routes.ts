import { Routes } from '@angular/router';
import { AllPhotosComponent } from './components/all-photos/all-photos.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';

export const routes: Routes = [
  {
    path: '',
    component: AllPhotosComponent,
    title: 'Home',
  },
  {
    path: 'photo/:id',
    component: PhotoDetailsComponent,
    title: 'Photo Details',
  },
  {
    path: 'add',
    component: AddPhotoComponent,
    title: 'Add Photo',
  },
];
