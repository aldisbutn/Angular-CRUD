import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { PhotosService } from '../../photos.service';
import { PhotoType } from '../../PhotoType';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.css',
})
export class AddPhotoComponent {
  constructor(private photoService: PhotosService, private router: Router) {}

  photoForm = new FormGroup({
    id: new FormControl(uuidv4()),
    title: new FormControl(''),
    description: new FormControl(''),
    imageURL: new FormControl(''),
    dateTaken: new FormControl(''),
  });

  addPhoto() {
    const photo: PhotoType = {
      id: this.photoForm.value.id || '',
      title: this.photoForm.value.title || '',
      description: this.photoForm.value.description || '',
      imageURL: this.photoForm.value.imageURL || '',
      dateTaken: this.photoForm.value.dateTaken || '',
    };
    this.photoService.addPhoto(photo).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']);
      },
      error: (e) => console.log(e),
    });
  }
}
