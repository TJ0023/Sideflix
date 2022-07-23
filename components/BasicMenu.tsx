import Button from '@mui/material/Button'
import { useState } from 'react'
import Link from "next/link"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white headerLink !text-xl"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link href="/">Home </Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/myList">My List </Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/account">Account </Link></MenuItem>
      </Menu>
    </div>
  )
}