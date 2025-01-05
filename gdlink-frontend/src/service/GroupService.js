import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/groups';

const GroupService = {
    async getGroupList(user_id){
        try {
            const response = await axios.get(`${API_BASE_URL}/${user_id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error retrieving groups:', error);
        }
    },
    async createGroup(user_id,group){
        try {
            const response = await axios.post(`${API_BASE_URL}/${user_id}/add`,{
                group: group
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating group:', error);
        }
    },
    async editGroup(group){
        try {
            const response = await axios.put(`${API_BASE_URL}/edit`,{
                group: group
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error editing group:', error);
        }
    },
    async deleteGroup(groupId){
        console.log(groupId);
        try {
            const response = await axios.delete(`${API_BASE_URL}/${groupId}/delete`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error editing group:', error);
        }
    },
};

export default GroupService;
