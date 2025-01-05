// src/util/alertUtils.js
import Swal from "sweetalert2";

const SweetAlert = {
    async handleDeletion({
        confirmTitle = 'Are you sure?',
        confirmText = 'This action will permanently delete the item.',
        confirmButtonText = 'Yes, delete it!',
        cancelButtonText = 'Cancel',
        successTitle = 'Deleted!',
        successText = 'The item has been deleted.',
        errorTitle = 'Error!',
        errorText = 'Failed to delete the item. Please try again.',
        unexpectedErrorText = 'An unexpected error occurred. Please try again later.',
        deleteAction,
        refreshData = null,
    }) {
        const result = await Swal.fire({
            title: confirmTitle,
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        });

        if (result.isConfirmed) {
            try {
                const data = await deleteAction();
                if (data.success) {
                    Swal.fire({
                        title: successTitle,
                        text: successText,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    if (refreshData) {
                        await refreshData();
                    }
                } else {
                    Swal.fire({
                        title: errorTitle,
                        text: errorText,
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error('Error during deletion:', error);
                Swal.fire({
                    title: errorTitle,
                    text: unexpectedErrorText,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
    }
}

export default SweetAlert;
// export async function showConfirmation({...}) {
//     // Another reusable SweetAlert2 logic
// }
