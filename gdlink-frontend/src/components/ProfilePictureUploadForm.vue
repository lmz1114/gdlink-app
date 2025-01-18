<template>
  <div>
    <div 
      class="modal fade" 
      id="uploadModalDiv" 
      data-bs-backdrop="static" 
      data-bs-keyboard="false" 
      tabindex="-1" 
      aria-labelledby="uploadLabel" 
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title w-100 text-center" id="uploadLabel">Upload</h2>
            <button 
              type="button" 
              class="btn-close position-absolute" 
              style="right: 20px;" 
              data-bs-dismiss="modal" 
              aria-label="Close"
            ></button>
          </div>
          <div 
            class="modal-body d-flex justify-content-center align-items-center" 
            @dragover.prevent="handleDragOver" 
            @drop.prevent="handleDrop"
          >
            <div class="file-drop-zone" id="fileDropZone">
              <div v-if="!file">
                <div class="icon">
                  <i class="bi bi-file-earmark-richtext"></i>
                </div>
                <p class="mb-2">
                  Drag and Drop files here<br><strong>OR</strong>
                </p>
              </div>
              <div v-else class="d-flex align-items-center justify-content-center">
                <div class="preview-image">
                  <img ref="imagePreview" :src = "previewImage" alt="Image Preview">
                  <span class="close" @click="removePreview">&times;</span>
                </div>
              </div>
              <label v-if="!file" for="fileInput" class="btn btn-success w-50">Browse Files</label>
              <input 
                type="file" 
                id="fileInput" 
                @change="handleFileSelect" 
                style="display: none;"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-primary" 
              data-bs-dismiss="modal"
              :disabled="!file" 
              @click="submitFile"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';

import Cropper from 'cropperjs';
import ProfileService from '@/service/ProfileService';
import SweetAlert from '@/Utils/SweetAlertUtils';

export default {
  data() {
    return {
      userId: null,
      file: null,
      previewImage: null,
      cropper: null,
      croppedImage: null
    };
  },
  mounted() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
      }
  },
  methods: {
    base64ToFile(base64, fileName, mimeType = 'image/png') {
      const byteCharacters = atob(base64.split(',')[1]);
      const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      return new File([byteArray], fileName, { type: mimeType });
    },


    handleFileSelect(event) {
      if (event.target.files.length > 1) {
        alert('Please select only one image.');
        return;
      }
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        if (!this.validateImage(selectedFile)) {
          return; 
        }
        this.file = selectedFile;
        this.previewImage = URL.createObjectURL(this.file);
        this.$nextTick(() => {
          if (this.cropper) {
            this.cropper = null;
          }

          this.cropper = new Cropper(this.$refs.imagePreview, {
        
            zoomable: false,
            scalable: false,

            aspectRatio: 1,
            // ready() {
            //     document.querySelector('.cropper-container').style.width = '190px';
            //     document.querySelector('.cropper-container').style.display = 'flex';
            //     document.querySelector('.cropper-container').style.justifyContent = 'center';
            //     document.querySelector('.cropper-container').style.alignItems = 'center';
            // },
            crop: () => {
              const canvas =this.cropper.getCroppedCanvas();
              this.croppedImage = canvas.toDataURL("image/png");
            }
          });
        });
      }
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      if (event.dataTransfer.files.length > 1) {
        alert('Please drop only one image.');
        return;
      }
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        if (!this.validateImage(droppedFile)) {
          return; 
        }
        this.file = droppedFile;
        this.previewImage = URL.createObjectURL(this.file);
        console.log(this.previewImage);
      }
    },
    removePreview(){
      const fileInput = document.getElementById("fileInput");
      fileInput.value = '';
      this.file=null;
      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage);
      }
      this.previewImage=null;
    },
    async submitFile() {
      if (this.file) {
        await this.processUpload();
        this.resetFile();
        this.$emit('refresh');
        this.$emit('update-profile-picture');
      }
    },
    resetFile() {
      this.file = null;
      document.getElementById('fileInput').value = '';
    },
    async processUpload(){
      if (!this.file) {
        this.message = 'No file selected.';
        return;
      }

      const file = this.base64ToFile(this.croppedImage, `profile-pic-${this.userId}.png`);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const data = await ProfileService.updatePicture(this.userId,formData);
          alert(data.message);
      } catch (error) {
          alert('Failed to upload image.');
      }
    },

    validateImage(file) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (!allowedTypes.includes(file.type)) {
        SweetAlert.showSwal('Wrong File Type!','Invalid file type. Only JPEG and PNG are allowed.','error');
        return false;
      }

      if (file.size > maxSize) {
        SweetAlert.showSwal('Wrong File Size!','File size should not exceed 2MB.','error');
        return false;
      }

      return true;
    }

  },
};
</script>

<style scoped>
.file-drop-zone {
    width: 300px;
    height: 200px;
    border: 2px dashed #000;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #ffffff;
    position: relative;
}

.file-drop-zone .icon {
    font-size: 40px;
    margin-bottom: 10px;
}

.file-drop-zone label {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.file-drop-zone label:hover {
    background-color: #90EE90;
}

.file-drop-zone p {
    margin: 0;
    font-size: 16px;
}

.preview-image{
  height:190px; 
  width: 190px; 
  position: relative;
  overflow: hidden;
}

.preview-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures the image scales to fit without distortion */
}

.close{
  position: absolute;
  font-size: 25px;
  z-index: 999;
  top: -10px;
  right: 2px;
  cursor: pointer;
}

.cropper-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    touch-action: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 190px!important;
}
</style>
