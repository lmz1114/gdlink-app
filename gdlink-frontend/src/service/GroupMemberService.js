import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/groups/members';

const GroupMemberService = {
    async getMemberList(groupId){
        try {
            const response = await axios.get(`${API_BASE_URL}/${groupId}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error retrieving members:', error);
        }
    },
    async addMember(groupId,memberId){
        console.log(memberId);
        try {
            const response = await axios.post(`${API_BASE_URL}/${groupId}/add`,{
                memberId: memberId
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding member:', error);
        }
    },
    async updateMemberRole(groupMember){
        try {
            const response = await axios.put(`${API_BASE_URL}/edit`,{
                groupMember: groupMember
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating role:', error);
        }
    },
    async removeMember(groupMemberId){
        try {
            const response = await axios.delete(`${API_BASE_URL}/${groupMemberId}/delete`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error removing member:', error);
        }
    },
};

export default GroupMemberService;
