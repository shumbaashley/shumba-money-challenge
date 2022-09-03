import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import RecipientItemList from "../../components/RecipientListItem";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RecipientList() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const getRecipients = async () => {
      try {
        const response = await axios.get("/recipients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const { recipients } = response.data;
        setRecipients(recipients);
      } catch (error) {
        const errorMsg = handleCustomError(error);
        console.log(errorMsg);
      }
    };

    getRecipients();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Recipients
          </Typography>
          <Demo>
            <List>
              {recipients.map((recipient) => (
                <RecipientItemList recipient={recipient} />
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
