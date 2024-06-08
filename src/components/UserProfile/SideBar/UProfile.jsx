import React, { useState, useRef } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'

function Profile() {
  const [userProfile, setUserProfile] = useState(null)
  const [open, setOpen] = useState(false)

  const profileImage = useRef(null)

  const openChooseImage = () => {
    profileImage.current.click()
  }

  const changeProfileImage = event => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    const selected = event.target.files[0]

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => setUserProfile(reader.result)
      return reader.readAsDataURL(selected)
    }

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Stack spacing={3} py={5} borderBottom={1} borderColor="grey.300" alignItems="center">
      <Box position="relative">
        <Avatar
          sx={{ width: 128, height: 128, cursor: 'pointer' }}
          onClick={openChooseImage}
          src={userProfile || '/img/tim-cook.jpg'}
        />
        <IconButton
          color="primary"
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
          onClick={openChooseImage}
        >
          <PhotoCameraIcon />
        </IconButton>
      </Box>
      <input
        hidden
        type="file"
        ref={profileImage}
        onChange={changeProfileImage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Something went wrong
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>File not supported!</DialogContentText>
          <Stack direction="row" spacing={1} mt={1}>
            <Typography color="textSecondary" fontSize="small">
              Supported types:
            </Typography>
            <Badge color="success" badgeContent="PNG" />
            <Badge color="success" badgeContent="JPG" />
            <Badge color="success" badgeContent="JPEG" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={1} alignItems="center">
        <Typography variant="h5" color="textPrimary">
          Tim Cook
        </Typography>
        <Typography variant="body2" color="textSecondary">
          CEO of Apple
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Profile
