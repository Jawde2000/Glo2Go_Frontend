import { FormControlLabel, Switch } from '@mui/material'

function Notifications() {
  return (
    <FormControlLabel
      control={<Switch id="notificationEmails" />}
      label="Receive notification emails"
    />
  )
}

export default Notifications
