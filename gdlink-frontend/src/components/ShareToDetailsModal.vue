<template>
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detailsModalLabel">{{ title }} Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="groups.length">
                        <h6>Groups:</h6>
                        <ul>
                            <li v-for="group in groups" :key="group.groupId">
                            {{ group.groupName }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="receivers.length">
                        <h6>Receivers:</h6>
                        <ul>
                            <li v-for="receiver in receivers" :key="receiver.receiverEmail">
                                <span>
                                    {{ receiver.receiverEmail }}
                                </span>
                                <span :style="{ color: receiver.receiverName ? '' : 'red' }">
                                    ({{ receiver.receiverName || 'UNKNOWN' }})
                                </span>                            
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Resource Details',
    },
    groups: {
      type: Array,
      default: () => [],
    },
    receivers: {
      type: Array,
      default: () => [],
    },
  }
}
</script>