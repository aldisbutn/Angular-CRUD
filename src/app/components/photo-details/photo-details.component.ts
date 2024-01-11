import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '../../photos.service';
import { PhotoType } from '../../PhotoType';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [NgIf, ButtonComponent, ReactiveFormsModule],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.css',
})
export class PhotoDetailsComponent {
  constructor(
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  photoForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
    dateTaken: new FormControl('', [Validators.required]),
  });
  // Form controls for showing error messages
  get form() {
    return this.photoForm.controls;
  }

  // Get the photo ID from the URL
  id: string = '';
  getID() {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  getPhoto(id: string) {
    this.photosService.getPhoto(id).subscribe({
      next: (data) => {
        this.photoForm.setValue({
          id: data.id,
          title: data.title,
          description: data.description,
          imageURL: data.imageURL,
          dateTaken: data.dateTaken,
        });
        // Change the page title to the photo title
        this.titleService.setTitle(`${this.photoForm.value.title}`);
      },
      error: (e) => console.log(e),
    });
  }

  ngOnInit() {
    this.getID();
    this.getPhoto(this.id);
  }

  deletePhoto() {
    this.photosService.deletePhoto(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']);
      },
      error: (e) => console.log(e),
    });
  }

  editMode: boolean = false;
  toggleEdit() {
    this.editMode = true;
    this.titleService.setTitle(`Edit | ${this.photoForm.value.title}`);
  }

  editPhoto() {
    const editedPhoto: PhotoType = {
      id: this.photoForm.value.id || '',
      title: this.photoForm.value.title || '',
      description: this.photoForm.value.description || '',
      imageURL: this.photoForm.value.imageURL || '',
      dateTaken: this.photoForm.value.dateTaken || '',
    };
    if (this.photoForm.invalid) {
      return;
    }
    this.photosService.editPhoto(editedPhoto, this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.editMode = false;
        this.titleService.setTitle(`${this.photoForm.value.title}`);
      },
    });
  }
}
