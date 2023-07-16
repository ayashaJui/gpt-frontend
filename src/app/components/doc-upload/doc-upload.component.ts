import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent {
  loading: boolean = false;
  selectedFile!: File;
  content: string = '';
  msg: string = '';

  constructor(private fileUploadService: FileUploadService) {}

  ngInit(): void {}

  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(selectedValue: string) {
    if(!selectedValue){
      console.log("plz select a project")
    }
    if (!this.selectedFile) {
      console.log("plz upload a project")
    } else {
      // this.msg = '';
      // this.loading = !this.loading;

      console.log(selectedValue,  this.selectedFile)

      // this.fileUploadService.upload(this.selectedFile).subscribe((response) => {
      //   console.log(response);
      //   this.content = response;
      //   this.loading = !this.loading;
      // });
    }
  }

}
