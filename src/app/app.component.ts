import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stickers-app';
  stickersData:any = [];
  stickerName: string = '';
  stickerDescription: string = '';
  stickerUserName: string = '';
  stickersApiUrl: string;
  environmentIdentifier: string;

  constructor(private httpClient:HttpClient) {
    this.stickersApiUrl = environment.apiUrl;
    this.environmentIdentifier = environment.identifier;
  }

  ngOnInit() {
    this.loadData();
  }

  addSticker() {
    const data = {
      name: this.stickerName,
      description: this.stickerDescription,
      userName: this.stickerUserName
    };

    console.warn(JSON.stringify(data));

    this.httpClient.post(this.stickersApiUrl + 'stickersapp/stickers', data).subscribe(response => {
      console.warn(JSON.stringify(response));
      this.loadData();
    })
  }

  deleteSticker(id:any) {
    this.httpClient.delete(this.stickersApiUrl + 'stickersapp/stickers?id=' + id).subscribe(response => {
      console.warn(JSON.stringify(response));
      this.loadData();
    })
  }

  loadData() {
    this.httpClient.get(this.stickersApiUrl + 'stickersapp/stickers').subscribe(data => {
      this.stickersData = data;
      console.warn(JSON.stringify(data));
    })
  }
}
