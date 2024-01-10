import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '../../photos.service';
import { PhotoType } from '../../PhotoType';
import { NgIf, Location } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [NgIf, ButtonComponent, ReactiveFormsModule],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.css',
})
export class PhotoDetailsComponent {
  photo: PhotoType = {
    id: '',
    title: '',
    description: '',
    imageURL: '',
    dateTaken: '',
  };
  id: string = '';

  photoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    imageURL: new FormControl(''),
    dateTaken: new FormControl(''),
  });

  editMode: boolean = false;

  constructor(
    private photosService: PhotosService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getID();
    this.getPhoto(this.id);
  }

  getID() {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  getPhoto(id: string) {
    this.photosService.getPhoto(id).subscribe({
      next: (data) => {
        this.photo = data;
      },
      error: (e) => console.log(e),
    });
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

  toggleEdit() {
    this.editMode = true;
  }

  editPhoto() {
    const editedPhoto: PhotoType = {
      id: this.photoForm.value.id || '',
      title: this.photoForm.value.title || '',
      description: this.photoForm.value.description || '',
      imageURL: this.photoForm.value.imageURL || '',
      dateTaken: this.photoForm.value.dateTaken || '',
    };
    this.photosService.editPhoto(editedPhoto, this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.editMode = false;
      },
    });
  }
}
