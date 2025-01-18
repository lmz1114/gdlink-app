<template>
    <DefaultLayout>
        <template #default>
            <div class="border rounded shadow-sm bg-white vh-100 w-100 p-4" style="overflow-y:auto">
                <div class="d-flex mb-4">
                    <svg class="me-3" width="2.5em" height="2.5em" viewBox="0 0 196 196" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_613_2)">
                        <rect width="196" height="196" fill="white"/>
                        <path d="M98 0C43.8761 0 0 43.8761 0 98C0 152.124 43.8761 196 98 196C152.124 196 196 152.124 196 98C196 43.8761 152.124 0 98 0ZM97.8014 54.4921C106.841 54.611 114.328 61.9696 116.816 71.3466C117.764 75.1725 117.871 79.054 116.915 83.1063C115.473 88.8114 112.587 94.3841 107.209 97.8076L115.047 101.531L133.67 110.548C135.499 111.332 136.413 112.9 136.413 115.252V133.279C136.413 136.997 136.708 140.203 132.1 141.514H63.5027C59.0708 141.45 58.8872 136.961 58.9911 133.279V115.252C58.9911 112.9 59.9726 111.264 61.9326 110.349L81.1391 101.531L88.5922 98C85.1948 95.7787 82.5158 92.7108 80.5558 88.7908C78.2022 83.6157 77.2691 76.8978 78.9859 70.757C81.1562 62.4332 87.9535 54.9548 97.8014 54.4921ZM65.8545 62.7208C68.7294 62.7208 71.3404 63.5726 73.6922 65.2713C73.0401 67.1003 72.4877 69.0294 72.029 71.0549C71.5718 73.0799 71.3402 75.2003 71.3402 77.4218C71.34 80.6885 71.7971 83.8245 72.7116 86.8298C73.6261 89.835 74.9346 92.5819 76.6337 95.0647C75.8495 96.1099 74.8065 97.0236 73.4997 97.8076L58.9908 104.472C57.0308 105.518 55.4629 106.984 54.2869 108.879C53.1109 110.773 52.5246 112.9 52.5246 115.252V133.279H38.2205C36.1453 133.247 34.7438 131.156 34.6894 128.973V111.919C34.6894 109.959 35.4054 108.651 36.8428 107.997L58.6002 98C52.9788 94.5445 50.2668 88.2988 49.9807 81.3439C50.0796 72.7751 55.696 63.4326 65.8545 62.7208ZM130.139 62.7208C139.17 62.8636 145.693 71.817 146.02 81.3441C145.97 87.6479 143.509 93.735 137.785 97.8078L159.151 107.997C160.588 108.781 161.304 110.09 161.304 111.92V128.973C161.283 130.997 160.19 133.073 157.78 133.279H143.078V115.252C143.078 112.9 142.492 110.773 141.316 108.878C140.14 106.984 138.572 105.518 136.612 104.472C130.519 101.64 123.521 99.6077 118.969 94.8661C122.366 89.6395 124.064 83.8246 124.064 77.4218C124.064 73.3711 123.348 69.3835 121.911 65.4635C124.271 63.9051 127.065 62.7646 130.139 62.7208Z" fill="#039C8C"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_613_2">
                        <rect width="196" height="196" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <h2><strong>Group Management</strong></h2>
                </div>
                <span class="float-end mb-2">
                    <button class="btn-add" @click="openAddModal" type="button" data-bs-toggle="modal" data-bs-target="#groupFormModal">
                        <i class="bi bi-plus-circle"></i>
                        Add New Group
                    </button>
                </span>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Group Name</th>
                        <th scope="col">Members</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(group, index) in groups" :key="group.groupId">
                        <th scope="row">{{index+1}}</th>
                        <td>{{ group.groupName }}</td>
                        <td>{{ group.numberOfMembers }}</td>
                        <td>
                            <div class="d-flex flex-row gap-3">
                                <span @click="openMemberListModal(group)" data-bs-toggle="modal" data-bs-target="#memberListModal">
                                    <i class="bi bi-card-list"></i>
                                </span>
                                <span @click="openEditModal(group)" data-bs-toggle="modal" data-bs-target="#groupFormModal">
                                    <i class="bi bi-pencil-square"></i>
                                </span>
                                <span @click="deleteGroup(group)">
                                    <i class="bi bi-trash3"></i>
                                </span>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <GroupForm ref="groupForm" @refresh="displayGroupList"/>
            <MemberModal ref="memberList" @refresh="displayGroupList"/>
        </template>
    </DefaultLayout>
</template>

<script>
import GroupService from '../service/GroupService';
import DefaultLayout from '../components/DefaultLayout.vue';
import GroupForm from '../components/GroupForm.vue';
import MemberModal from '../components/MemberModal.vue';
import GroupMemberService from '../service/GroupMemberService';
import SweetAlert from '../Utils/SweetAlertUtils';

export default {
  data() {
      return {
        userId: null,
        groups: []       
      };
    },
  components: {
      DefaultLayout,
      GroupForm,
      MemberModal
  },
  created() {
    const sessionData = sessionStorage.getItem('utmwebfc_session');
      if (sessionData) {
            const userSession = JSON.parse(sessionData);
            this.userId = userSession.user_id;
        }
        this.displayGroupList();
    },
    methods:{
        async displayGroupList(){
            this.groups = await GroupService.getGroupList(this.userId);
            console.log(this.groups);
        },
        async displayMemberList(groupId){
            this.groupMembers = await GroupMemberService.getMemberList(groupId);
        },
        openEditModal(group){
            this.$refs.groupForm.openModalForEdit(group);
        },
        openAddModal(){
            this.$refs.groupForm.openModalForAdd();
        },
        openMemberListModal(group){
            this.$refs.memberList.openModalForMembers(group);
        },
        async deleteGroup(group){
          await SweetAlert.deleteSwal({
            confirmText: 'This action will permanently delete the group.',
            successText: 'The group has been deleted.',
            deleteAction: () => GroupService.deleteGroup(group.groupId),
            refreshData: () => this.displayGroupList(),
          });
        },
    }
};
</script>

<style scoped>
    .btn-add{
        background-color: white;
        border: none;
        color: green;
        font-weight: bold;
    }

    .btn-add:hover{
        color: rgb(2, 181, 2);
    }

    td div span{
        cursor: pointer;
        font-size: 20px;
        padding: 5px;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
    }

    td div span i{
        transform: translateY(-0.5px);
    }

    td div span:hover{
        background-color: rgb(160, 206, 247);
    }

    td div span:active{
        background-color: rgb(160, 206, 247);
        transform:scale(0.9);
    }

    .bi-card-list{
        color: darkblue;
    }

    .bi-pencil-square{
        color: darkgoldenrod;
    }

    .bi-trash3{
        color: rgb(194, 0, 0);
    }
</style>