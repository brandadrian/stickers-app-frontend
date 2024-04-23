import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stickers-app';
  apiUrl = 'https://stickers-app-backend.azurewebsites.net/api/';
  stickersData:any = [];
  stickerName: string = '';
  stickerDescription: string = '';
  stickerUserName: string = '';

  constructor(private httpClient:HttpClient) {
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

    this.httpClient.post(this.apiUrl + 'stickersapp/stickers', data).subscribe(response => {
      console.warn(JSON.stringify(response));
      this.loadData();
    })
  }

  deleteSticker(id:any) {
    this.httpClient.delete(this.apiUrl + 'stickersapp/stickers?id=' + id).subscribe(response => {
      console.warn(JSON.stringify(response));
      this.loadData();
    })
  }

  loadData() {
    this.httpClient.get(this.apiUrl + 'stickersapp/stickers').subscribe(data => {
      this.stickersData = data;
      console.warn(JSON.stringify(data));
    })
  }
}
