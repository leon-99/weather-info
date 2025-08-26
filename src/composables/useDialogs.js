import { ref } from 'vue'

export function useDialogs() {
  const showSingleAlertDialog = ref(false)
  const showMultipleAlertsDialog = ref(false)

  // Show single alert dialog
  const showSingleAlert = () => {
    showSingleAlertDialog.value = true
  }

  // Close single alert dialog
  const closeSingleAlert = () => {
    showSingleAlertDialog.value = false
  }

  // Show multiple alerts dialog
  const showMultipleAlerts = () => {
    showMultipleAlertsDialog.value = true
  }

  // Close multiple alerts dialog
  const closeMultipleAlerts = () => {
    showMultipleAlertsDialog.value = false
  }

  // Close all dialogs
  const closeAllDialogs = () => {
    showSingleAlertDialog.value = false
    showMultipleAlertsDialog.value = false
  }

  return {
    showSingleAlertDialog,
    showMultipleAlertsDialog,
    showSingleAlert,
    closeSingleAlert,
    showMultipleAlerts,
    closeMultipleAlerts,
    closeAllDialogs
  }
}
