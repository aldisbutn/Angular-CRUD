import { Component } from '@angular/core';
import { PhotoType } from '../../PhotoType';
import { PhotosService } from '../../photos.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';

@Component({
  selector: 'app-all-photos',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf, PhotoDetailsComponent],
  templateUrl: './all-photos.component.html',
  styleUrl: './all-photos.component.css',
})
export class AllPhotosComponent {
  photos: PhotoType[] = [];
  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.photosService
      .getPhotos()
      .subscribe((photos) => (this.photos = photos));
  }
}
