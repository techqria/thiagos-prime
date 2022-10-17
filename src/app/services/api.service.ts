import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MeatsDto } from '../dtos/meats.dto';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { CarouselDto } from '../dtos/carousel.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.api

  private bucket: S3Client;

  constructor(private http: HttpClient) {
    this.bucket = new S3Client(
      {
        credentials: {
          accessKeyId: environment.awsAccessKeyId,
          secretAccessKey: environment.secretAccessKey,
        },
        region: environment.region,
      }
    );
  }

  getAdmin() {
    return this.http.get(`${this.url}/admin`)
  }

  getAll(): Observable<MeatsDto[]> {
    return this.http
      .get<MeatsDto[]>(`${this.url}/meats/getAll`)
  }

  getAllImages(): Observable<CarouselDto[]> {
    return this.http
      .get<CarouselDto[]>(`${this.url}/meats/getAllImages`)
  }

  login() {
    return this.http.get(`${this.url}/login`)
  }

  newMeat(meat: MeatsDto) {
    return this.http.post(`${this.url}/meats/new-meat`, meat);
  }

  newImageCarousel(image: CarouselDto) {
    return this.http.post(`${this.url}/meats/new-image`, image);
  }

  removeMeat(meatId: string) {

    this.removeFile(meatId);
    return this.http.post(`${this.url}/meats/remove-meat/${meatId}`, null);
  }

  removeImage(imageId: string) {

    this.removeFile(imageId);
    return this.http.post(`${this.url}/meats/remove-image/${imageId}`, null);
  }

  updateMeat(meatId: string, meat: MeatsDto) {
    return this.http.put(`${this.url}/meats/update-meat/${meatId}`, meat);
  }

  getMeatById(meatId: string): Observable<MeatsDto> {
    return this.http.get<MeatsDto>(`${this.url}/meats/get-meat/${meatId}`);
  }

  async uploadFile(file: File, category: string) {

    const params = {
      Bucket: environment.bucket,
      Key: `${category}/` + file.name.trim(),
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    try {
      const response = await this.bucket.send(new PutObjectCommand(params));
      console.log("SUCCESS", response);
      return 'https://thiagos-prime.s3.amazonaws.com/' + 'kits/' + file.name.trim();
    } catch (error) {
      return error
    }

  }

  async removeFile(meatId: string) {

    console.log(meatId)

    this.getMeatById(meatId).subscribe(
      success => {
        console.log(success)
        const params = {
          Bucket: environment.bucket,
          Key: success.image,
        };

        console.log(params)

        try {
          return this.bucket.send(new DeleteObjectCommand(params))

        } catch (error) {
          console.log(error)
          return error
        }
      },
      error => console.log(error)
    )



  }

}
