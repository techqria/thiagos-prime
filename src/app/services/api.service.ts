import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MeatsDto } from '../dtos/meats.dto';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

  login() {
    return this.http.get(`${this.url}/login`)
  }

  newMeat(meat: MeatsDto) {
    return this.http.post(`${this.url}/meats/new-meat`, meat)
  }

  removeMeat(meatId: string) {
    return this.http.post(`${this.url}/meats/remove-meat/${meatId}`, null)
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

}
