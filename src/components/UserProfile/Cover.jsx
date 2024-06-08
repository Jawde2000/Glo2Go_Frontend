import React, { useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'

export default function Cover() {
  const [coverImage, setCoverImage] = useState(null)
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)

  const openChooseFile = () => {
    inputRef.current.click()
  }

  const handleChangeCover = event => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    const selected = event.target.files[0]

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => setCoverImage(reader.result)
      return reader.readAsDataURL(selected)
    }

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box position="relative" height={240} overflow="hidden">
      <ImageListItem>
        <img
          src={coverImage || '/img/cover.jpg'}
          alt="Cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </ImageListItem>
      <IconButton
        onClick={openChooseFile}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <PhotoCameraIcon />
        <Typography ml={1}>Change Cover</Typography>
        <input ref={inputRef} type="file" onChange={handleChangeCover} hidden />
      </IconButton>
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
    </Box>
  )
}
