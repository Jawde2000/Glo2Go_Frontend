import React, { useEffect, useRef } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Stack,
} from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import { useCopyToClipboard } from 'react-use'

export default function Actions() {
  const value = 'https://apple.com/cook'
  const [state, copyToClipboard] = useCopyToClipboard()
  const profileUrl = useRef(null)

  useEffect(() => {
    if (state.value) {
      profileUrl.current.focus()
      profileUrl.current.select()
    }
  }, [state])

  return (
    <Stack py={8} px={5} spacing={3}>
      <Button fullWidth variant="outlined">
        View Public Profile
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <TextField
          inputRef={profileUrl}
          type="url"
          color="primary"
          value={value}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => copyToClipboard(value)}>
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>
    </Stack>
  )
}
