import { Box, styled } from '@mui/material'

export const FlexRow = styled(Box)`
  display: flex;
  flex-direction: row;
`
export const FlexCol = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const RowCenterX = styled(Box)`
  display: flex;
  flex-direction: row;

  justify-content: center;
`
export const RowCenterY = styled(Box)`
  display: flex;
  flex-direction: row;

  align-items: center;
`

export const RowCenter = styled(Box)`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`

export const RowCenterBetween = styled(Box)`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`

export const ColCenterX = styled(Box)`
  display: flex;
  flex-direction: column;

  align-items: center;
`
