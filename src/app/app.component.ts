import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  IMAGE_URL: string = 'https://cb-shared-s3.s3.us-east-1.amazonaws.com/2B147257EA51E49DD3D54E904CABC92C3CCD?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT5XTT6Q7MZUGSZX5%2F20240528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240528T052018Z&X-Amz-Expires=604800&X-Amz-Signature=53eb30490ed3d80e4bfdce2c94d2e0947a9f452189c89ac1a40987ac4073425d&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D604800&x-id=GetObject';

  async toDataURL(url: string): Promise<string> {
    // Fetch the image data from the S3 URL
    const response = await fetch(url, {
      mode: 'cors' // Ensure the request is made with CORS mode
    });
    const blobData = await response.blob();
    return URL.createObjectURL(blobData);
  }

  async handleDownload(): Promise<void> {
    const a = document.createElement('a');
    a.href = await this.toDataURL(this.IMAGE_URL);
    a.download = 'myImage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
