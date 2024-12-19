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
                  <img :src = "previewImage" alt="Image Preview">
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
import axios from 'axios';

export default {
  data() {
    return {
      userId: null,
      file: null,
      previewImage: null
    };
  },
  created() {
      const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
        const userSession = JSON.parse(sessionData);
        this.userId = userSession.user_id;
      }
  },
  methods: {
    handleFileSelect(event) {
      console.log(event.target.files.length);
      if (event.target.files.length > 1) {
        alert('Please select only one image.');
        return;
      }
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.file = selectedFile;
        this.previewImage = URL.createObjectURL(this.file);
        console.log(this.previewImage);
      }
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      if (event.target.files.length > 1) {
        alert('Please select only one image.');
        return;
      }
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
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
    submitFile() {
      if (this.file) {
        this.processUpload();
        this.resetFile();
        window.location.reload();
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

      const formData = new FormData();
      formData.append('image', this.file);

      try {
        const response = await axios.post(`http://localhost:8081/profile/upload_image/${this.userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
          alert(response.data.message);
        } catch (error) {
          alert('Failed to upload image.');
        }
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
  object-fit: fill; /* Ensures the image scales to fit without distortion */
}

.close{
  position: absolute;
  font-size: 25px;
  z-index: 999;
  top: -10px;
  right: 2px;
  cursor: pointer;
}
</style>
