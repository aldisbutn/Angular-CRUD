import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { PhotosService } from '../../photos.service';
import { PhotoType } from '../../PhotoType';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, ButtonComponent],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.css',
})
export class AddPhotoComponent {
  constructor(private photoService: PhotosService, private router: Router) {}

  photoForm = new FormGroup({
    id: new FormControl(uuidv4(), [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
    dateTaken: new FormControl('', [Validators.required]),
  });
  // Form controls for showing error messages
  get form() {
    return this.photoForm.controls;
  }

  addPhoto() {
    const photo: PhotoType = {
      id: this.photoForm.value.id || '',
      title: this.photoForm.value.title || '',
      description: this.photoForm.value.description || '',
      imageURL: this.photoForm.value.imageURL || '',
      dateTaken: this.photoForm.value.dateTaken || '',
    };
    // If form is untouched show a alert
    if (this.photoForm.untouched) {
      alert('Form is empty, please enter some data');
      return;
      // If form is invalid dont post the photo
    } else if (this.photoForm.invalid) {
      return;
    }
    // Post photo and navigate to the homepage
    this.photoService.addPhoto(photo).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']);
      },
      error: (e) => console.log(e),
    });
  }
}
