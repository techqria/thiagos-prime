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

  // url: string = 'https://thiagos-api.herokuapp.com'
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
    console.log(meat)
    return this.http.post(`${this.url}/meats/newMeat`, meat)
  }

  async uploadFile(file: File) {

    console.log('upload file:', file)
    
    const params = {
      Bucket: environment.bucket,
      Key: 'kits/' + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    try {
      const response = await this.bucket.send(new PutObjectCommand(params));
      console.log("SUCCESS", response);
    } catch (error) {
      console.log("FAILURE", error);
    }

  }

}
