import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const RecipientItemList = ({recipient}) => {
  return (
    <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <Avatar>
        <PersonIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={`${recipient.firstName} ${recipient.lastName}`}
      secondary={recipient.phoneNumber}
    />
  </ListItem>
  )
}

export default RecipientItemList
